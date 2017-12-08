var express = require('express');
var router = express.Router();
var path = require('path');

if(process.env.PRODUCTION === "true"){
	router.get('/', function(req, res){
		res.sendFile(process.env.PATH_TO_BUILD + "index.html")
	});

	router.get('/static/*', function(req, res){
		const param = req.params[0]
		res.sendFile(process.env.PATH_TO_BUILD + "/static/" + param)
	});


	router.get('/images/*', function(req, res){
		const param = req.params[0]
		res.sendFile(process.env.PATH_TO_BUILD + "/images/" + param)
	});

	router.get('/manifest.json', function(req, res){
		const param = req.params[0]
		res.sendFile(process.env.PATH_TO_BUILD + "/manifest.json")
	});

	router.get('/asset-manifest.json', function(req, res){
		const param = req.params[0]
		res.sendFile(process.env.PATH_TO_BUILD + "/asset-manifest.json")
	});

	router.get('/service-worker.js', function(req, res){
		const param = req.params[0]
		res.sendFile(process.env.PATH_TO_BUILD + "/service-worker.js")
	});
}

module.exports = router;