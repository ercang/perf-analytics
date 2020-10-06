const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const app = express();
const http = require('http').createServer(app);
require('dotenv').config();

const MongooseDBAccess = require('./db/MongooseDBAccess');
const mongooseDBAccess = new MongooseDBAccess();
mongooseDBAccess.init();

const RequestHandler = require('./RequestHandler');
const requestHandler = new RequestHandler({ dbAccess: mongooseDBAccess });

// use body parse for post data
app.use(bodyParser.json());

// enable gzip
app.use(compression());

// enable all cross origin requests
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// register end-point handlers
app.get('/report/:uuid', requestHandler.handleReportRequest.bind(requestHandler));
app.post('/report', requestHandler.handleNewReportRequest.bind(requestHandler));

app.get('/site', requestHandler.handleSitesRequest.bind(requestHandler));
app.post('/site', requestHandler.handleNewSiteRequest.bind(requestHandler));

// serve directory over HTTP
app.use(express.static('../public'))

const serverPort = process.env.PORT || 80;
http.listen(serverPort, () => console.log(`PerfAnalytics.API is listening on port ${serverPort}!`));

