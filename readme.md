# Demo Project for multi tier Node.js applications
This project can be used to demo instrumentation of Node.js projects with [Dynatrace][1].

It consists of 

* Express frontend
* Express backend communicating via json
* MongoDB / Mongoose persistence

## Installation
* Make sure MongoDB is installed and running
* Edit [config.js](config.js) if you want to change the ports and/or the database connection string.
* Run `npm install` in [weather-frontend](weather-frontend) and [weather-service](weather-service).
* Run `npm run backend` and `npm run frontend` from project root in two separate shells.
* Access http://localhost:[port]/forecast?loc=[location]&days=6 in your browser



[1]: http://www.dynatrace.com/en/products/dynatrace-free-trial.html