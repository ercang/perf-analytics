const RequestHandler = require('../src/RequestHandler');
const MockDBAccess = require('../src/db/MockDBAccess');

const requestHandler = new RequestHandler({ dbAccess: new MockDBAccess() });
let siteUUID = '';

test('handleNewSiteRequest adds new site', async () => {
    const mockReq = { body: { name: 'MyTestSite' } };
    const mockRes = { send: jest.fn() }

    await requestHandler.handleNewSiteRequest(mockReq, mockRes);

    const result = mockRes.send.mock.calls[0];
    expect(result[0].site.name).toEqual('MyTestSite');
    expect(typeof result[0].site.uuid).toBe('string');
});

test('handleSitesRequest returns sites', async () => {
    const mockReq = {};
    const mockRes = { send: jest.fn() }

    await requestHandler.handleSitesRequest(mockReq, mockRes);

    const result = mockRes.send.mock.calls[0];
    expect(result[0].sites.length).toEqual(1);
    expect(result[0].sites[0].name).toEqual('MyTestSite');

    siteUUID = result[0].sites[0].uuid;
});

test('handleNewReportRequest adds new report item', async () => {
    const data = {serverUUID: siteUUID, origin: 'example.com', pathname: '/test', performanceData: {}, extendedInformation: {}}
    const mockReq = { body: { perfAnalyticsData: data } };
    const mockRes = { send: jest.fn() }

    await requestHandler.handleNewReportRequest(mockReq, mockRes);

    expect(mockRes.send.mock.calls[0]).toEqual([]);
});

test('handleReportRequest', async () => {
    const mockReq = { params: { uuid: siteUUID } };
    const mockRes = { send: jest.fn() }

    await requestHandler.handleReportRequest(mockReq, mockRes);

    const result = mockRes.send.mock.calls[0];
    expect(result[0].data[0].serverUUID).toEqual(siteUUID);
    expect(result[0].data[0].origin).toEqual("example.com");
    expect(result[0].data[0].pathname).toEqual("/test");
    expect(result[0].data[0].performanceData).toEqual({});
    expect(result[0].data[0].extendedInformation).toEqual({});
    expect(typeof result[0].data[0].date).toEqual('object');
});