var express = require('express');
var router = express.Router();
var key = "You/'ll never walk alone"
var encryptor = require('simple-encryptor')(key)

router.post('/data', function (req, res) {
	const hashed = encryptor.encrypt({
		lti: req.body,
		csrf: req.csrfToken()
	}).replace(/\//g, '-');
	const url = "http://localhost:3000/" // TODO Global constant

	res.redirect(url + hashed);
});

router.get('/identify/*', function (req, res) {
	const tok = req.params[0].replace(/-/g, '/');
	const unhashed = encryptor.decrypt(tok);
	if (typeof unhashed == 'undefined' || unhashed === null) {
		res.status(404).send('Not Found');
	}
	else {
		res.send(unhashed);
	}
});

module.exports = router;