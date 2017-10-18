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
6. put your lecture files in the folder lv-client2/lectures -You may use a symlink for this if you so choose.
file tree should be:
* courseId
    * lectureId
        * videoLarge.mp4
    * lectureId
        * videoLarge.mp4
    * lectureId
        * videoLarge.mp4
* courseId
* courseId


7. in lv-client2 run "node ./bin/www"
8. cd into client (using a second terminal) and run "npm start"
9. launch your local instance of moodle and create a course (dont set the course to start or end after the year 2037 if you have a 32-bit installation)
10. go to the courses page, enable editing mode in the top right, and create a new activity
11. select "external tool" as the activity
12. in the settings for the tool add a preconfigured tool configuration
13. set the tool URL to "localhost:3001/data"
14. set the default launcher container to "new window"
15. finish creating the configuration
16. select the new configuration for your activities preconfigured tool
17. finish creating the activity
18. leave editing mode and click on the activiy. If it brings you to our web app, everything is working properly.
