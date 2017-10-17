var express = require('express');
var router = express.Router();
var database = require('../database/database.js');
var dirToJson = require('dir-to-json');

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
  dirToJson( "./public", function( err, dirTree ){
    if( err ){
        throw err;
    }else{
        res.send(dirTree);
    }
  });
});

module.exports = router;
