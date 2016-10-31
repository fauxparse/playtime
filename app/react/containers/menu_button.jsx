import React, { Component } from 'react';
import { connect } from 'react-redux';
import { showSidebar } from '../actions';

const MenuButton = ({ open, showSidebar }) => (
  <button rel="menu" data-open={open} onClick={showSidebar}>
    <svg width={24} height={24} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <rect x={3} y={6} width={18} height={2}/>
      <rect x={3} y={11} width={18} height={2}/>
      <rect x={3} y={16} width={18} height={2}/>
    </svg>
  </button>
);

const mapStateToProps = (state, ownProps) => {
  return {
    open: state.sidebar
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    showSidebar: () => dispatch(showSidebar())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuButton);
