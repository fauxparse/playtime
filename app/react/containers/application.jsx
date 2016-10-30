import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Route, Redirect, Link, browserHistory } from 'react-router';
import { VelocityComponent } from 'velocity-react';
import Sidebar from './sidebar';

const MenuButton = ({ open, onClick }) => (
  <button rel="menu" data-open={open} onClick={onClick}>
    <svg width={24} height={24} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <rect x={3} y={6} width={18} height={2}/>
      <rect x={3} y={11} width={18} height={2}/>
      <rect x={3} y={16} width={18} height={2}/>
    </svg>
  </button>
)

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
          <main data-sidebar-open={this.state.sidebar}>
            <header>
              <MenuButton open={this.state.sidebar} onClick={(e) => this.toggleSidebar(e)} />
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
