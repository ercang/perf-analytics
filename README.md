# Perf-Analytics
Simple analytics library to measure client performance.

You can check the demo at https://ercang-perf-analytics.herokuapp.com/

**Notes:** Application is deployed to heroku automatically. Cold start on heroku takes some time. Tests are run on every push by CI.

## PerfAnalytics.API
This is the back end of this application. It connects to a mongodb server and starts to accept requests that are coming from clients.

- **report/:uuid** (GET) Serves collected performance reports for the requested uuid
- **/report** (POST) Accepts reports from JS client and collects results.
- **/site** (GET) Servers list of websites that are registered
- **/site** (POST) Adds new website and generates a UUID

## PerfAnalytics.Dashboard
This is the react js application to display recorded analytics data. The project is consist of 5 components.
- **App.js** Container application.
- **SiteListContainer.js** Contains site list and the add new site form.
- **SiteAddForm.js** Contains the form for adding a new site.
- **SiteReport.js** Contains report for the selected site.
- **ReportLineChart.js** This component is used for drawing reports that are collected from clients.

## PerfAnalytics.JS
This is the client source for collecting performance metrics from the browser.

## How to run
```
# Run all tests
npm run test

# Build client application and copy to public folder
npm run build

# Start server
npm run start-server

# CLIENT
# Start development server for react client 
cd PerfAnalytics.Dashboard && npm run start

# Run client tests
cd PerfAnalytics.Dashboard && npm run test

# Build client
cd PerfAnalytics.Dashboard && npm run build

# SERVER
# Run server
cd PerfAnalytics.API && npm run start

# Run server tests
cd PerfAnalytics.API && npm run test
```

## How to run in a Docker container
This application can be run in a docker container. Dockerfile is already provided.

```
# create docker image
docker build -t perfanalytics .

# run docker image
docker run -p 3000:80 -d perfanalytics

```
