var express = require('express');
var router = express.Router();

var config = require('../../config');

var WeatherService = require('../services/WeatherService');
var ws = new WeatherService(config.service.uri);

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Weather station',
        tpl: req.query.tpl || null
    });
});

router.get('/current', function (req, res, next) {

    ws.current(req.query.loc, function(e, r) {

        if(e) return next(e);
        if(r && r.cod != 200) {
            var error =  new Error();
            error.status = r.cod;
            error.message = r.message;
            return next(error);
        }

        res.render('weather', {
            title: 'Weather station',
            data: r,
            loc: req.query.loc,
            tpl: req.query.tpl || null
        });
    });
});

router.get('/forecast', function (req, res, next) {

    ws.forecast(req.query.loc, req.query.days, function(e, r) {
        if(e) return next(e);
        if(r && r.cod != 200) {
            var error =  new Error();
            error.status = r.cod;
            error.message = r.message;
            return next(error);
        }

        res.render('weather', {
            title: 'Weather station',
            data: r,
            forecast: true,
            loc: req.query.loc,
            tpl: req.query.tpl || null
        });
    });
});

module.exports = router;
