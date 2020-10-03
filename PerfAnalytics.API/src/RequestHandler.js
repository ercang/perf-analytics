class RequestHandler {
    constructor({ dbAccess }) {
        this.dbAccess = dbAccess;
    }

    async handleReportRequest(req, res) {
        const entities = await this.dbAccess.getPerformanceEntities(req.body.serverUUID);
        res.send({ data: entities.map((v) => v.toObject()) });
    }

    async handleNewReportRequest(req, res) {
        const data = req.body.perfAnalyticsData;
        const serverUUID = data.serverUUID;
        const origin = data.origin;
        const pathname = data.pathname;
        const performanceData = data.performanceData;
        const extendedInformation = data.extendedInformation;

        // find site
        const site = await this.dbAccess.getSiteByUUID(serverUUID);
        if (!site) {
            res.status(400); // bad request
            res.send();
        } else {
            await this.dbAccess.createNewPerformanceEntity({ serverUUID, origin, pathname, performanceData, extendedInformation });
            res.send();
        }
    }

    async handleSitesRequest(req, res) {
        const sites = await this.dbAccess.getSites();
        res.send({ success: true, sites: sites.map((v) => v.toObject()) });
    }

    async handleNewSiteRequest(req, res) {
        let uuid = req.body.uuid.trim();
        let name = req.body.name.trim();
        const site = await this.dbAccess.createNewSite(uuid, name);
        res.send({ site: { id: site._id, name: site.name, uuid: site.uuid } });
    }
}


module.exports = RequestHandler;
