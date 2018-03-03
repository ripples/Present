var express = require('express');
var router = express.Router();
const fs = require('fs');
const unzip = require('unzip');
const utils = require('../utils/utils');

router.post('/lecture-zip', function (req, res) {
	const file = req.files.file
	const tmp_path = file.file;
	const target_path = './lectures';
	try {
		fs.createReadStream(tmp_path).pipe(unzip.Extract({ path: target_path }));
		res.status(200).send()
	}
	catch (err) {
		res.status(400).send(err)
	}

	//now cleanup
	fs.unlink(tmp_path, (err) => {
		if (err) console.log("Error deleting file \"" + tmp_path + "\", consider removing files in tmp upload directory \nERR: " + err)
	})
});

router.post('/:courseId/lecture-zip', function (req, res) {
	const file = req.files.file
	const courseId = req.params.courseId
	const tmp_path = file.file;
	const target_path = './lectures/' + courseId;
	try {
		fs.createReadStream(tmp_path).pipe(unzip.Extract({ path: target_path }));
		res.status(200).send()
	}
	catch (err) {
		res.status(400).send(err)
	}

	utils.deleteFolderRecursive(tmp_path);

});

module.exports = router;