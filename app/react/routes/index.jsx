import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';
import Application from '../containers/application';
import Teams from '../containers/teams';
import Team from '../containers/team';
import Inbox from '../containers/inbox';
import Events from '../containers/events';
import EventList from '../containers/event_list';
import EventDetails from '../containers/event_details';
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
        <IndexRoute component={EventList}/>
        <Route path="new" components={{modal: NewEvent}}/>
        <Route path=":event/:date(\d{4}-\d{2}-\d{2})" component={EventDetails}/>
      </Route>
      <Route path="people" component={People}/>
      <Route path="stats" component={Stats}/>
    </Route>
    <Route path="/teams" component={Teams}/>
  </Route>
);
