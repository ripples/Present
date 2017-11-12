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