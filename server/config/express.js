var express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    passport = require('passport');

module.exports = function(app, config) {
    app.set('view engine', 'jade');
    app.set('views', config.rootPath + '/server/views');
    app.use(cookieParser());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json({limit: '50mb'}));
    app.use(session({
        resave: true,
        saveUninitialized: true,
        secret: "unicorns" // pass a cookie
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(express.static(config.rootPath + '/public'));
    // app.use(function (req, res, next) {
    //  console.log(req.user);
    //  next();
    // });
};
