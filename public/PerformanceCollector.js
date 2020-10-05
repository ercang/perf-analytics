class PerformanceCollector {
    constructor(serverUUID, apiEndPoint, extendedInformation = {}) {
        // run measurements
        this.performanceData = this.collectData();

        // prepare data to send
        const data = {
            serverUUID,
            origin: window.location.origin,
            pathname: window.location.pathname,
            performanceData: this.performanceData,
            extendedInformation
        };

        // send to server
        this.sendDataToServer(apiEndPoint, data);
    }

    collectData() {
        const p = window.performance;
        if (!p) {
            return {};
        }

        const performanceData = {
            ttfb: this.getTimeToFirstByte(p),
            fcp: this.getFirstContentfulPaintTime(p),
            domLoadTime: this.getDOMLoadTime(p),
            windowLoadTime: this.getWindowLoadTime(p),
            resourceLoadTimings: this.getNetworkTimingsForResources(p)
        }

        return performanceData;
    }

    getTimeToFirstByte(p) {
        return p.timing.responseStart - p.timing.requestStart;
    }

    getFirstContentfulPaintTime(p) {
        const fcp = p.getEntriesByType("paint").find(e => e.name === "first-contentful-paint");
        return fcp ? fcp.startTime : 0;
    }

    getDOMLoadTime(p) {
        return p.timing.domContentLoadedEventEnd - p.timing.navigationStart;
    }

    getWindowLoadTime(p) {
        return p.timing.loadEventEnd - p.timing.loadEventStart;
    }

    getNetworkTimingsForResources(p) {
        return p.getEntriesByType("resource").map((e) => {
            return {
                name: e.name,
                duration: e.duration,
                transferSize: e.transferSize,
                initiatorType: e.initiatorType,
            };
        });
    }

    sendDataToServer(apiEndPoint, data) {
        fetch(apiEndPoint, {
            method: 'POST',
            body: JSON.stringify({ perfAnalyticsData: data }),
            headers: { 'Content-Type': 'application/json' },
        })
    }
};

if(window.perfAnalyticsData) {
    new PerformanceCollector(window.perfAnalyticsData.uuid, window.perfAnalyticsData.apiEndPoint, {});
}