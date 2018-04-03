const fs = require('fs');
var util = require('util');


const utils = {
	deleteFolderRecursive: function (path) {
		if (fs.existsSync(path)) {
			fs.readdirSync(path).forEach(function (file, index) {
				var curPath = path + "/" + file;
				if (fs.lstatSync(curPath).isDirectory()) { // recurse
					utils.deleteFolderRecursive(curPath);
				} else { // delete file
					fs.unlinkSync(curPath);
				}
			});
			fs.rmdirSync(path);
		}
	},

	lectureFolderNameToDate: function (lecture) {
		return new Date(parseInt(lecture.name.substring(6, 11)), parseInt(lecture.name.substring(0, 2)) - 1, parseInt(lecture.name.substring(3, 5)));
	},

	videoExists: function(path){
		const files = fs.readdirSync(path)
		for(let file of files){
			if(file.endsWith('mp4')){
				return true
			}
		}
		return false
	},

	//Used to create an entire filepath if the parent directories do not exist (sync)
	createFPathSync: function (fpath) {
		var path = fpath.replace(/\/$/, '').split('/');

    for (var i = 1; i <= path.length; i++) {
        var segment = path.slice(0, i).join('/');
        !fs.existsSync(segment) ? fs.mkdirSync(segment) : null ;
    }
	}
}

module.exports = utils
