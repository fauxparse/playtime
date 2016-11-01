import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTeams } from '../actions';
import SectionHeader from '../components/section_header';

class Teams extends Component {
  render() {
    return (
      <section>
        <SectionHeader/>
        <section>
          <button onClick={this.props.refresh}>Refresh</button>
        </section>
      </section>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    teams: state.teams
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    refresh: () => dispatch(fetchTeams())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Teams);
