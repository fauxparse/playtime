import React, { Component } from 'react';
import { connect } from 'react-redux';
import RWRRedux from 'rwr-redux';
import fetch from '../fetch';

class Event extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    fetch(`/teams/${props.params.team}/events/${props.params.event}`)
      .then((response) => response.json())
      .then((event) => this.setState({ event }));
  }

  render() {
    const { event } = this.state;
    return (
      <section>
        {event && event.name}
      </section>
    );
  }
}

function mapStateToProps(state) {
  return { };
}

export default connect(mapStateToProps)(Event);
