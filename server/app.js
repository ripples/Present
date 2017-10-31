var express = require('express');
var passport = require('passport');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var index = require('./routes/index');
//var users = require('./routes/users');
var app = express();
const key = "You/'ll never walk alone"
var encryptor = require('simple-encryptor')(key)
var dirToJson = require('dir-to-json');
var path = require('path')
const fs = require('fs')
const util = require('util')
var logged = false;
var appGetAuth = false;
var appGetLectures = true;
var appGetLectureNames = true;
var appGetLectureFile = true;
var appGetLectureImages = true;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: '_secret_',
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: true
    }
}));

app.use(passport.initialize());
app.use(passport.session());
//app.use(csrf())

function isAuthenticated(req, res, next) {
  var token = req.body.oauth_signature;
  if(token) {
    logged = true;
    return next();
  }
  else if(logged) {
    return next();
  }
  else {
    res.status(404).send('Not Found');
  }
}

app.post('/data', isAuthenticated, function (req, res) {
		const hashed = encryptor.encrypt(req.body).replace(/\//g, '-');
    const url = "http://localhost:3000/" // TODO Global constant
    appGetAuth = true;
    appGetLectures = true;
    appGetLectureNames = true;
    appGetLectureFile = true;
    appGetLectureImages = true;
		res.redirect(url + hashed);
});

app.get('/identify/*', isAuthenticated, function (req, res) {
  if(logged && appGetAuth) {
    const tok = req.params[0].replace(/-/g, '/');
    const unhashed = encryptor.decrypt(tok);
    if (typeof unhashed == 'undefined' || unhashed === null) {
      res.status(404).send('Not Found');
    }
    else {
      appGetAuth = false;
      res.send(unhashed);
    }
  }
  else {
    logged = false;
  }
});

app.get('/listOfCourseLectures/:courseId', isAuthenticated, function (req, res) {
  if(logged && appGetLectures) {
    dirToJson("./lectures/" + req.params.courseId.toString(), function (err, dirTree) {
      if (err) {
        throw err;
      } else {
        appGetLectures = false;
        res.send(dirTree);
      }
    });
  }
});

app.get('/manifest/:courseId/:lectureName', isAuthenticated, function (req, res) {
  if(logged && appGetLectureNames) {
    const fpath = "./lectures/" + req.params.courseId.toString() + '/' + req.params.lectureName.toString() + '/INFO'
		fs.readFile(fpath, 'utf8', function (err, contents) {
			if (err) {
				res.status(404).send('Not Found');
			}
			else {
				const re = /(?:whiteboardCount: (\d))(?:\s|.*)*(?:computerCount: (\d))/ //this is a little bit more delicate than I'd like it to be
				const found = contents.match(re)
				const manifest = {
					whiteboardCount: parseInt(found[1]), //for some reason there is a third capture group at 0...
					computerCount: parseInt(found[2]),
					input: found['input']
				}
				res.send(manifest)
			}
		})
  }
})


app.get('/video/:courseId/:lectureName', isAuthenticated, function (req, res) {
  if(logged && appGetLectureFile) {
    const fpath = "./lectures/" + req.params.courseId.toString() + '/' + req.params.lectureName.toString() + '/videoLarge.mp4'  // TODO tie this to absolute location
		const stat = fs.statSync(fpath)
		const fileSize = stat.size
		const range = req.headers.range
		if (range) {
			const parts = range.replace(/bytes=/, "").split("-")
			const start = parseInt(parts[0], 10)
			const end = parts[1]
				? parseInt(parts[1], 10)
				: fileSize - 1
			const chunksize = (end - start) + 1
			const file = fs.createReadStream(fpath, { start, end })
			const head = {
				'Content-Range': `bytes ${start}-${end}/${fileSize}`,
				'Accept-Ranges': 'bytes',
				'Content-Length': chunksize,
				'Content-Type': 'video/mp4',
			}
			res.writeHead(206, head);
			file.pipe(res);
		}
		else {
			const head = {
				'Content-Length': fileSize,
				'Content-Type': 'video/mp4',
			}
			res.writeHead(200, head)
			fs.createReadStream(fpath).pipe(res)
		}
  }
});


/*
Scheme for sourceID
1-x is for computer, x is an feed number
2-x is for a whiteboard, x is for feed number
Maybe some diffing... 
*/
app.get('/image/:courseId/:lectureName/:sourceId/:time', isAuthenticated, function (req, res) {
  //if(logged && appGetLectureImages) {
    appGetLectureImages = false;
    const feedType = (req.params["sourceId"].split("-")[0] === "1") ? "computer" : "whiteBoard"
    const feedId = req.params["sourceId"].split("-")[1]
    const fpath = "./lectures/" + req.params.courseId.toString() + '/' + req.params.lectureName.toString()
    util.promisify(fs.readFile)(fpath+ '/INFO', 'utf8').then( contents =>{
      const re = /(?:timestamp: (\d*))/
      const found = contents.match(re)[1];
      return parseInt(req.params.time) + parseInt(found)
    }).then( cTime => {
      util.promisify(fs.readdir)(fpath + '/' + feedType).then( files => {
        const fileName = files.reduce((result, file) => {
          const splitFileName = file.split('-')
          const fileTime = parseInt(splitFileName[2].split('.')[0])
          if(splitFileName[0] === feedType && splitFileName[1] === feedId && fileTime <= cTime){
            result.push({
              name: file,
              time: fileTime
            })
          }
          return result
        }, []).sort((left, right) => left.time - right.time).pop() //this should be the file
        if(typeof fileName != 'undefined' && fileName != null){
          res.sendFile(path.resolve('lectures', req.params.courseId.toString(), req.params.lectureName.toString(), feedType, fileName.name))
        }
        else{
          res.status(404).send()
        }
      }).catch( err => res.status(404).send(err))
    }).catch( err => {
      res.status(404).send(err)
    })
  //}
});
//app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
