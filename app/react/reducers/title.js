import { CHANGE_TITLE } from '../actions';

export default function title(state = 'Playtime', action) {
  switch (action.type) {
    case CHANGE_TITLE:
      return action.title;
    default:
      return state;
  }
}

