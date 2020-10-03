const mongoose = require('mongoose');

const performanceEntitySchema = new mongoose.Schema({
    serverUUID: { type: String, index: true },
    origin: String,
    pathname: String,
    performanceData: Object,
    extendedInformation: Object,
});

const PerformanceEntityModel = mongoose.model('PerformanceEntityModel', performanceEntitySchema);

module.exports = PerformanceEntityModel;
