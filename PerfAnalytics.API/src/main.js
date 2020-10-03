const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const app = express();
const http = require('http').createServer(app);

const MongooseDBAccess = require('./MongooseDBAccess');
const mongooseDBAccess = new MongooseDBAccess();
mongooseDBAccess.init();

const RequestHandler = require('./RequestHandler');
const requestHandler = new RequestHandler({dbAccess: mongooseDBAccess});

app.use(bodyParser.json());

// enable gzip
app.use(compression());

// register end-point handlers
app.get('/report', requestHandler.handleReportRequest.bind(requestHandler));
app.post('/report', requestHandler.handleNewReportRequest.bind(requestHandler));

app.get('/site', requestHandler.handleSitesRequest.bind(requestHandler));
app.post('/site', requestHandler.handleNewSiteRequest.bind(requestHandler));

// serve directory over HTTP
app.use(express.static('../public'))

const serverPort = 80;
http.listen(serverPort, () => console.log(`PerfAnalytics.API is listening on port ${serverPort}!`));

