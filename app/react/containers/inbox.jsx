import React, { Component } from 'react';
import { connect } from 'react-redux';
import RWRRedux from 'rwr-redux';

class Inbox extends Component {
  render() {
    return (
      <section>
        <h1>Inbox</h1>
      </section>
    );
  }
}

function mapStateToProps(state) {
  return { };
}

export default connect(mapStateToProps)(Inbox);
