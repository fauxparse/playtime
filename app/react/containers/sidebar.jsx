import React, { Component } from 'react';
import { DefaultRoute, Route, Redirect, Link } from 'react-router';
import { VelocityTransitionGroup } from 'velocity-react';
import { connect } from 'react-redux';

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = { menu: 'team' };
  }

  render() {
    return (
      <aside>
        <header>
          <img src={this.props.user.avatar}/>
          <button rel="team" data-open={this.state.menu == 'teams'} onClick={() => this.toggleMenu()}>
            <span>{this.props.team ? this.props.team.name : "Your teams"}</span>
            <svg height={24} width={24} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 10l5 5 5-5z"/>
            </svg>
          </button>
        </header>
        <VelocityTransitionGroup component="section" {...this.menuAnimation()}>
          {this[`${this.state.menu}Menu`]()}
        </VelocityTransitionGroup>
      </aside>
    );
  }

  toggleMenu() {
    const menu = this.state.menu == 'teams' ? 'team' : 'teams';
    this.setState({ menu });
  }

  teamsMenu() {
    return (
      <nav key="teams" onClick={() => this.toggleMenu()}>
        <ul>
          {this.props.teams.map((team) => <li key={team.id}><Link to={`/teams/${team.id}`} activeClassName="active">{team.name}</Link></li>)}
          <li><Link to="/teams" activeClassName="active">Manage teams</Link></li>
        </ul>
      </nav>
    );
  }

  teamMenu() {
    return (
      <nav key="team">
        <ul>
          <li><a href="#">Settings</a></li>
          <li><a rel="logout" href="/logout" data-method="delete">Sign out</a></li>
        </ul>
      </nav>
    );
  }

  menuAnimation() {
    const direction = this.state.menu == 'teams' ? 1 : -1;
    return {
      enter: {
        duration: 500,
        animation: {
          translateY: 0,
          opacity: 1
        },
        style: {
          translateY: `${direction * -2}rem`,
          opacity: 0
        }
      },
      leave: {
        duration: 500,
        animation: {
          translateY: `${direction * 2}rem`,
          opacity: 0
        }
      }
    }
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    teams: state.teams.sort((a, b) => a.name.localeCompare(b.name))
  };
}

export default connect(mapStateToProps)(Sidebar);
