import React, { Component } from 'react';
import { DefaultRoute, Route, Redirect, Link } from 'react-router';

class Sidebar extends Component {
  render() {
    return (
      <aside>
        <a href="/logout" data-method="delete">Log out</a>
      </aside>
    );
  }
}

export default Sidebar;
