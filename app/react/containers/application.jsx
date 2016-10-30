import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Route, Redirect, Link, browserHistory } from 'react-router';
import { VelocityComponent } from 'velocity-react';
import Sidebar from './sidebar';

class Application extends Component {
  constructor(props) {
    super(props);
    this.state = { sidebar: false };
  }

  render() {
    return (
      <div id="application">
        {this.props.sidebar || <Sidebar/>}
        <VelocityComponent {...this.sidebarAnimation()}>
          <main>
            <header>
              <button onClick={(e) => this.toggleSidebar(e)}>Menu</button>
            </header>
            {this.props.content}
            {this.shim()}
          </main>
        </VelocityComponent>
      </div>
    );
  }

  toggleSidebar(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ sidebar: !this.state.sidebar });
  }

  sidebarAnimation() {
    if (this.state.sidebar) {
      return { animation: { translateX: ['16rem', 'spring'] }, duration: 500 };
    } else {
      return { animation: { translateX: [0, 'easeOutCubic'] }, duration: 250 };
    }
  }

  shim() {
    if (this.state.sidebar) {
      return (
        <div
          className="shim"
          aria-hidden="true"
          onMouseDown={(e) => this.toggleSidebar(e)}
          onTouchStart={(e) => this.toggleSidebar(e)}
        />
      );
    }
  }
}

function mapStateToProps(state, ownProps) {
  return { currentPath: ownProps.location.pathname };
}

export default connect(mapStateToProps)(Application);
