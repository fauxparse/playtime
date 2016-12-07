import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'

import user from './user';
import teams from './teams';
import title from './title';
import sidebar from './sidebar';

const rootReducer = combineReducers({
  user,
  teams,
  title,
  sidebar,
  routing: routerReducer
});

export default rootReducer;
