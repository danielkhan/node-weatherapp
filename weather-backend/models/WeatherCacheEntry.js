var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ttl = 300;

var WeatherCacheEntry = new Schema({

    qt: {type: String, required: true, index: false},
    days: {type: Number, default: 0, required: true, index: false},
    location: {type: String, required: true, index: false},
    data: {},
    timestamp: {type: Date, default: Date.now, required: true, unique: false, index: true, expires: ttl}
});

WeatherCacheEntry.index({qt: 1, location: 1, days: 1}, {unique: true});

WeatherCacheEntry.statics.findEntry = function (qt, location, days, cb) {
    var query = this.where({qt: qt, location: location, days: days});
    query.findOne(cb);
};

WeatherCacheEntry.statics.createEntry = function (qt, location, days, data, cb) {
    var entry = new this();
    entry.qt = qt;
    entry.days = days;
    entry.location = location;
    entry.data = data;
    entry.save(cb);
};

module.exports = mongoose.model('WeatherCacheEntry', WeatherCacheEntry);