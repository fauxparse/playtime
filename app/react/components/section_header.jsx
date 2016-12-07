import React, { Component } from 'react';
import { VelocityTransitionGroup } from 'velocity-react';
import MenuButton from '../containers/menu_button';
import PageSlider from '../components/page_slider';

class SectionHeader extends Component {
  render() {
    const { children, direction } = this.props;
    const title = this.props.title || "Playtime";

    return (
      <header>
        <MenuButton/>
        <PageSlider component="div" className="title" direction={direction}>
          <h2 key={title}>{title}</h2>
        </PageSlider>
        {children}
      </header>
    )
  }
}

export default SectionHeader;
