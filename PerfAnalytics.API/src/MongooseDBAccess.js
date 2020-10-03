const mongoose = require('mongoose');
const SiteModel = require('./SiteModel')
const PerformanceEntityModel = require('./PerformanceEntityModel')

class MongooseDBAccess {
    constructor() {
        this.db = undefined;
    }

    init() {
        mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true });
        const db = mongoose.connection;
        db.on('error', this.onConnectionError.bind(this));
        db.once('open', () => {
            this.db = db;
        });
    }

    onConnectionError() {
        console.log("Can not connecto to MongoDB!");
        process.exit(1);
    }

    async createNewSite(uuid, name) {
        const site = new SiteModel({ uuid, name });
        await site.save();
        return site;
    }

    async getSites() {
        return SiteModel.find().exec();
    }

    async getSiteByUUID(uuid) {
        return SiteModel.findOne({ uuid }).exec();
    }

    async createNewPerformanceEntity({ serverUUID, origin, pathname, performanceData, extendedInformation }) {
        const entity = new PerformanceEntityModel({ serverUUID, origin, pathname, performanceData, extendedInformation });
        await entity.save();
        return entity;
    }

    async getPerformanceEntities(serverUUID) {
        return PerformanceEntityModel.find({ serverUUID }).exec();
    }

}

module.exports = MongooseDBAccess;
