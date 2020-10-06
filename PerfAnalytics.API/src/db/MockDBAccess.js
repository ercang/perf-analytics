class MockDBAccess {
    constructor() {
        this.sites = [];
        this.performanceArray = [];
    }

    init() {}

    async createNewSite(uuid, name) {
        const site = { uuid, name, toObject: () => { return {uuid, name} } };
        this.sites.push(site);
        return site;
    }

    async getSites() {
        return this.sites;
    }

    async getSiteByUUID(uuid) {
        return this.sites.find(s => s.uuid == uuid);
    }

    async createNewPerformanceEntity({ serverUUID, origin, pathname, performanceData, extendedInformation, date }) {
        const perf = { serverUUID, origin, pathname, performanceData, extendedInformation, date, toObject: () => { return {serverUUID, origin, pathname, performanceData, extendedInformation, date} } };
        this.performanceArray.push(perf);
        return perf;
    }

    async getPerformanceEntities(serverUUID) {
        return this.performanceArray.filter(p => p.serverUUID == serverUUID);
    }

}

module.exports = MockDBAccess;
