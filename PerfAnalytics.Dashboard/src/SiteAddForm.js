import React from 'react';
import DashboardConnector from './DashboardConnector'

export default class SiteAddForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };

    this.handleChange = this.handleChange.bind(this);
    this.onAddWebsiteClicked = this.onAddWebsiteClicked.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  onAddWebsiteClicked(event) {
    DashboardConnector.addWebSite(this.state.value);
  }

  render() {
    return (
      <div>
        <input type="text" value={this.state.value} onChange={this.handleChange} placeholder="Enter Website Name" />
        <button onClick={this.onAddWebsiteClicked}>Add Web Site</button>
      </div>
    );
  }
}