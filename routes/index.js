var express = require('express');
var router = express.Router();
var database = require('../database/database.js');
var dirToJson = require('dir-to-json');

const fs = require('fs');


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
