import SWITCH_TEAM from '../actions';

export default function teams(state = [], action) {
  switch (action.type) {
    case SWITCH_TEAM:
      return state.map(
        (team) => Object.assign({}, team, { selected: team.id == action.id })
      );
    default:
      return state;
  }
}
