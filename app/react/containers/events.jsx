import React, { Component } from 'react';
import { connect } from 'react-redux';
import RWRRedux from 'rwr-redux';

class Events extends Component {
  render() {
    const { children, location } = this.props;
    return (
      <section>
        {children}
      </section>
    );
  }
}

function mapStateToProps(state) {
  return { };
}

export default connect(mapStateToProps)(Events);
