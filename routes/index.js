var express = require('express');
var router = express.Router();
var database = require('../database/database.js');

router.get('/data', function(req, res){
  res.json(database.getDB());
});

router.post('/data', function(req, res){
  database.setDB(req.body);
  res.redirect("http://192.168.1.13:3000/");
});

module.exports = router;
