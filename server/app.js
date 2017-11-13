var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bb = require('express-busboy');
var session = require('express-session');
var csurf = require('csurf')

var public = require('./routes/public');
var api = require('./routes/api');
var upload = require('./routes/upload')

var csrfProtection = csrf({ cookie: false })

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));

bb.extend(app, {
    upload: true,
    path: './uploads',
    allowedPath: /./
});

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', public);
app.use('/api', api)
app.user('/upload', upload)

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
