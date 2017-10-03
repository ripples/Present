LV-client2
===
This is a stripped down version of lecture viewer that will be accessed through moodle using lti.

How To Setup
---

1. install node
2. install a local version of moodle
3. clone the repository
4. cd into the client directory and run "npm install"
5. cd lv-client2 and run "npm install"
6. in lv-client2 run "node .\bin\www"
7. cd into client (using a second terminal) and run "npm start"
8. launch your local instance of moodle and create a course (dont set the course to start or end after the year 2037 if you have a 32-bit installation)
9. go to the courses page, enable editing mode in the top right, and create a new activity
10. select "external tool" as the activity
11. in the settings for the tool add a preconfigured tool configuration
12. set the tool URL to "localhost:3001/data"
13. set the default launcher container to "new window"
14. finish creating the configuration
15. select the new configuration for your activities preconfigured tool
16. finish creating the activity
17. leave editing mode and click on the activiy. If it brings you to our web app, everything is working properly.
