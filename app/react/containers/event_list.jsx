import React, { Component } from 'react';
import { connect } from 'react-redux';
import RWRRedux from 'rwr-redux';
import { Link } from 'react-router';
import fetch from '../fetch';
import Event from '../models/event';

class EventList extends Component {
  constructor(props) {
    super(props);
    this.state = { events: [] };

    fetch(`/teams/${props.params.team}/events`)
      .then((response) => response.json())
      .then((json) => this.setEvents(json));
  }

  render() {
    const { events } = this.state;
    return (
      <section className="event-list">
        <ul>
          {events.map(event => this.listItem(event))}
        </ul>
      </section>
    );
  }

  setEvents(json) {
    const events = json.map(attributes => new Event(attributes));
    this.setState({ events });
  }

  listItem(event) {
    const { key, name, start, url } = event;

    return (
      <li key={key}>
        <Link to={url}>
          <div className="date">
            <span className="day">{start.format('D')}</span>
            <span className="month">{start.format('MMM')}</span>
          </div>
          <div className="details">
            <b>{name}</b>
            <small>{start.format('h:mma')}</small>
          </div>
        </Link>
      </li>
    );
  }
}

const mapStateToProps = (state) => {
  return { };
}

export default connect(mapStateToProps)(EventList);
