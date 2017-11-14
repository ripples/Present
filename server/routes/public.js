var express = require('express');
var router = express.Router();
var path = require('path');

router.post('/data', function (req, res) {
	req.session.lti_token = req.body;
	const url = "http://localhost/" // TODO Global constant

	res.redirect(url);
});

if(process.env.PRODUCTION){
	router.get('/', function(req, res){
		res.sendFile(process.env.PATH_TO_BUILD + "index.html")
	});

	router.get('/static/*', function(req, res){
		res.sendFile(process.env.PATH_TO_BUILD + "/static/" + req.params[0])
	});
}

module.exports = router;