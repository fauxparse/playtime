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
          <button rel="team" data-open={this.state.menu === 'teams'} onClick={() => this.toggleMenu()}>
            <span>{this.props.team ? this.props.team.name : "Your teams"}</span>
            <svg height={24} width={24} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 10l5 5 5-5z"/>
            </svg>
          </button>
        </header>
        <section>
          <nav>
            <VelocityTransitionGroup component="ul" {...this.menuAnimation()}>
              {this.teamMenu()}
            </VelocityTransitionGroup>
          </nav>
          <nav>
            <VelocityTransitionGroup component="ul" {...this.menuAnimation()}>
              {this.teamsMenu()}
            </VelocityTransitionGroup>
          </nav>
        </section>
      </aside>
    );
  }

  toggleMenu() {
    const menu = this.state.menu === 'teams' ? 'team' : 'teams';
    this.setState({ menu });
  }

  teamsMenu() {
    if (this.state.menu === 'teams') {
      var teams = this.props.teams.map((team) => <li key={`teams.${team.id}`}><Link to={`/teams/${team.id}`} activeClassName="active">{team.name}</Link></li>),
          manage = (<li key="teams.manage"><Link to="/teams" activeClassName="active">Manage teams</Link></li>);
      return teams.concat([manage]);
    } else {
      return [];
    }
  }

  teamMenu() {
    if (this.state.menu === 'team') {
      return [
        (<li key="team.settings"><a href="#">Settings</a></li>),
        (<li key="team.logout"><a rel="logout" href="/logout" data-method="delete">Sign out</a></li>)
      ];
    } else {
      return [];
    }
  }

  menuAnimation() {
    const direction = this.state.menu === 'teams' ? 1 : -1,
          leave = this.state.menu === 'teams' ? 'menuItemOutDown' : 'menuItemOutUp';
    return {
      enter: {
        duration: 500,
        animation: 'menuItemIn',
        stagger: 50,
        style: {
          translateY: `${direction * -50}%`,
          opacity: 0
        }
      },
      leave: {
        duration: 500,
        animation: leave,
        stagger: 50
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
