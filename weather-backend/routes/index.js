var express = require('express');
var router = express.Router();

var OpenWeatherMap = require('../services/OpenWeatherMap');
var owm = new OpenWeatherMap();
var WeatherCacheEntry = require('../models/WeatherCacheEntry');
var mongoose = require('mongoose');
var config = require('../../config');
mongoose.connect(config.service.db.dsn);
var db = mongoose.connection;

router.get('/weather/current/:location', function (req, res, next) {

    owm.current(req.params.location, function (e, r) {
        if (e) return next(e);
        var code = parseInt(r.cod);
        if (r && code !== 200) {
            return res.send(code, {message: r.message});
        }

        return res.json(r);
    });

});

router.get('/weather/forecast/:location/:days', function (req, res, next) {

    owm.forecast(req.params.location, req.params.days, function (e, r) {
        if (e) return next(e);
        var code = parseInt(r.cod);
        if (r && code !== 200) {
            return res.send(code, {message: r.message});
        }

        return res.json(r);

    });

});


module.exports = router;
