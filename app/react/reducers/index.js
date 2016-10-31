import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'

import user from './user';
import teams from './teams';
import sidebar from './sidebar';

const rootReducer = combineReducers({
  user,
  teams,
  sidebar,
  routing: routerReducer
});

export default rootReducer;
