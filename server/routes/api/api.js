var express = require('express');
var router = express.Router();
var dirToJson = require('dir-to-json');
var path = require('path')
var fs = require('fs')
var util = require('util')
var unzip = require('unzip')
var key = "You/'ll never walk alone"
var encryptor = require('simple-encryptor')(key)

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

module.exports = router;
