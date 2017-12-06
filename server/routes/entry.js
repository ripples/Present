var express = require('express');
var router = express.Router();

router.post('/', function (req, res) {
	req.session.lti_token = req.body;
	if(req.body.custom_class_name && req.body.lis_course_section_sourcedid){
		req.session.lti_token.lis_course_section_sourcedid_original = req.body.lis_course_section_sourcedid
		req.session.lti_token.lis_course_section_sourcedid = req.body.custom_class_name
	}
	if(req.body.custom_section_number){
		req.session.lti_token.lis_course_section_sourcedid = req.session.lti_token.lis_course_section_sourcedid + '-' + req.body.custom_section_number
	}
	const url = 'http://' + process.env.PRESENT_PATH + ':' + process.env.PROXY_PORT

	res.redirect(url);
})

module.exports = router;