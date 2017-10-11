var database = {
		context_id:"2",
		context_label:"Ripples",
		context_title:"Ripples-Test",
		context_type:"CourseSection",
		ext_lms:"moodle-2",
		ext_user_username:"admin",
		launch_presentation_document_target:"window",
		launch_presentation_locale:"en",
		launch_presentation_return_url:"http://localhost/mod/lti/return.php?course=2&launch_container=4&instanceid=3&sesskey=mgYaUv2UfZ",
		lis_course_section_sourcedid:"666",
		lis_outcome_service_url:"http://localhost/mod/lti/service.php",
		lis_person_contact_email_primary:"rsusai@umass.edu",
		lis_person_name_family:"User",
		lis_person_name_full:"Admin User",
		lis_person_name_given:"Admin",
		lis_person_sourcedid:"",
		lti_message_type:"basic-lti-launch-request",
		lti_version:"LTI-1p0",
		oauth_callback:"about:blank",
		resource_link_description:"",
		resource_link_id:"3",
		resource_link_title:"lv-client 3",
		roles:"Instructor,urn:lti:sysrole:ims/lis/Administrator,urn:lti:instrole:ims/lis/Administrator",
		tool_consumer_info_product_family_code:"moodle",
		tool_consumer_info_version:"2017090700",
		tool_consumer_instance_description:"Ripples-Moodle",
		tool_consumer_instance_guid:"localhost",
		tool_consumer_instance_name:"Moodle",
		user_id:"2"
}

exports.getDB = function (){
    return database;
};

exports.setDB = function(data){
    database = data;
}