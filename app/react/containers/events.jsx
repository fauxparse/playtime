import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

class Events extends Component {
  render() {
    const { children, location } = this.props;
    return (
      <section>
        {children}
      </section>
    );
  }
}

Events.contextTypes = {
  router: React.PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return { };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return { }
}

export default connect(mapStateToProps, mapDispatchToProps)(Events);
