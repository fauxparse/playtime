import React, { Component } from 'react';
import { VelocityTransitionGroup } from 'velocity-react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import PageSlider from '../components/page_slider';

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = { pathname: props.location.pathname, direction: 1 };
  }

  componentWillReceiveProps(newProps) {
    const { pathname } = newProps.location;
    this.setState({ pathname, direction: (pathname < this.state.pathname) ? PageSlider.RIGHT : PageSlider.LEFT });
  }

  render() {
    const { children, location } = this.props;
    return (
      <PageSlider direction={this.state.direction}>
        {React.cloneElement(children, { key: location.pathname })}
      </PageSlider>
    );
  }

  title() {
    const { children } = this.props;
    return this.props.location.pathname;
    return children && children[0].title;
  }
}

Events.contextTypes = {
  router: React.PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return { }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return { }
}

export default connect(mapStateToProps, mapDispatchToProps)(Events);
