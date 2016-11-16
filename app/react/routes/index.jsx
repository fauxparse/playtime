import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';
import Application from '../containers/application';
import Teams from '../containers/teams';
import Team from '../containers/team';
import Inbox from '../containers/inbox';
import Events from '../containers/events';
import Event from '../containers/event';
import NewEvent from '../containers/new_event';
import People from '../containers/people';
import Stats from '../containers/stats';

export default (
  <Route component={Application}>
    <Redirect from="/" to="/teams" />
    <Redirect from="/teams/:team" to="/teams/:team/inbox" />
    <Route path="/teams/:team" component={Team}>
      <Route path="inbox" component={Inbox}/>
      <Route path="events" component={Events}>
        <Route path="new" components={{modal: NewEvent}}/>
        <Route path=":event" component={Event}/>
      </Route>
      <Route path="people" component={People}/>
      <Route path="stats" component={Stats}/>
    </Route>
    <Route path="/teams" component={Teams}/>
  </Route>
);
