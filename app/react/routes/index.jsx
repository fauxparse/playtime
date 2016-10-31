import React from 'react';
import { Route, Redirect } from 'react-router';
import Application from '../containers/application';
import Teams from '../containers/teams';
import Team from '../containers/team';

export default (
  <Route component={Application}>
    <Redirect from="/" to="/teams" />
    <Route path="/teams/:team" component={Team} />
    <Route path="/teams" component={Teams} />
  </Route>
);
