var frontendPort = 3333;
var servicePort = 3334;

module.exports = {
    frontend: {
        port: frontendPort
    },
    service: {
        port: servicePort,
        uri: 'http://127.0.0.1:' + servicePort + '/weather',
        db: {
            dsn: 'mongodb://localhost/WeatherappDemoCache'
        }
    }
};