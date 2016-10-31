import React from 'react';
import { Route, Redirect } from 'react-router';
import Application from '../containers/application';
import Teams from '../components/teams';

export default (
  <Route component={Application}>
    <Route path="/" component={Teams} />
    <Route path="/teams" component={Teams} />
  </Route>
);
