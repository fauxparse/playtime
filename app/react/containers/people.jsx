import React, { Component } from 'react';
import { connect } from 'react-redux';
import RWRRedux from 'rwr-redux';

class People extends Component {
  render() {
    return (
      <section>
        <h1>People</h1>
      </section>
    );
  }
}

function mapStateToProps(state) {
  return { };
}

export default connect(mapStateToProps)(People);
