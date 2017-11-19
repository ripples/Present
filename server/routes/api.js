var express = require('express');
var router = express.Router();
var dirToJson = require('dir-to-json');
var path = require('path');
var fs = require('fs');
var util = require('util');
var moment = require('moment');
require('moment-recur');

router.get('/identify/', function (req, res) {
	res.send(req.session.lti_token);
});

router.get('/listOfCourseLectures/:courseId', function (req, res) {
	dirToJson("./lectures/" + req.params.courseId.toString(), function (err, dirTree) {
		if (err) {
			throw err;
		} else {
			appGetLectures = false;
			res.send(dirTree);
		}
	});
});

router.get('/manifest/:courseId/:lectureName', function (req, res) {
	const fpath = "./lectures/" + req.params.courseId.toString() + '/' + req.params.lectureName.toString() + '/INFO'
	fs.readFile(fpath, 'utf8', function (err, contents) {
		if (err) {
			res.status(404).send('Not Found');
			return;
		}
		else {
			const re = /(?:whiteboardCount: (\d))(?:\s|.*)*(?:computerCount: (\d))/ //this is a little bit more delicate than I'd like it to be
			const found = contents.match(re)
			const manifest = {
				whiteboardCount: parseInt(found[1]), //for some reason there is a third capture group at 0...
				computerCount: parseInt(found[2]),
				input: found['input']
			}
			res.send(manifest)
		}
	})
})

/*
Scheme for sourceID
1-x is for computer, x is an feed number
2-x is for a whiteboard, x is for feed number
Maybe some diffing...
*/
router.get('/image/:courseId/:lectureName/:sourceId/:time', function (req, res) {
	const feedType = (req.params["sourceId"].split("-")[0] === "1") ? "computer" : "whiteBoard"
	const feedId = req.params["sourceId"].split("-")[1]
	const fpath = "./lectures/" + req.params.courseId.toString() + '/' + req.params.lectureName.toString()
	util.promisify(fs.readFile)(fpath + '/INFO', 'utf8').then(contents => {
		const re = /(?:timestamp: (\d*))/
		const found = contents.match(re)[1];
		return parseInt(req.params.time) + parseInt(found)
	}).then(cTime => {
		util.promisify(fs.readdir)(fpath + '/' + feedType.toLowerCase()).then(files => {
			const fileName = files.reduce((result, file) => {
				const splitFileName = file.split('-')
				const fileTime = parseInt(splitFileName[2].split('.')[0])
				if (splitFileName[0] === feedType && splitFileName[1] === feedId && fileTime <= cTime) {
					result.push({
						name: file,
						time: fileTime
					})
				}
				return result
			}, []).sort((left, right) => left.time - right.time).pop() //this should be the file
			if (typeof fileName != 'undefined' && fileName != null) {
				appGetLectureImages = false;
				res.sendFile(path.resolve('lectures', req.params.courseId.toString(), req.params.lectureName.toString(), feedType.toLowerCase(), fileName.name))
			}
			else {
				console.log("ERROR", fpath + '/' + feedType.toLowerCase())
				res.status(404).send()
			}
		}).catch(err => {
			console.log(err)
			res.status(404).send(err)
		})
	}).catch(err => {
		console.log(err);
		res.status(404).send(err)
	})
});

router.get('/video/:courseId/:lectureName', function (req, res) {
	const fpath = "./lectures/" + req.params.courseId.toString() + '/' + req.params.lectureName.toString() + '/videoLarge.mp4'  // TODO tie this to absolute location
	const stat = fs.statSync(fpath)
	const fileSize = stat.size
	const range = req.headers.range
	if (range) {
		const parts = range.replace(/bytes=/, "").split("-")
		const start = parseInt(parts[0], 10)
		const end = parts[1]
			? parseInt(parts[1], 10)
			: fileSize - 1
		const chunksize = (end - start) + 1
		const file = fs.createReadStream(fpath, { start, end })
		const head = {
			'Content-Range': `bytes ${start}-${end}/${fileSize}`,
			'Accept-Ranges': 'bytes',
			'Content-Length': chunksize,
			'Content-Type': 'video/mp4',
		}
		res.writeHead(206, head);
		file.pipe(res);
	}
	else {
		const head = {
			'Content-Length': fileSize,
			'Content-Type': 'video/mp4',
		}
		res.writeHead(200, head)
		fs.createReadStream(fpath).pipe(res)
	}
});

router.get('/calendar/:courseId', function (req, res) { //Gets the calendar for a given class
	const fpath = "./lectures/" + req.params.courseId.toString() + "/Calendar.ics"
	fs.exists(fpath, function(exists) {
		if(exists) {
			fs.readFile(fpath, function(err, data) {
				if (err) throw err;
				const eventArray = icsToEventObjectArray(data.toString());
				res.status(200).send(eventArray);
			})
		}
		else {
			const eventArray = [];
			res.status(200).send(eventArray);
		}
	});
});

router.get('/calendar/:recurEvent/:start/:end/:includes/:excludes', function (req, res) {
	let sDate = formatRecurringDate(new Date(req.params.start));
	let eDate = formatRecurringDate(new Date(req.params.end));
	var recurrence = moment.recur(sDate, eDate).every(req.params.recurEvent.split(',')).daysOfWeek();
	var dates = recurrence.all("YYYYMMDD");
	var addedIncludes = incDates(req.params.includes.split(","), dates, req.params.excludes.split(","));
	var filteredDates = addedIncludes.filter(function(e){return req.params.excludes.indexOf(e)<0}); //Returns array with excluded dates removed, still in chronological order
	res.status(200).send(filteredDates);
});

router.post('/calendar', function (req, res) {
	var sDate = req.body.sDate;
	var eDate = req.body.eDate;
	var sTime = req.body.sTime;
	var eTime = req.body.eTime;
	var recurDays = req.body.recurDays;
	var excludeDates = req.body.excludeDates;
	var includeDates = req.body.includeDates;
	var description = req.body.description;
	var location = req.body.location;
	var summary = getCurrentSemester() + " " + req.body.courseId;
	var courseId = req.body.courseId;

	generateCalendar(sDate, eDate, sTime, eTime, recurDays, excludeDates, includeDates, description, location, summary, courseId);
	res.status(201).send("Recording schedule successfully created: ./lectures/" + courseId + "/Calendar.ics");
});

function generateCalendar(sDate, eDate, sTime, eTime, recurDays, excludeDates, includeDates, description, location, summary, courseId) {
	var start = moment(sDate, "YYYYMMDD"), end = moment(eDate, "YYYYMMDD");
	var recurrence = moment.recur(start, end).every(recurDays).daysOfWeek(); //Create moment recurrence object of date list
	var initialDates = recurrence.all("YYYYMMDD"); //Generate string array of dates in "YYYY-MM-DD" format, in chronological order
	var addedIncludes = incDates(includeDates, initialDates, excludeDates);
	var filteredDates = addedIncludes.filter(function(e){return excludeDates.indexOf(e)<0}); //Returns array with excluded dates removed, still in chronological order
	generateICS(filteredDates.sort(), [sDate, eDate, sTime, eTime, description, location, summary, courseId])
}

function generateICS(dates, tags) {
	var fileText = "";
	var START_TAG = "BEGIN:VCALENDAR\nPRODID:Calendar\nVERSION:2.0\n", END_TAG = "END:VCALENDAR";
	const SDATE = 0, EDATE = 1, STIME = 2, ETIME = 3, DESCRIPTION = 4, LOCATION = 5, SUMMARY = 6, COURSEID = 7;
	var dateNow = getICSDateNow();
	var DTSTAMP = dateNow[0] + dateNow[1] + dateNow[2] + dateNow[3] + dateNow[4] + dateNow[5] + dateNow[6];
	var lectureDir = dateNow[1] + "-" + dateNow[2] + "-" + dateNow[0] + "--" + dateNow[4] + "-" + dateNow[5] + "-" + dateNow[6];
	fileText += START_TAG;

	for(var i = 0; i < dates.length; i++){
	  fileText += "BEGIN:VEVENT\n";
	  fileText += (i + "@default\nCLASS:PUBLIC\n");
	  fileText += ("DESCRIPTION:" + tags[DESCRIPTION] + "\n");
	  fileText += ("DTSTAMP;VALUE=DATE-TIME:" + DTSTAMP + "\n");
	  fileText += ("DTSTART;VALUE=DATE-TIME:" + dates[i] + "T" + tags[STIME] + "\n");
	  fileText += ("DTEND;VALUE=DATE-TIME:" + dates[i] + "T" + tags[ETIME] + "\n");
	  fileText += ("LOCATION:" + tags[LOCATION] + "\n");
	  fileText += ("SUMMARY;LANGUAGE=en-us:" + tags[SUMMARY] + "\n");
	  fileText += "TRANSP:TRANSPARENT\nEND:VEVENT\n";
	}

	fileText += END_TAG;

	fs.writeFileSync("./lectures/" + tags[COURSEID] + "/Calendar.ics", fileText, function (err) {
	  if (err) return console.log(err);
	});

	  //Send the newly created schedule to the capture server
	  let fetch = require('node-fetch');
	  let FormData = require('form-data');
	  const stats = fs.statSync("./lectures/" + tags[COURSEID] + "/Calendar.ics");
	  const fileSizeInBytes = stats.size;
	  var body = new FormData();
	  var filedata = 0
	  try {
	  filedata = fs.readFileSync("./lectures/" + tags[COURSEID] + "/Calendar.ics", 'utf8');
	  } catch(e) {
		  console.log('Error:', e.stack);
	  }

	  body.append('file', filedata);
	  fetch('http://cap142.cs.umass.edu:8001/', {
		  method: 'POST',
		  headers: {
				  'Content-Length': fileSizeInBytes,
				  'Content-Type': undefined //To set data boundaries automatically... workaround
				  //'Authorization': 'Basic' + base64.encode(username + ":" + password)
			  },
		  body: body
	  })
	  .then(function(res) {
		  return res.text();
	  }).then(function(text) {
		  console.log(text);
	  }).catch(function(error) {
			console.log('Fetch operation error: ' + error.message);
	  });
}

function isDuplicate(date, dates, excludes){
	return (dates.includes(date) && !excludes.includes(date));
}

function formatRecurringDate(date){
	let year = date.getFullYear().toString();
	let month = (date.getMonth()+1).toString();
	let day = date.getDate().toString();
	if(month.length === 1) {month = '0' + month;}
	if(day.length === 1) {day = '0' + day;}
	return moment(year+month+day, "YYYYMMDD");
}

function incDates(dates, initial, excludes) {
	var newArr = initial;
	for(var i = 0; i < dates.length; i++){
		if(!isDuplicate(dates[i], initial, excludes)){
			newArr = newArr.concat(dates[i]);
		}
	}
	return newArr;
}

function getCurrentSemester(){
	var year = new Date().getFullYear().toString().substr(-2);
	var curMonth = new Date().getMonth(); //Jan:0, May=4, Aug=7, Dec=11, 1-3, 5-6, 8-10
	var curDay = new Date().getDate();
	var semester = "";
	switch(curMonth){
		case 0:
			(curDay < 21) ? semester = "WINTER" : semester = "SPRING";
			break;
		case 4:
			(curDay < 17) ? semester = "SPRING" : semester = "SUMMER";
			break;
		case 7:
			(curDay < 24) ? semester = "SUMMER" : semester = "FALL";
			break;
		case 11:
			(curDay < 22) ? semester = "FALL" : semester = "WINTER";
			break;
		default:
			(curMonth >= 1 && curMonth <= 3) ? semester = "SPRING" : (curMonth >= 5 && curMonth <= 6) ? semester = "SUMMER" : semester = "FALL";
			break;
	}
	return semester + year;
}

function getICSDateNow() { //Gets the current timestamp in YYYYMMDDTHHMMSS format (for ics file generation)
	var now = new Date();
	var year = "" + now.getFullYear();
	var month = "" + (now.getMonth() + 1); if (month.length == 1) { month = "0" + month; }
	var day = "" + now.getDate(); if (day.length == 1) { day = "0" + day; }
	var hour = "" + now.getHours(); if (hour.length == 1) { hour = "0" + hour; }
	var minute = "" + now.getMinutes(); if (minute.length == 1) { minute = "0" + minute; }
	var second = "" + now.getSeconds(); if (second.length == 1) { second = "0" + second; }
	return [year, month, day, "T", hour, minute, second];
}

function icsToEventObjectArray(icsFileText) { //Converts the text of an ics file to an array of JSON objects readable by the calendar component
	var eventArray = [];
	var filetextsplit = icsFileText.split('\n');
	filetextsplit.splice(0, 3); //Remove the first 3 unnecessary lines from file
	filetextsplit.splice(-1, 1); //Remove last line from file, also don't need
	var numEvents = parseInt(filetextsplit[filetextsplit.length-10].substring(0, 2)); //Contains the number of events in calendar
	for(var i = 0; i < numEvents; i++){
		var currentEvent = {};
		for(var line = 0; line < 11; line++){
			var curline = filetextsplit[0];
			switch(line){
				case 3:
					var description = curline.substring(12);
					if(description === '') {continue;}
					else {currentEvent.desc = curline.substring(12);}
					filetextsplit.splice(0, 1);
					break;
				case 5:
					var year = curline.substring(24, 28);
					var month = curline.substring(28, 30);
					var day = curline.substring(30, 32);
					var hour = curline.substring(33, 35);
					var min = curline.substring(35, 37);
					if(month.length === 1) {month = '0' + month;}
					if(day.length === 1) {day = '0' + day;}
					var datestring = year + '-' + month + '-' + day + 'T' + hour + ':' + min + ':00Z';
					currentEvent.start = new Date(datestring);
					filetextsplit.splice(0, 1);
					break;
				case 6:
					var year = curline.substring(22, 26);
					var month = curline.substring(26, 28);
					var day = curline.substring(28, 30);
					var hour = curline.substring(31, 33);
					var min = curline.substring(33, 35);
					if(month.length === 1) {month = '0' + month;}
					if(day.length === 1) {day = '0' + day;}
					var datestring = year + '-' + month + '-' + day + 'T' + hour + ':' + min + ':00Z';
					let end = new Date(datestring);
					currentEvent.end = end;
					filetextsplit.splice(0, 1);
					break;
				case 8:
					var title = curline.substring(23);
					if(title === '')  {continue;}
					else {currentEvent.title = title;}
					filetextsplit.splice(0, 1);
					break;
				default:
					filetextsplit.splice(0, 1);
					break;
			}
		}
		eventArray.push(currentEvent);
	}
	return eventArray;
}

module.exports = router;
