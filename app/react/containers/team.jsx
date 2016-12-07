import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import RWRRedux from 'rwr-redux';
import { VelocityTransitionGroup } from 'velocity-react';
import { Link } from 'react-router';
import SectionHeader from '../components/section_header';
import PageSlider from '../components/page_slider';
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
    const tabIndex = TABS.map(({ key }) => key).indexOf(props.location.pathname.split('/')[3]);
    this.state = { direction: PageSlider.LEFT, tabIndex };
  }

  componentWillReceiveProps(newProps) {
    const { pathname } = newProps.location;
    const oldTab = (this.state.pathname || '').split('/').slice(0, 4);
    const newTab = (pathname || '').split('/').slice(0, 4);

    if (pathname !== this.state.pathname) {
      if (oldTab[3] === newTab[3]) {
        this.setState({ pathname, direction: pathname < (this.state.pathname || '') ? PageSlider.RIGHT : PageSlider.LEFT });
      } else {
        this.setState({ pathname, direction: tabIndex(newTab[3]) < tabIndex(oldTab[3]) ? PageSlider.RIGHT : PageSlider.LEFT });
      }
    }
  }

  render() {
    const { children, location, params, team, title } = this.props;
    const { direction } = this.state;
    const Tab = ({ label, key }, index) => (
      <Link key={key} to={`/teams/${params.team}/${key}`} activeClassName="active" onClick={(e) => this.tabClicked(index)}>{tabs[key]}<span>{label}</span></Link>
    )

    return (
      <section className="tabbed team" key={params.team}>
        <SectionHeader title={title} direction={direction}/>
        <PageSlider direction={direction}>
          {(!(children.props || {}).modal) && React.cloneElement(children, { key: location.pathname.split('/').slice(0, 4).join('/'), team })}
        </PageSlider>
        <footer className="tabs" role="navigation">
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
    const direction = index > this.state.tabIndex ? PageSlider.LEFT : PageSlider.RIGHT;
    this.setState({ tabIndex: index, direction });
  }
}

Team.find = function(id) {
  const { teams } = RWRRedux.getStore('Store').getState();
  return teams.filter((team) => team.id === id)[0];
}

Team.onEnter = function(nextState, replace) {
  const team = Team.find(nextState.params.team);

  if (!team) {
    replace('/teams');
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    tab: ownProps.location.pathname.split('/')[3],
    title: state.title || (ownProps.team ? ownProps.team.name : 'Loading…')
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return { }
}

export default connect(mapStateToProps, mapDispatchToProps)(Team);
