import React, { Component } from 'react';
import { VelocityTransitionGroup } from 'velocity-react';

class PageSlider extends Component {
  render() {
    const { component, className, children } = this.props;
    return (
      <VelocityTransitionGroup component={component || "section"} className={className || 'page-slider'} {...this.pageAnimation()}>
        {children}
      </VelocityTransitionGroup>
    )
  }

  pageAnimation() {
    const direction = this.props.direction || PageSlider.LEFT;
    return {
      enter: {
        duration: 500,
        animation: 'slidePageIn',
        style: {
          translateX: `${direction * 100}%`,
          opacity: 0
        }
      },
      leave: {
        duration: 500,
        animation: direction > 0 ? 'slidePageLeft' : 'slidePageRight'
      }
    }
  }
}

PageSlider.LEFT = 1;
PageSlider.RIGHT = -1;

export default PageSlider;
