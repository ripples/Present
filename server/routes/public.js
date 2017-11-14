var express = require('express');
var router = express.Router();

router.post('/data', function (req, res) {
	req.session.lti_token = req.body;
	const url = "http://localhost/" // TODO Global constant

	res.redirect(url);
});

module.exports = router;