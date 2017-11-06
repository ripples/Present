var express = require('express');
var router = express.Router();
var dirToJson = require('dir-to-json');
var path = require('path')
var moment = require('moment');
require('moment-recur');
const fs = require('fs')
const util = require('util')
const key = "You/'ll never walk alone"
var encryptor = require('simple-encryptor')(key)
var logged = false;
var appGetAuth = false;
var appGetLectures = true;
var appGetLectureNames = true;
var appGetLectureFile = true;
var appGetLectureImages = true;
var useAuth = true; // set this to false to test the routes through postman

function isAuthenticated(req, res, next) {
	var token = req.body.oauth_signature;
	if(token) {
	  logged = true;
	  return next();
	}
	else if(logged) {
	  return next();
	}
	else {
	  res.status(404).send('Not Found');
	}
}

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

router.post('/data', isAuthenticated, function (req, res) {
	const hashed = encryptor.encrypt(req.body).replace(/\//g, '-');
	const url = "http://localhost:3000/" // TODO Global constant
	appGetAuth = true;
	appGetLectures = true;
	appGetLectureNames = true;
	appGetLectureFile = true;
	appGetLectureImages = true;
	res.redirect(url + hashed);
});

router.get('/identify/*', isAuthenticated, function (req, res) {
	if((logged && appGetAuth) || !useAuth) {
    const tok = req.params[0].replace(/-/g, '/');
    const unhashed = encryptor.decrypt(tok);
    if (typeof unhashed == 'undefined' || unhashed === null) {
      res.status(404).send('Not Found');
    }
    else {
      appGetAuth = false;
      res.send(unhashed);
    }
  }
  else {
    logged = false;
  }
});

router.get('/listOfCourseLectures/:courseId', isAuthenticated, function (req, res) {
	if((logged && appGetLectures) || !useAuth) {
		dirToJson("./lectures/" + req.params.courseId.toString(), function (err, dirTree) {
		  if (err) {
				throw err;
		  } else {
				appGetLectures = false;
				res.send(dirTree);
		  }
		});
	  }
});

router.get('/manifest/:courseId/:lectureName', isAuthenticated, function (req, res) {
	if((logged && appGetLectureNames) || !useAuth) {
		const fpath = "./lectures/" + req.params.courseId.toString() + '/' + req.params.lectureName.toString() + '/INFO'
			fs.readFile(fpath, 'utf8', function (err, contents) {
				if (err) {
					res.status(404).send('Not Found');
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
	  }
})


router.get('/video/:courseId/:lectureName', isAuthenticated, function (req, res) {
	if((logged && appGetLectureFile) || !useAuth) {
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
	  }
});


/*
Scheme for sourceID
1-x is for computer, x is an feed number
2-x is for a whiteboard, x is for feed number
Maybe some diffing...
*/
router.get('/image/:courseId/:lectureName/:sourceId/:time', isAuthenticated, function (req, res) {
		const feedType = (req.params["sourceId"].split("-")[0] === "1") ? "computer" : "whiteBoard"
		const feedId = req.params["sourceId"].split("-")[1]
		const fpath = "./lectures/" + req.params.courseId.toString() + '/' + req.params.lectureName.toString()
		util.promisify(fs.readFile)(fpath+ '/INFO', 'utf8').then( contents =>{
		  const re = /(?:timestamp: (\d*))/
		  const found = contents.match(re)[1];
		  return parseInt(req.params.time) + parseInt(found)
		}).then( cTime => {
		  util.promisify(fs.readdir)(fpath + '/' + feedType.toLowerCase()).then( files => {
			const fileName = files.reduce((result, file) => {
			  const splitFileName = file.split('-')
			  const fileTime = parseInt(splitFileName[2].split('.')[0])
			  if(splitFileName[0] === feedType && splitFileName[1] === feedId && fileTime <= cTime){
				result.push({
				  name: file,
				  time: fileTime
				})
			  }
			  return result
			}, []).sort((left, right) => left.time - right.time).pop() //this should be the file
			if(typeof fileName != 'undefined' && fileName != null){
				appGetLectureImages = false;
			  res.sendFile(path.resolve('lectures', req.params.courseId.toString(), req.params.lectureName.toString(), feedType.toLowerCase(), fileName.name))
			}
			else{
				console.log("ERROR", fpath + '/' + feedType.toLowerCase())
			  res.status(404).send()
			}
		  }).catch( err => {
				console.log(err)
				res.status(404).send(err)
			})
		}).catch( err => {
			console.log(err);
		  res.status(404).send(err)
		})
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
	let base64 = require('base-64');
	const stats = fs.statSync("./lectures/" + tags[COURSEID] + "/Calendar.ics");
	const fileSizeInBytes = stats.size;
	let readStream = fs.createReadStream("./lectures/" + tags[COURSEID] + "/Calendar.ics");
	let username = 'paol'
	let password = 'secretPAOL'
	fetch('cap142.cs.umass.edu', {
	    method: 'POST',
	    headers: {
				'Content-length': fileSizeInBytes,
				'Authorization': 'Basic' + base64.encode(username + ":" + password)
			},
	    body: readStream
	})
	.then(function(res) {
	    return res.status();
	}).then(function(status) {
	    console.log(status);
	});
}

function isDuplicate(date, dates, excludes){
	return (dates.includes(date) && !excludes.includes(date));
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

  if(curMonth == 0){
    if(curDay < 21){
      semester = "WINTER";
    }
    else{
      semester = "SPRING";
    }
  }
  else if(curMonth == 4){
    if(curDay < 17){
      semester = "SPRING";
    }
    else{
      semester = "SUMMER";
    }
  }
  else if(curMonth == 7){
    if(curDay < 24){
      semester = "SUMMER";
    }
    else{
      semester = "FALL";
    }
  }
  else if(curMonth == 11){
    if(curDay < 22){
      semester = "FALL";
    }
    else{
      semester = "WINTER";
    }
  }
  else{
    if(curMonth >= 1 && curMonth <= 3){
      semester = "SPRING";
    }
    else if(curMonth >= 5 && curMonth <= 6){
      semester = "SUMMER";
    }
    else{
      semester = "FALL";
    }
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

module.exports = router;
