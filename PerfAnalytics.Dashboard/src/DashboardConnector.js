import { postData, getData } from './PostHelper'

class DashboardConnector {
  constructor() {
    this.sites = [];
    this.siteUpdateCallback = [];

    this.siteReport = [];
    this.siteReportCallback = [];

    this.requestSites();

  }
  addWebSite(siteName) {
    postData('/site', { name: siteName }).then(async () => {
      this.requestSites();
    })
  }

  async requestSites() {
    const sitesResponse = await getData('/site');
    this.sites = sitesResponse.sites;
    this.siteUpdateCallback.forEach(cb => {
      cb(this.sites);
    });
  }

  getSites() {
    return this.sites;
  }

  onSitesUpdated(callback) {
    this.siteUpdateCallback.push(callback);
  }

  async loadReport(uuid) {
    console.log("loadReport", uuid);
    const reportResponse = await getData('/report/' + uuid);
    console.log(reportResponse.data)
    this.siteReport = reportResponse.data;
    this.siteReportCallback.forEach(cb => {
      cb(this.siteReport);
    });
  }

  onSiteReportUpdated(callback) {
    this.siteReportCallback.push(callback);
  }
}

export default new DashboardConnector();
