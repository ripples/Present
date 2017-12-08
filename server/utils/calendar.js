const fs = require('fs');
const path = require('path');
var moment = require('moment');
require('moment-recur');
const csv = require('fast-csv');

module.exports = {
  generateICS: function(events, courseId) {
	var START_TAG = "BEGIN:VCALENDAR\nPRODID:Calendar\nVERSION:2.0\n", END_TAG = "END:VCALENDAR";
	var fileText = "";
	if(events.length === 0) {
		fileText = START_TAG + END_TAG;
	}
	else{
		var dateNow = module.exports.getICSDateNow();
		var DTSTAMP = dateNow[0] + dateNow[1] + dateNow[2] + dateNow[3] + dateNow[4] + dateNow[5] + dateNow[6] + "Z";
		var lectureDir = dateNow[1] + "-" + dateNow[2] + "-" + dateNow[0] + "--" + dateNow[4] + "-" + dateNow[5] + "-" + dateNow[6];
		fileText += START_TAG;
		var index = 0;
		for (let event of events) {
			fileText += "BEGIN:VEVENT\n";
			fileText += "UID:" + DTSTAMP + "-LV-" + event.title + "\n";
			fileText += (index + "@default\nCLASS:PUBLIC\n");
			fileText += ("DESCRIPTION:" + event.description + "\n");
			fileText += ("DTSTAMP;VALUE=DATE-TIME:" + DTSTAMP + "\n");
			fileText += ("DTSTART;VALUE=DATE-TIME:" + module.exports.jsDateToICSDate(event.start) + "\n");
			fileText += ("DTEND;VALUE=DATE-TIME:" + module.exports.jsDateToICSDate(event.end) + "\n");
			fileText += ("LOCATION:" + event.location + "\n");
			fileText += ("SUMMARY;LANGUAGE=en-us:" + event.summary + "\n");
			fileText += "TRANSP:TRANSPARENT\nEND:VEVENT\n";
			index += 1;
		}
		fileText += END_TAG;
	}
	fs.writeFileSync("./lectures/" + courseId + "/Calendar.ics", fileText, function (err) {
		if (err) return console.log(err);
	});
  	let fetch = require('node-fetch');
  	let FormData = require('form-data');
  	const stats = fs.statSync("./lectures/" + courseId + "/Calendar.ics");
  	const fileSizeInBytes = stats.size;
  	var body = new FormData();
  	var filedata = 0
  	try {
  		filedata = fs.readFileSync("./lectures/" + courseId + "/Calendar.ics", 'utf8');
  	} catch (e) {
  		console.log('Error:', e.stack);
  	}

  	body.append('file', filedata);
  	fetch('http://cap142.cs.umass.edu:8001/', { //Send the newly created schedule to the capture server
  		method: 'POST',
  		headers: {
  			'Content-Length': fileSizeInBytes,
  			'Content-Type': undefined //To set data boundaries automatically... workaround
  			//'Authorization': 'Basic' + base64.encode(username + ":" + password)
  		},
  		body: body
  	})
  		.then(function (res) {
  			return res.text();
  		}).then(function (text) {
  			console.log(text);
  		}).catch(function (error) {
  			console.log('Fetch operation error: ' + error.message);
  		});
  },

  jsDateToICSDate: function(datestring) {
  	let yyyy = datestring.substring(0, 4);
  	let mm = datestring.substring(5, 7);
  	let dd = datestring.substring(8, 10);
  	let hh = datestring.substring(11, 13);
  	let min = datestring.substring(14, 16);
  	let ss = datestring.substring(17, 19);
  	return (yyyy + mm + dd + 'T' + hh + min + ss + "Z");
  },

  isDuplicate: function(date, dates, excludes) {
  	return (dates.includes(date) && !excludes.includes(date));
  },

  formatRecurringDate: function(date) {
  	let year = date.getFullYear().toString();
  	let month = (date.getMonth() + 1).toString();
  	let day = date.getDate().toString();
  	if (month.length === 1) { month = '0' + month; }
  	if (day.length === 1) { day = '0' + day; }
  	return moment(year + month + day, "YYYYMMDD");
  },

  includeDates: function(includes, initial, excludes) {
  	var newArr = initial;
  	for (var i = 0; i < includes.length; i++) {
  		if (!module.exports.isDuplicate(includes[i], initial, excludes)) {
  			newArr = newArr.concat(includes[i]);
  		}
  	}
  	return newArr;
  },

  getICSDateNow: function() { //Gets the current timestamp in YYYYMMDDTHHMMSS format (for ics file generation)
  	var now = new Date();
  	var year = "" + now.getFullYear();
  	var month = "" + (now.getMonth() + 1); if (month.length == 1) { month = "0" + month; }
  	var day = "" + now.getDate(); if (day.length == 1) { day = "0" + day; }
  	var hour = "" + now.getHours(); if (hour.length == 1) { hour = "0" + hour; }
  	var minute = "" + now.getMinutes(); if (minute.length == 1) { minute = "0" + minute; }
  	var second = "" + now.getSeconds(); if (second.length == 1) { second = "0" + second; }
  	return [year, month, day, "T", hour, minute, second];
  },

  icsToEventObjectArray: function(icsFileText) { //Converts the text of an ics file to an array of JSON objects readable by the calendar component
  	var eventArray = [];
  	var filetextsplit = icsFileText.split('\n');
  	filetextsplit.splice(0, 3); //Remove the first 3 unnecessary lines from file
	filetextsplit.splice(-1, 1); //Remove last line from file, also don't need
	if(filetextsplit.length === 0){
		return []
	}
  	var numEvents = parseInt(filetextsplit[filetextsplit.length - 10].substring(0, 2)); //Contains the number of events in calendar
  	for (var i = 0; i <= numEvents; i++) {
  		var currentEvent = {};
  		for (var line = 0; line < 12; line++) {
  			var curline = filetextsplit[0];
  			switch (line) {
  				case 1:
  					let title = curline.split("-LV-");
  					currentEvent.title = title[1];
  					filetextsplit.splice(0, 1);
  					break;
  				case 4:
  					var description = curline.substring(12);
  					if (description === '') { continue; }
  					else { currentEvent.description = curline.substring(12); }
  					filetextsplit.splice(0, 1);
  					break;
  				case 6:
  					var year = curline.substring(24, 28);
  					var month = curline.substring(28, 30);
  					var day = curline.substring(30, 32);
  					var hour = curline.substring(33, 35);
  					var min = curline.substring(35, 37);
  					if (month.length === 1) { month = '0' + month; }
  					if (day.length === 1) { day = '0' + day; }
  					var datestring = year + '-' + month + '-' + day + 'T' + hour + ':' + min + ':00Z';
  					currentEvent.start = new Date(datestring);
  					filetextsplit.splice(0, 1);
  					break;
  				case 7:
  					var year = curline.substring(22, 26);
  					var month = curline.substring(26, 28);
  					var day = curline.substring(28, 30);
  					var hour = curline.substring(31, 33);
  					var min = curline.substring(33, 35);
  					if (month.length === 1) { month = '0' + month; }
  					if (day.length === 1) { day = '0' + day; }
  					var datestring = year + '-' + month + '-' + day + 'T' + hour + ':' + min + ':00Z';
  					let end = new Date(datestring);
  					currentEvent.end = end;
  					filetextsplit.splice(0, 1);
  					break;
  				case 8:
  					currentEvent.location = curline.substring(9);
  					filetextsplit.splice(0, 1);
  					break;
  				case 9:
  					let sem_CID = curline.split(" ");
  					currentEvent.summary = sem_CID[0].substring(23) + ' ' + sem_CID[1];
  					currentEvent.courseId = sem_CID[1];
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
  },

  getMostRecentICS: function(startPath, filter, mostRecentDate, fpath) {
    if(!fs.existsSync(startPath)){
      console.log("Error: Directory doesn't exist.");
      return -1;
    }
    var files = fs.readdirSync(startPath);
    for(var i = 0; i < files.length; i++){
      var filename = path.join(startPath, files[i]);
	  var stat = fs.lstatSync(filename);
      if(stat.isDirectory()){
        module.exports.getMostRecentICS(filename, filter, mostRecentDate, fpath); //recurse
      }
      else if(filename.indexOf(filter) >= 0){
    		if(stat.mtime > mostRecentDate){
    			mostRecentDate = stat.mtime;
    			fpath = filename;
    		}
      }
	  }
	  console.log('MOST RECENT: ' + fpath + ' ' + mostRecentDate);
    return fpath; //Return the file path of the most recent calendar file.
  }
}
