import fetch from '../fetch';

export const SIDEBAR = 'SIDEBAR';
export const FETCH_TEAMS = 'FETCH_TEAMS';
export const RECEIVE_TEAMS = 'RECEIVE_TEAMS';
export const CHANGE_TITLE = 'CHANGE_TITLE';

export function showSidebar(show = true) {
  return { type: SIDEBAR, show };
}

export function fetchTeams() {
  return function(dispatch) {
    return fetch('/teams')
      .then(response => response.json())
      .then(json => dispatch(receiveTeams(json)));
  }
}

export function receiveTeams(teams) {
  return { type: RECEIVE_TEAMS, teams };
}

export function changeTitle(title) {
  return { type: CHANGE_TITLE, title };
}
