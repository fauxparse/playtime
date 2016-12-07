import React, { Component } from 'react';
import { connect } from 'react-redux';
import RWRRedux from 'rwr-redux';
import fetch from '../fetch';
import { changeTitle } from '../actions';
import Event from '../models/event';

class EventDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    fetch(`/teams/${props.params.team}/events/${props.params.event}/${props.params.date}`)
      .then((response) => response.json())
      .then((event) => this.setEvent(event));
  }

  componentDidMount() {
    const date = moment(this.props.params.date);
    this.props.changeTitle(date.format('D MMMM YYYY'));
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
    const event = new Event(attributes);
    this.setState({ event });
  }
}

const mapStateToProps = (state) => {
  return { };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    changeTitle: (title) => dispatch(changeTitle(title))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventDetails);
