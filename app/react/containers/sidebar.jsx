import React, { Component } from 'react';
import { DefaultRoute, Route, Redirect, Link } from 'react-router';
import { connect } from 'react-redux';

class Sidebar extends Component {
  render() {
    return (
      <aside>
        {this.props.user.email}
        <a href="/logout" data-method="delete">Log out</a>
      </aside>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(Sidebar);
