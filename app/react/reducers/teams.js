import { SWITCH_TEAM, RECEIVE_TEAMS } from '../actions';

export default function teams(state = [], action) {
  switch (action.type) {
    case SWITCH_TEAM:
      return state.map(
        (team) => Object.assign({}, team, { selected: team.id == action.id })
      );
    case RECEIVE_TEAMS:
      return action.teams;
    default:
      return state;
  }
}
