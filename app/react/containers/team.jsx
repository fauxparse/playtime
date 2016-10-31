import React, { Component } from 'react';
import { connect } from 'react-redux';
import RWRRedux from 'rwr-redux';
import SectionHeader from '../components/section_header';

class Team extends Component {
  render() {
    return (
      <section>
        <SectionHeader title={this.props.team.name}/>
      </section>
    );
  }
}

Team.find = function(id) {
  const { teams } = RWRRedux.getStore('Store').getState();
  return teams.filter((team) => team.id == id)[0];
}

Team.onEnter = function(nextState, replace) {
  const store = RWRRedux.getStore('Store');
  const team = Team.find(nextState.params.team);

  if (!team) {
    replace('/teams');
  }
}

function mapStateToProps(state) {
  return { };
}

export default connect(mapStateToProps)(Team);
