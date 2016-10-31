import React, { Component } from 'react';
import MenuButton from '../containers/menu_button';

const SectionHeader = ({ title, children }) => (
  <header>
    <MenuButton/>
    <h2>{title || "Playtime"}</h2>
    {children}
  </header>
)

export default SectionHeader;
