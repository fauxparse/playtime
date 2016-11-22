import React, { Component } from 'react';
import { connect } from 'react-redux';
import RWRRedux from 'rwr-redux';
import fetch from '../fetch';
import EventModel from '../models/event';

class Event extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    fetch(`/teams/${props.params.team}/events/${props.params.event}`)
      .then((response) => response.json())
      .then((event) => this.setEvent(event));
  }

  render() {
    const { event } = this.state;
    return (
      <section>
        {event && event.name}
      </section>
    );
  }

  setEvent(attributes) {
    const event = new EventModel(attributes);
    this.setState({ event });
  }
}

function mapStateToProps(state) {
  return { };
}

export default connect(mapStateToProps)(Event);
