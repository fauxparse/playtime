export const SIDEBAR = 'SIDEBAR';

export function showSidebar(show = true) {
  return { type: SIDEBAR, show };
}
