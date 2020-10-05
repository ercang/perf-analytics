import React from 'react';
import { Line } from 'react-chartjs-2';
import './App.css';

function ReportLineChart(props) {
    const reportData = props.report.map(item => item.performanceData[props.reportKey]);
    return (
        <div style={{width: '45%', float: 'left'}}>
            <Line data={ {labels: [props.reportKey], datasets: [{data: reportData, label: props.reportKey},] } } />
        </div>
    );
  }
  
  export default ReportLineChart;
  