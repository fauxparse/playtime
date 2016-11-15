import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import RWRRedux from 'rwr-redux';
import { VelocityTransitionGroup } from 'velocity-react';
import { Link } from 'react-router';
import SectionHeader from '../components/section_header';
import { buttons, tabs } from '../icons';

const TABS = [
  { label: "Inbox",  key: "inbox" },
  { label: "Events", key: "events" },
  { label: "People", key: "people" },
  { label: "Stats",  key: "stats" }
];

function tabIndex(key) {
  return TABS.map(({ key }) => key).indexOf(key);
}

class Team extends Component {
  constructor(props) {
    super(props);
    this.state = { direction: 1, tabIndex: -1 };
  }

  render() {
    const { children, location, params, team } = this.props;
    const Tab = ({ label, key }, index) => (
      <Link key={key} to={`/teams/${params.team}/${key}`} activeClassName="active" onClick={(e) => this.tabClicked(index)}>{tabs[key]}<span>{label}</span></Link>
    )

    return (
      <section className="tabbed team" key={params.team}>
        <SectionHeader title={team ? team.name : 'Loading…'}/>
        <VelocityTransitionGroup component="section" {...this.pageAnimation()}>
          {React.cloneElement(children, { key: location.pathname.split('/').slice(0, 4).join('/') })}
        </VelocityTransitionGroup>
        <footer className="tabs" aria-role="navigation">
          <div key="add" rel="add" role="button">
            <Link rel="open" to={`/teams/${params.team}/events/new`} activeClassName="active"/>
            <Link rel="close" to={`/teams/${params.team}/events`}/>
            <svg className="circle" viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg"><circle cx="28" cy="28" r="28"/></svg>
            {buttons.add}
          </div>
          {TABS.map(Tab)}
        </footer>
        <VelocityTransitionGroup enter={{animation: 'modalShow', delay: 250, style: { opacity: 0 }}} leave={{animation: 'modalHide'}} runOnMount={true}>
          {children.props && children.props.modal}
        </VelocityTransitionGroup>
      </section>
    );
  }

  tabClicked(index) {
    const direction = index > this.state.tabIndex ? 1 : -1;
    this.setState({ tabIndex: index, direction });
  }

  pageAnimation() {
    const { direction } = this.state;
    return {
      enter: {
        duration: 500,
        animation: 'slidePageIn',
        style: {
          translateX: `${direction * 100}%`,
          opacity: 1
        }
      },
      leave: {
        duration: 500,
        animation: direction > 0 ? 'slidePageLeft' : 'slidePageRight'
      }
    }
  }
}

Team.find = function(id) {
  const { teams } = RWRRedux.getStore('Store').getState();
  return teams.filter((team) => team.id == id)[0];
}

Team.onEnter = function(nextState, replace) {
  const team = Team.find(nextState.params.team);

  if (!team) {
    replace('/teams');
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    tab: ownProps.location.pathname.split('/')[3]
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    closePopup: () => dispatch(push(`/teams/${ownProps.params.team}/events`))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Team);
