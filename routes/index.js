var express = require('express');
var router = express.Router();
var database = require('../database/database.js');
var dirToJson = require('dir-to-json');
var moment = require('moment');
require('moment-recur');

const fs = require('fs');

export function generateCalendar(sDate, eDate, sTime, eTime, recurDays, excludeDates, description, location, summary) {
  var start = moment(startDate, "MM-DD-YYYY"), end = moment(endDate, "MM-DD-YYYY");
  var recurrence = moment.recur(start, end).every(recurDays).daysOfWeek(); //Create moment recurrence object of date list
  var initialDates = recurrence.all("L"); //Generate string array of dates in "MM-DD-YYYY" format, in chronological order
  var filteredDates = dates.filter(function(e){return this.indexOf(e)<0}, excludeDates); //Returns array with excluded dates removed, still in chronological order
  generateICS(filteredDates, [sDate, eDate, sTime, eTime, description, location, summary])
}

function getFormattedDateNow() { //Gets the current timestamp in YYYYMMDDTHHMMSS format (for ics file generation)
  var now = new Date();
  var year = "" + now.getFullYear();
  var month = "" + (now.getMonth() + 1); if (month.length == 1) { month = "0" + month; }
  var day = "" + now.getDate(); if (day.length == 1) { day = "0" + day; }
  var hour = "" + now.getHours(); if (hour.length == 1) { hour = "0" + hour; }
  var minute = "" + now.getMinutes(); if (minute.length == 1) { minute = "0" + minute; }
  var second = "" + now.getSeconds(); if (second.length == 1) { second = "0" + second; }
  return year + month + day + "T" + hour + minute + second;
}

function generateICS(dates, tags) {
  var fileText = "";
  var START_TAG = "BEGIN:VCALENDAR\nPRODID:Calendar\nVERSION:2.0\n", END_TAG = "END:VCALENDAR";
  const SDATE = 0, EDATE = 1, STIME = 2, ETIME = 3, DESCRIPTION = 4, LOCATION = 5, SUMMARY = 6;

  fileText += START_TAG;

  for(var i = 0; i < dates.length; i++){
    fileText += "BEGIN:VEVENT\n";
    fileText += (i + "@default\nCLASS:PUBLIC\n");
    fileText += ("DESCRIPTION:" + tags[DESCRIPTION] + "\n");
    fileText += ("DTSTAMP;VALUE=DATE-TIME:" + getFormattedDateNow() + "\n");
    fileText += ("DTSTART;VALUE=DATE-TIME:" + tags[SDATE] + "T" + tags[STIME] + "\n");
    fileText += ("DTEND;VALUE=DATE-TIME:" + tags[EDATE] + "T" + tags[ETIME] + "\n");
    fileText += ("LOCATION:" + tags[LOCATION] + "\n");
    fileText += ("SUMMARY;LANGUAGE=en-us:" + tags[SUMMARY] + "\n");
    fileText += "TRANSP:TRANSPARENT\nEND:VEVENT\n";
  }

  fileText += END_TAG;

  //Save as ics file to server filesystem
}


router.get('/data', function(req, res){
  var data = database.getDB();
  database.setDB({});
  res.json(data);
});

router.post('/data', function(req, res){
  database.setDB(req.body);
  res.redirect("http://localhost:3000/");
});

router.get('/listOfCourseLectures', function(req, res){
  dirToJson( "./lectures", function( err, dirTree ){
    if( err ){
        throw err;
    }else{
        console.log(dirTree)
        res.send(dirTree);
    }
  });
});

router.get('/:courseId/:lectureName/video', function(req, res) {
  const path = "./lectures/" + req.params.courseId.toString() + '/' + req.params.lectureName.toString() + '/videoLarge.mp4'
  const stat = fs.statSync(path)
  const fileSize = stat.size
  const range = req.headers.range
  if (range) {
    const parts = range.replace(/bytes=/, "").split("-")
    const start = parseInt(parts[0], 10)
    const end = parts[1]
      ? parseInt(parts[1], 10)
      : fileSize-1
    const chunksize = (end-start)+1
    const file = fs.createReadStream(path, {start, end})
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'video/mp4',
    }
    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    }
    res.writeHead(200, head)
    fs.createReadStream(path).pipe(res)
  }
});

module.exports = router;
