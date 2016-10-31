import { SIDEBAR } from '../actions';

const sidebar = (state = false, action) => {
  switch (action.type) {
    case SIDEBAR:
      return action.show || false;
    default:
      return false;
  }
}

export default sidebar;
