import React from 'react';

const buttons = {
  add: <svg className="icon" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M23.996 10.154a1.852 1.852 0 0 0-1.846-1.846l-6.458.002V1.85A1.85 1.85 0 0 0 13.846.004L10.154 0a1.85 1.85 0 0 0-1.846 1.846v6.465H1.846A1.854 1.854 0 0 0 0 10.158l.004 3.688a1.85 1.85 0 0 0 1.846 1.846h6.458v6.462c0 1.015.832 1.846 1.846 1.846h3.692a1.85 1.85 0 0 0 1.846-1.846v-6.462h6.462A1.85 1.85 0 0 0 24 13.846l-.004-3.692z" fillRule="evenodd"/></svg>,
  accept: <svg className="icon" width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M29.046 8.36a2.012 2.012 0 0 0-2.79.49l-8.902 12.699-4.91-3.444a2.01 2.01 0 0 0-2.79.489L7.363 21.87a2 2 0 0 0 .488 2.784l6.55 4.594 3.274 2.295c.454.316.993.418 1.5.328a1.997 1.997 0 0 0 1.293-.82l12.34-17.612c.633-.9.41-2.154-.492-2.785l-3.27-2.294z"/></svg>,
  decline: <svg className="icon" width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M25.849 20.189l4.949-4.951a2.005 2.005 0 0 0 0-2.829l-2.832-2.825a2.004 2.004 0 0 0-2.828 0l-4.945 4.949-4.95-4.95a2.006 2.006 0 0 0-2.828 0l-2.832 2.828a2.007 2.007 0 0 0 0 2.828l4.954 4.95-4.95 4.95a2.007 2.007 0 0 0 0 2.829l2.828 2.826a2.006 2.006 0 0 0 2.829 0l4.949-4.95 4.949 4.95a2.005 2.005 0 0 0 2.828 0l2.828-2.829a2.005 2.005 0 0 0 0-2.828l-4.95-4.948z"/></svg>
}

const tabs = {
  inbox: <svg className="icon" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M21.845 21.5H2.157a.665.665 0 0 1-.657-.656V14.75h6.067A4.497 4.497 0 0 0 12 18.5a4.497 4.497 0 0 0 4.433-3.75h6.044l.023.092v6.002a.657.657 0 0 1-.655.656zm-17.51-18h15.33L22.288 14H15.75A3.754 3.754 0 0 1 12 17.75 3.754 3.754 0 0 1 8.25 14H1.71L4.337 3.5zm16.5-1.5H3.166L0 14.658v6.186C0 22.032.969 23 2.158 23h19.688A2.158 2.158 0 0 0 24 20.844V14.75L20.836 2z" fillRule="evenodd"/></svg>,
  events: <svg className="icon" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22.4 7.2H1.6V4.8a.8.8 0 0 1 .8-.8h2.4v.8a.8.8 0 1 0 1.6 0V4h11.2v.8a.8.8 0 1 0 1.6 0V4h2.4a.8.8 0 0 1 .8.8v2.4zm0 7.2H16V8h6.4v6.4zm0 7.2a.8.8 0 0 1-.8.8H16v-7.2h6.4v6.4zm-7.2-7.2H8.8V8h6.4v6.4zm0 8H8.8v-7.2h6.4v7.2zm-7.2-8H1.6V8H8v6.4zm0 8H2.4a.8.8 0 0 1-.8-.8v-6.4H8v7.2zm13.6-20h-2.4V.8a.8.8 0 0 0-1.6 0v1.6H6.4V.8a.8.8 0 0 0-1.6 0v1.6H2.4A2.403 2.403 0 0 0 0 4.8v16.8C0 22.923 1.077 24 2.4 24h19.2c1.323 0 2.4-1.077 2.4-2.4V4.8c0-1.323-1.077-2.4-2.4-2.4z" fillRule="evenodd"/></svg>,
  people: <svg className="icon" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M15 3.656C15 2.468 16.01 1.5 17.25 1.5s2.25.968 2.25 2.156v2.438c0 1.188-1.01 2.156-2.25 2.156S15 7.282 15 6.094V3.656zm2.25 6.094c2.063 0 3.75-1.645 3.75-3.656V3.656C21 1.646 19.312 0 17.25 0c-2.063 0-3.75 1.645-3.75 3.656v2.438c0 2.01 1.688 3.656 3.75 3.656zM5.997 7.406c0-1.188 1.01-2.156 2.25-2.156 1.241 0 2.25.968 2.25 2.156v2.438c0 1.188-1.009 2.156-2.25 2.156-1.24 0-2.25-.968-2.25-2.156V7.406zm2.25 6.094c2.063 0 3.75-1.645 3.75-3.656V7.406c0-2.01-1.688-3.656-3.75-3.656-2.063 0-3.75 1.645-3.75 3.656v2.438c0 2.01 1.688 3.656 3.75 3.656zm5.81 3.75a8.338 8.338 0 0 0-1.739-1.233l.013-.033c.765-1.934 2.742-3.234 4.919-3.234 2.741 0 4.998 1.982 5.23 4.5h-8.424zM1.503 22.5c.123-3.328 3.102-6 6.746-6 3.644 0 6.623 2.672 6.746 6H1.504zM17.25 11.25c-2.883 0-5.35 1.747-6.313 4.181A8.673 8.673 0 0 0 8.25 15C3.712 15 0 18.472 0 22.715 0 23.42.618 24 1.377 24h13.749c.753 0 1.374-.579 1.374-1.285a7.27 7.27 0 0 0-1.193-3.965h7.569c.616 0 1.124-.482 1.124-1.071 0-3.536-3.039-6.429-6.75-6.429z"/></svg>,
  stats: <svg className="icon" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22.5 22.5h-3v-15h3v15zm0-16.5h-3c-.825 0-1.5.675-1.5 1.5v15c0 .825.675 1.5 1.5 1.5h3c.825 0 1.5-.675 1.5-1.5v-15c0-.825-.675-1.5-1.5-1.5zm-18 16.5h-3V12h3v10.5zm0-12h-3c-.825 0-1.5.675-1.5 1.5v10.5c0 .825.675 1.5 1.5 1.5h3c.825 0 1.5-.675 1.5-1.5V12c0-.825-.675-1.5-1.5-1.5zm9 12h-3v-21h3v21zm0-22.5h-3C9.675 0 9 .675 9 1.5v21c0 .825.675 1.5 1.5 1.5h3c.825 0 1.5-.675 1.5-1.5v-21c0-.825-.675-1.5-1.5-1.5z"/></svg>
}

export { buttons, tabs }
