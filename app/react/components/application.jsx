import React, { Component } from 'react';
import { Router, Route, Redirect, Link, browserHistory } from 'react-router';
import { VelocityComponent } from 'velocity-react';
import Sidebar from './sidebar';
import Teams from './teams';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { menu: false };
  }

  render() {
    return (
      <div id="application">
        {this.props.sidebar || <Sidebar/>}
        <VelocityComponent animation={this.menuAnimation()}>
          <main>
            <header>
              <button onClick={(e) => this.toggleMenu(e)}>Menu</button>
            </header>
            {this.props.content}
            {this.shim()}
          </main>
        </VelocityComponent>
      </div>
    );
  }

  toggleMenu(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ menu: !this.state.menu });
  }

  menuAnimation() {
    if (this.state.menu) {
      return { translateX: ['16rem', 'spring'] }
    } else {
      return { translateX: [0, 'easeOutCubic'] }
    }
  }

  shim() {
    if (this.state.menu) {
      return (
        <div className="shim" aria-hidden="true" onMouseDown={(e) => this.toggleMenu(e)} onTouchStart={(e) => this.toggleMenu(e)} />
      );
    }
  }
}

const ROUTES = {
  path: '/',
  component: App,
  childRoutes: [
    { from: '/', to: '/teams' },
    { path: '/teams', components: { content: Teams } }
  ]
}

class Application extends Component {
  render() {
    return(
      <Router history={browserHistory} routes={ROUTES}/>
    );
  }
}

export default Application;
