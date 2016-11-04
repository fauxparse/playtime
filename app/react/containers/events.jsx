import React, { Component } from 'react';
import { connect } from 'react-redux';
import RWRRedux from 'rwr-redux';

class Events extends Component {
  render() {
    const { children, location } = this.props;
    return (
      <section>
        <h1>Events</h1>
        {children}
      </section>
    );
  }
}

function mapStateToProps(state) {
  return { };
}

export default connect(mapStateToProps)(Events);
