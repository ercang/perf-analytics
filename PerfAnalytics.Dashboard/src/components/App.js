import React from 'react';
import './App.css';
import SiteListContainer from './SiteListContainer'
import SiteReport from './SiteReport'
import DashboardConnector from '../helpers/DashboardConnector'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {sites: [], report: []};

    DashboardConnector.onSitesUpdated((sites)=>{
      this.setState({ sites, report: this.state.report });
    });

    DashboardConnector.onSiteReportUpdated((report)=>{
      this.setState({ sites: this.state.sites, report });
    });
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    return (
      <div className="App">
        <h1>PerfAnalytics - Dashboard</h1>
        <SiteListContainer sites={this.state.sites} />
        <SiteReport report={this.state.report}/>
      </div>
    );
  }
}