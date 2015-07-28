var restify = require('restify');

var OpenWeatherMap = require('./services/OpenWeatherMap');
var owm = new OpenWeatherMap();
var WeatherCacheEntry = require('./models/WeatherCacheEntry');
var mongoose = require('mongoose');
var config = require('../config');
mongoose.connect(config.service.db.dsn);
var db = mongoose.connection;


function current(req, res, next) {

    WeatherCacheEntry.findEntry('current', req.params.location, 0, function (qe, qr) {
        if (qe) return next(qe);

        if(qr) {
            res.json(qr.data);
            return next();
        }
        owm.current(req.params.location, function (e, r) {
            if (e) return next(e);
            var code = parseInt(r.cod);
            if (r && code !== 200) {
                return res.send(code, {message: r.message});
            }

            WeatherCacheEntry.createEntry('current', req.params.location, 0, r, function(qe, qr) {
                if (qe) return next(qe);
                res.json(r);
                return next();
            });
        });
    });
}

function forecast(req, res, next) {

    WeatherCacheEntry.findEntry('forecast', req.params.location, req.params.days, function (qe, qr) {
        if (qe) return next(qe);
        if(qr) {
            res.json(qr.data);
            return next();
        }
        owm.forecast(req.params.location, req.params.days, function (e, r) {
            if (e) return next(e);
            var code = parseInt(r.cod);
            if (r && code !== 200) {
                return res.send(code, {message: r.message});
            }

            WeatherCacheEntry.createEntry('forecast', req.params.location, req.params.days, r, function(qe, qr) {
                if (qe) return next(qe);
                res.json(r);
                return next();
            });
        });
    });


}

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    console.log('Connected to MongoDB');
    var server = restify.createServer();
    server.get('/weather/current/:location', current);
    server.get('/weather/forecast/:location/:days', forecast);
    server.listen(config.service.port, function () {
        console.log('%s listening at %s', server.name, server.url);
    });
});

