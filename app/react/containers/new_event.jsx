import React, { Component } from 'react';
import { connect } from 'react-redux';
import RWRRedux from 'rwr-redux';
import { VelocityTransitionGroup } from 'velocity-react';
import { buttons } from '../icons';
import EventEditor from '../components/event_editor';
import fetch from '../fetch';

class NewEvent extends Component {
  constructor(props) {
    super(props);
    this.state = { saving: 0 };
    fetch(props.location.pathname)
      .then(response => response.json())
      .then(json => this.eventChanged(json));
  }

  render() {
    const { event } = this.state;
    return (
      <div className="new-event modal-container">
        <div className="modal">
          {event && <EventEditor event={event} disabled={this.state.saving % 2 === 1} onChange={this.eventChanged.bind(this)} />}
          <footer>
            <button className={this.saveClass()} onClick={() => this.setState({ saving: (this.state.saving + 1) % 5 })}>{buttons.save}</button>
          </footer>
        </div>
      </div>
    );
  }

  saveClass() {
    return [
      'save',
      'save saving',
      'save error',
      'save saving',
      'save success'
    ][this.state.saving];
  }

  eventChanged(event) {
    if (event) {
      if (!event.name) {
        event.name = '';
      }
      if (event.start && !moment.isMoment(event.start)) {
        event.start = moment(event.start);
      }
      if (event.end && !moment.isMoment(event.end)) {
        event.end = moment(event.end);
      }
      if (event.repeat && event.repeat.until && !moment.isMoment(event.repeat.until)) {
        event.repeat.until = moment(event.repeat.until);
      }
    }
    this.setState({ event });
  }
}

function mapStateToProps(state) {
  return { };
}

export default connect(mapStateToProps)(NewEvent);
