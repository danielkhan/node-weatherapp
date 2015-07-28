var sa = require('superagent');

function WeatherService(uri) {
    this.serviceUri = uri;
}

WeatherService.prototype.current = function (loc, done) {
    var url = this.serviceUri + '/current/' + loc;


    sa.get(url)
        .accept('json')
        .end(function (error, res) {
            if (error) return done(error);
            return done(null, res.body);
        });
};

WeatherService.prototype.forecast = function (loc, cnt, done) {
    var url = this.serviceUri + '/forecast/' + loc + '/' + cnt;
    sa.get(url)
        .accept('json')
        .end(function (error, res) {
            if (error) return done(error);
            return done(null, res.body);
        });
};

module.exports = WeatherService;