import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Route, Redirect, Link, browserHistory } from 'react-router';
import { VelocityComponent } from 'velocity-react';
import Sidebar from './sidebar';
import Team from './team';
import { showSidebar, fetchTeams } from '../actions';

class Application extends Component {
  constructor(props) {
    super(props);
    props.fetchTeams();
  }

  render() {
    const { team, children, params, location, sidebar } = this.props;
    return (
      <div id="application">
        <Sidebar team={team}/>
        <VelocityComponent {...this.sidebarAnimation()}>
          <main data-sidebar-open={sidebar}>
            {React.cloneElement(children, { key: params.team || location.pathname, team })}
            {this.shim()}
          </main>
        </VelocityComponent>
      </div>
    );
  }

  hideSidebar(e) {
    e.preventDefault();
    e.stopPropagation();
    this.props.hideSidebar();
  }

  sidebarAnimation() {
    if (this.props.sidebar) {
      return { animation: { translateX: ['16rem', 'spring'] }, duration: 500 };
    } else {
      return { animation: { translateX: [0, 'easeOutCubic'] }, duration: 250 };
    }
  }

  shim() {
    if (this.props.sidebar) {
      return (
        <div
          className="shim"
          aria-hidden="true"
          onMouseDown={(e) => this.hideSidebar(e)}
          onTouchStart={(e) => this.hideSidebar(e)}
        />
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    team: Team.find(ownProps.params.team),
    sidebar: state.sidebar
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    hideSidebar: () => dispatch(showSidebar(false)),
    fetchTeams: () => dispatch(fetchTeams())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Application);
