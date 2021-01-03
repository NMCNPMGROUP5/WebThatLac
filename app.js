var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressHbs = require('express-handlebars');
var hbs_sections = require('express-handlebars-sections');
const flash = require('connect-flash');
const session = require("express-session");



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const mailerRouter = require('./routes/mailer');
const connectDB = require('./data/db');
const passport = require('./passport/passport');


connectDB();

var app = express();

//handlerbar helper
app.engine('.hbs', expressHbs({
  defaultLayout: '../layout',
  extname: '.hbs',
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true
  },
  helpers: {
    section: hbs_sections(),
  }
}))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// passport middleware
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'keyboard cat'
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// pass req.user
app.use(function (req, res, next) {
  res.locals.user = req.user
  next()
})

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/mail', mailerRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
