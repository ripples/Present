var express = require('express');
var router = express.Router();
const dirToJson = require('dir-to-json');
var path = require('path');
const fs = require('fs');
var util = require('util');
var moment = require('moment');
const unzip = require('unzip-stream');
require('moment-recur');

const utils = require('../utils/utils');
const lecUpUtils = require('../utils/lectureUpload');
const calUtils = require('../utils/calendar');

router.get('/identify/', function (req, res) {
	if (req.session.lti_token) {
		res.send(req.session.lti_token);
	}
	else {
		res.status(401).send()
	}
});

router.get('/listOfCourseLectures/', function (req, res) {
	dirToJson("./lectures/" + req.session.lti_token.lis_course_section_sourcedid.toString(), function (err, dirTree) {
		if (err) {
			throw err;
		} else {
			dirTree.children = dirTree.children.filter((lecture) => {
				var patt = /^\d\d-\d\d-\d\d\d\d--\d\d-\d\d-\d\d$/;
				if(patt.test(lecture.name)){
					return true;
				} else {
					return false;
				}
			});

			if(!req.session.lti_token.roles.toString().toLowerCase().includes("instructor")){ //not instructor so filter future lectures out
				var date = new Date();
				dirTree.children = dirTree.children.filter((lecture) => {
					var lecDate = new Date(parseInt(lecture.name.substring(6, 11)), parseInt(lecture.name.substring(0, 2)) - 1, parseInt(lecture.name.substring(3, 5)));
					if(lecDate > date){
						return false;
					} else {
						return true;
					}
				});
			}
			res.send(dirTree);
		}
	});
});

router.get('/manifest/:lectureName', function (req, res) {
	const fpath = "./lectures/" + req.session.lti_token.lis_course_section_sourcedid.toString() + '/' + req.params.lectureName.toString() + '/INFO'
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
router.get('/image/:lectureName/:sourceId/:time', function (req, res) {
	const feedType = (req.params["sourceId"].split("-")[0] === "1") ? "computer" : "whiteBoard"
	const feedId = req.params["sourceId"].split("-")[1]
	const fpath = "./lectures/" + req.session.lti_token.lis_course_section_sourcedid.toString() + '/' + req.params.lectureName.toString()
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
				res.sendFile(path.resolve('lectures', req.session.lti_token.lis_course_section_sourcedid.toString(), req.params.lectureName.toString(), feedType.toLowerCase(), fileName.name))
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

router.get('/video/:lectureName', function (req, res) {
	const fpath = "./lectures/" + req.session.lti_token.lis_course_section_sourcedid.toString() + '/' + req.params.lectureName.toString()
	util.promisify(fs.readdir)(fpath).then((files, err) => {
		if(err){
			throw err
		}
		return files.find(e => e.endsWith('.mp4'))
	}).then( videoName =>{
		const vpath = fpath + '/' + videoName
		const stat = fs.statSync(vpath)
		const fileSize = stat.size
		const range = req.headers.range
		if (range) {
			const parts = range.replace(/bytes=/, "").split("-")
			const start = parseInt(parts[0], 10)
			const end = parts[1]
				? parseInt(parts[1], 10)
				: fileSize - 1
			const chunksize = (end - start) + 1
			const file = fs.createReadStream(vpath, { start, end })
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
	}).catch(err => {
		console.log(err)
		res.status(404).send()
	})
});

router.post("/lectureUpload", function (req, res) {
	const data = JSON.parse(req.body.data);
	const fileName = req.files.attachment.filename;
	const attachment = req.files.attachment;
	try{
		if(fileName.toString().toLowerCase().substring(fileName.length - 4) === '.mp4'){
			var date = data.lectureDate;
			date = date.substring(5) + "-" + date.substring(0, 4);
			var dir = "./lectures/" + data.courseId + "/" + date  + "--00-00-00/";

			dir = lecUpUtils.makeLecDir(dir);

			var fileLoc = dir + "videoLarge.mp4";
			if(!fs.existsSync(fileLoc)){
				fs.closeSync(fs.openSync(fileLoc, 'w'));
			}

			var read = fs.createReadStream(attachment.file);
			var write = fs.createWriteStream(fileLoc);
			read.pipe(write);

			read.on('end', () => {
				utils.deleteFolderRecursive("./uploads/" + attachment.uuid + "/");
			});
		} else {
			var date = data.lectureDate;
			date = date.substring(5) + "-" + date.substring(0, 4);
			var dir = "./lectures/" + data.courseId + "/" + date  + "--00-00-00/";

			dir = lecUpUtils.makeLecDir(dir);

			fs.createReadStream("./uploads/" + attachment.uuid + "/attachment/" + attachment.filename).pipe(unzip.Extract({ path: dir })).on('close', () => {
				utils.deleteFolderRecursive("./uploads/" + attachment.uuid + "/");
			});
		}
	} catch(e){
		res.status(500).send();
	}

	res.send();
});

router.delete("/deleteLecture", function (req, res) {
	var path = "./lectures/" + req.body.courseId + "/" + req.body.lecture + "/";
	utils.deleteFolderRecursive(path);
	res.send();
});

router.get('/calendar/populate/:fpath', function (req, res) { //Gets the calendar for a given class
	const fpath = '.\\' + decodeURIComponent(req.params.fpath);
	fs.exists(fpath, function (exists) {
		if (exists) {
			fs.readFile(fpath, function (err, data) {
				if (err) throw err;
				const eventArray = calUtils.icsToEventObjectArray(data.toString());
				res.status(200).send(eventArray);
			})
		}
		else {
			const eventArray = [];
			res.status(200).send(eventArray);
		}
	})
});

router.get('/calendar/recur/:recurEvent/:start/:end/:includes/:excludes', function (req, res) {
	let includes = req.params.includes;
	let excludes = req.params.excludes;
	if (includes === '-1') { includes = []; }
	else { includes = includes.split(','); }
	if (excludes === '-1') { excludes = []; }
	else { excludes = excludes.split(','); }
	let sDate = calUtils.formatRecurringDate(new Date(req.params.start));
	let eDate = calUtils.formatRecurringDate(new Date(req.params.end));
	var recurrence = moment.recur(sDate, eDate).every(req.params.recurEvent.split(',')).daysOfWeek();
	var dates = recurrence.all("YYYYMMDD");
	var addedIncludes = calUtils.includeDates(includes, dates, excludes);
	var filteredDates = addedIncludes.filter(function (e) { return excludes.indexOf(e) < 0 }); //Returns array with excluded dates removed, still in chronological order
	res.status(200).send(filteredDates);
});

router.post('/calendar/save/:courseId/:fpath/:url', function (req, res) {
	var events = req.body;
	const fpath = decodeURIComponent(req.params.fpath);
	if(events.length === 0){ //If they are saving an empty cal file
		fs.exists(fpath, function (exists) {
			if (exists) {
				fs.unlinkSync(fpath) //Delete the file synchronously
				res.status(200).send("Overwrote old calendar with empty calendar, so it was deleted.");
			}
			else {
				res.status(200).send("Saved empty calendar with no previously existing calendar... nothing was done.");
			}
		})
	}
	else{
		calUtils.generateICS(events, req.params.courseId, fpath, decodeURIComponent(req.params.url));
		res.status(201).send("Recording schedule successfully created: " + fpath);
	}
});

router.get('/calendar/recent', function (req, res) {
	var mostRecentICSPath = calUtils.getMostRecentICS('./lectures/Calendars/','.ics', new Date('1970-01-01T00:00:00Z'), '');
	let root = path.join("lectures", "/Calendars/");
	let base = path.join("/Calendar.ics");
	let mostRecentICSRoom = mostRecentICSPath.replace(root, "").replace(base, "");
	let csvdata = require('csvdata');
	let data = [mostRecentICSRoom]
	csvdata.load('./server/utils/CaptureRooms.csv').then(json => {
			for(let captureRoom of json){
				data.push(captureRoom.Room + "-URL-" + captureRoom.URL + captureRoom.Port);
			}
			if(mostRecentICSRoom === -1){
				data[0] = -1;
				res.status(500).send(data);
			}
			else if(mostRecentICSRoom === ""){ //If there is no calendar file at all
				res.status(200).send(data);
			}
			else{
				res.status(200).send(data);
			}
	}).catch(err => console.log('Error: ' + err));

});

module.exports = router;
