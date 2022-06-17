var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var cors = require("cors");
var logger = require('morgan');

var indexRouter = require('./routes/index');
var commentsRouter = require('./routes/comments');

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/comments', commentsRouter);

module.exports = app;
