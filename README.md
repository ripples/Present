# PAOL Present
PAOL Present is a web client for PAOL lecture capture. It is simple, lightweight, requires little configuration, and open source. It uses technology from [IMS Global Learning Consortium's Learning Tools Interopability](http://www.imsglobal.org/activity/learning-tools-interoperability).

## Enviornment Setup

Present's developer enviornment can be in Windows, OSX, and Linux.

1. Install the latest version of [NodeJS](https://nodejs.org/en/).
1. If on Windows, install [OpenSSL 1.0.2m](https://slproweb.com/products/Win32OpenSSL.html) and have either a C++ compiler installed (I.E. Visual Studio) or use [Windows Build Tools](Windows-Build-Tools) .
1. Run `npm install`
1. Create a folder called `lectures` and place it in the root of the project.
1. Create your `.env` file if you want to use custom ports in development.
1. Either use a deployment script, or `npm run start-all`
1. Visit from a valid LTI consumer such as Moodle, Sakai, or Canvus.

## Lectures Folder

### Folder Structure
Create your lecture files in the folder `lv-client2/lectures`. You may use a symlink for this if you so choose.
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

 In order to make deployment easy, a `.env` file must be created in the root of `lv-client2` in order know what ports to use for the Proxy. The following is an example of one in use at [UMass Amherst](umass.edu).

```
PRODUCTION=true
PATH_TO_BUILD="/home/user/lv-client2/client/build/"
SERVER_PATH=present.cs.umass.edu
SERVER_PORT=3001
PRESENT_PATH=present.cs.umass.edu
PRESENT_PORT=3000
PROXY_PORT=80
COOKIE_SECRET="You think I'd put the real one here?"
LTI_SECRET="Guess Again!"
```

If you do not create an env file, it will use default values as shown in `/lv-client2/bin/init.js`.

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

Some quick ways to kill PM2 are `pm2 kill` which just kills the entire daemon, and `pm2 delete npm` which will delete the process (which is usually just called NPM). If you want to be more slick with PM2, or any other daemon, do it yourself.

Note: PM2 does not work properly with NPM on Windows, but hopefully you are using Unix in production.