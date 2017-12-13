# PAOL Present
PAOL Present is a web client for PAOL lecture capture. It is simple, lightweight, requires little configuration, and open source. It uses technology from [IMS Global Learning Consortium's Learning Tools Interopability](http://www.imsglobal.org/activity/learning-tools-interoperability).

## Enviornment Setup

Present's developer enviornment can be in Windows, OSX, and Linux.

1. Install the latest version of [NodeJS](https://nodejs.org/en/).
1. If on Windows, install [OpenSSL 1.0.2m](https://slproweb.com/products/Win32OpenSSL.html) and have either a C++ compiler installed (I.E. Visual Studio) or use [Windows Build Tools](https://github.com/felixrieseberg/windows-build-tools) .
1. Run `npm install`
1. Create your `.env` file if you want to use custom ports in development.
1. Either use a deployment script, or `npm run start-all`
1. Visit from a valid LTI consumer such as Moodle, Sakai, or Canvus.

## Lectures Folder
### Folder Structure
Place your lecture files in the folder `Present/lectures`. You may use a symlink for this if you so choose. Either create this folder yourself or it will be created the first time that the server is run

The file tree should be as follows:

* Course
    * Lecture Date (mm-dd-yyyy--hh-mm-ss)
        * videoLarge.mp4
        * computer
			* computer-#-time.png
		* whiteboard
			* whiteBoard-#-time.png
		* INFO
    * Lecture Date (mm-dd-yyyy--hh-mm-ss)
        * video.mp4
		* INFO
* Course
* Course

The video can be named whatever you want, but it has to be in an mp4 format.

### Info File
The following is an example of an INFO file.

```
[course]
id: PAOL100
term: F17

[pres]
start: 2017,10,12,12,59,03
duration: 3150
source: paolCap303
timestamp: 1476291543
whiteboardCount: 3
computerCount: 1
```

## Deployment

### The `.env` file

 In order to make deployment easy, a `.env` file must be created in the root of `Present` in order know what ports to use for the Proxy. The following is an example of one in use at [UMass Amherst](http://umass.edu/).
```
PRODUCTION=true
PATH_TO_BUILD="/home/user/Present/client/build/"
SERVER_PATH=present.cs.umass.edu
SERVER_PORT=3001
PRESENT_PATH=present.cs.umass.edu
PRESENT_PORT=3000
PROXY_PORT=80
COOKIE_SECRET="You think I'd put the real one here?"
LTI_SECRET="Guess Again!"
```
If you do not create an env file, it will use default values as shown in `/Present/bin/init.js`.

| Value | Description | Default Value |
| ----- | ----------- | ------------- |
| PRODUCTION | Set to true if production, will serve HTTP pages | `false` |
| PATH_TO_BUILD | Where the build folder is in your filesystem, typically `/Present/client/build` | `undefined` |
| SERVER_PATH | Where the server is | localhost |
| SERVER_PORT | Port where the server is running | 3001 |
| PRESENT_PATH | URL of client, only used if production is `false` | localhost |
| PRESENT_PORT | Port of front end, only used if production is `false` | 3000 |
| PROXY_PORT | Port that the proxy is running on | 3002 |
| COOKIE_SECRET | Value for the cookie secret | Arbitrary String |
| LTI_SECRET | Value for LTI shared secret | 'secret'

**Don't forget that trailing slash in PATH_TO_BUILD**

### Deployment Scripts

Suggested production deployment of the project may be done in included `npm run` scripts using [PM2](https://github.com/Unitech/pm2). You may either install it globally using `npm i pm2 -g` or use the included dev dependency version with `npx pm2`.

These included scripts may also be useful for development.

| Command  | Description |
| -------- | ------------- |
| start | Starts the server with NPM |
| start-server | Identical to *start* |
| start-client | Starts a server for the client |
| build-client | Builds an optimized verison of the client |
| build-start | Builds the client then starts the server |
| start-all | Starts the client and server at the same time |
| start-pm2-all | Starts the client and server using PM2 |
| start-pm2-server | Starts the server using PM2 |
| start-pm2-prod | Builds the client and then starts the server with PM2 |

Some quick ways to kill PM2 are `pm2 kill` which just kills the entire daemon, and `pm2 delete npm` which will delete the process (which is usually just called NPM). If you want to be more slick with PM2, or any other daemon, may configure it on your own.

Note: PM2 does not work properly with NPM on Windows, but hopefully you are using Unix in production.

## LMS Intergration

Present may be used with any LMS that supports  [IMS Global Learning Consortium's Learning Tools Interopability aka LTI](http://www.imsglobal.org/activity/learning-tools-interoperability). The system has been tested extensively with Moodle and Sakai.

### Moodle

To intergrate with Moodle, one needs to create an external tool from their class and add their Present server as an LTI tool. 

![Step 1](https://i.imgur.com/UbavnOg.png)
![Step 2](https://i.imgur.com/dCBNDIc.png)

The tool name is not releveant. The tool URL should match the URL and port of where you deployed to. The consumer key must be `key` as listed. The shared secret should match the `LTI_SECRET` in your `.env` file. Custom Parameters may also be added to ensure proper syncing with folders created by the capture tool. They are not required however. The launch container should also be set to New Window.

![Step 3](https://i.imgur.com/buWdhTd.png)

Once done, hit save changes. Then save and return to course, and finally you may test the tool.

## Sakai

With Sakai, you may need to have your system administrator allow for you to add the LTI External tool. First, under site info, go to `Mange Tools`

![Step 1](https://i.imgur.com/kMqeOS2.png)

On our installation, you then need to go to Plugin Tools and select PAOL LTI; however, on other installations, you may just select external tool under the general menu.

![Step 2](https://i.imgur.com/HcMTdKE.png)

You then need to configure the launch URL with where you have Present deployed, in adition to the launch key value as `key` and the secret as whatever is in the `.env` for `LTI_SECRET`. Custom parameters may be added ensure proper syncing of classnames with capture.

![Step 3](https://i.imgur.com/bFUe11o.png)

Hit continue, then finish, and the button should work.

## FAQS

- No Lectures are showing up!
    - Make sure that the class IDs in Moodle and Sakai line up. With what is in the `/lectures/` folder. You may want to use the custom parameter for `class_name`.
- I have multiple sections and one LMS page? How can this be FERPA compliant?
    - As long as you keep the recordings consistently in different folders, I.E. classname-1 and classname-2, you may use the `section_number` custom parameter and make several different buttons that are only visible to certain groups through the LMS. This has been tested at Ithaca College and UMass Amherst.
- Do I have to use your webserver; can I use something like Apache instead?
    - Sure, just set Production to `false` and use the `PRESENT_PATH` and `PRESENT_PORT` variables to point to your server.
- I am already running an NGINX reverse proxy? Do I have to use yours?
    - As of now, yes. However you may just piggyback our Redbird proxy over NGINX.
- I am getting invalid signature errors.
    - This periodically happens if the Launch URL does not include `http://`. 
- Do you support SSL?
    - Some day. We aim to make it easy to add.
