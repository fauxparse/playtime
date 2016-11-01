import fetch from 'isomorphic-fetch';

const DEFAULTS = {
  credentials: 'same-origin'
};

function mergeOptions(options) {
  var headers = options.headers || {}, token = window.CSRF.token();
  if (token) headers['X-CSRF-Token'] = token;
  return Object.assign({}, DEFAULTS, { headers }, options);
}

export default (path, options = {}) => fetch(path, mergeOptions(options))
