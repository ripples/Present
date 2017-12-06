var express = require('express');
var router = express.Router();
var path = require('path');

if(process.env.PRODUCTION === "true"){
	router.get('/', function(req, res){
		res.sendFile(process.env.PATH_TO_BUILD + "index.html")
	});

	router.get('/static/js/*', function(req, res){
		const param = req.params[0]
		res.sendFile(process.env.PATH_TO_BUILD + "/static/js/" + param)
	});

	router.get('/static/css/*', function(req, res){
		const param = req.params[0]
		res.sendFile(process.env.PATH_TO_BUILD + "/static/css/" + param)
	});

	router.get('/:param', function(req, res){
		res.sendFile(process.env.PATH_TO_BUILD + "/" + req.params.param)
	});
}

module.exports = router;