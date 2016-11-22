import React, { Component } from 'react';
import { connect } from 'react-redux';
import RWRRedux from 'rwr-redux';
import { VelocityTransitionGroup } from 'velocity-react';
import { buttons } from '../icons';
import Event from '../models/event';
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
          {event && <EventEditor event={event} disabled={this.state.saveState === 'saving'} onChange={this.eventChanged.bind(this)} />}
          <footer>
            <button rel="save" data-state={this.state.saveState} onClick={() => this.save()}>{buttons.save}</button>
          </footer>
        </div>
      </div>
    );
  }

  save() {
    var json = this.state.event.toJSON(),
        timeout = new Promise((resolve, reject) => setTimeout(resolve, 1500)),
        status;

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
        const event = this.eventChanged(json);
        if (event.id) {
          this.context.router.push(event.url);
        }
      });
  }

  eventChanged(attributes) {
    const event = new Event(attributes);
    this.setState({ event });
    return event;
  }
}

NewEvent.contextTypes = {
  router: React.PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return { };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    goToEvent: (event) => dispatch(push(`/teams/${ownProps.params.team}/events/${event.id}`))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewEvent);
