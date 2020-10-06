import React from 'react';
import SiteAddForm from './SiteAddForm';

import DashboardConnector from '../helpers/DashboardConnector'

function SiteList(props) {
  const sites = props.sites ? props.sites : [];
  const listItems = sites.map((site) =>
    <div key={site.uuid}>[{site.uuid}] {site.name} - <a href="#" onClick={()=>{DashboardConnector.loadReport(site.uuid)}}>[Show Data]</a></div>
  );
  return (listItems);
}

function SiteListContainer(props) {
  return (
    <div>
      <h2>List Of WebSites</h2>
      <SiteList sites={props.sites} />
      <SiteAddForm />
    </div>
  );
}

export default SiteListContainer;
