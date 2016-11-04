import React, { Component } from 'react';
import { connect } from 'react-redux';
import RWRRedux from 'rwr-redux';

class NewEvent extends Component {
  render() {
    return (
      <section className="newEvent">
        <h1>New Event</h1>
      </section>
    );
  }
}

function mapStateToProps(state) {
  return { };
}

export default connect(mapStateToProps)(NewEvent);
