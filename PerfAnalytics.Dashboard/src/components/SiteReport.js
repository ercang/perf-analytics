import React from 'react';
import ReportLineChart from './ReportLineChart'

function SiteReport(props) {
  return (
    <div>
      <h2>Report</h2>
      <ReportLineChart reportKey={"ttfb"} report={props.report}/>
      <ReportLineChart reportKey={"fcp"} report={props.report}/>
      <ReportLineChart reportKey={"domLoadTime"} report={props.report}/>
      <ReportLineChart reportKey={"windowLoadTime"} report={props.report}/>
    </div>
  );
}

export default SiteReport;
