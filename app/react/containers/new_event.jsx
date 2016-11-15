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
          {event && <EventEditor event={event} disabled={this.state.saveState == 'saving'} onChange={this.eventChanged.bind(this)} />}
          <footer>
            <button rel="save" data-state={this.state.saveState} onClick={() => this.save()}>{buttons.save}</button>
          </footer>
        </div>
      </div>
    );
  }

  save() {
    var json = Object.assign({}, this.state.event),
        timeout = new Promise((resolve, reject) => setTimeout(resolve, 1500)),
        status;

    delete json.id;
    delete json.errors;

    this.setState({ saveState: 'saving' })
    var loader = fetch(`/teams/${this.props.params.team}/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(json)
    })
    .then((response) => {
      this.setState({ responseStatus: response.status });
      return response.json()
    });

    Promise.all([loader, timeout])
      .then(([json, _]) => {
        this.setState({ saveState: this.state.responseStatus > 400 ? 'error' : 'success' });
        this.eventChanged(json);
      });
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
      event.name = event.name || '';
      event.start = this.parseMoment(event.start);
      event.end = this.parseMoment(event.end);
      if (event.repeat && event.repeat.until) {
        event.repeat.until = this.parseMoment(event.repeat.until);
      }
    }
    this.setState({ event });
  }

  parseMoment(time) {
    if (time && !moment.isMoment(time)) {
      return moment(time);
    } else {
      return time;
    }
  }
}

function mapStateToProps(state) {
  return { };
}

export default connect(mapStateToProps)(NewEvent);
