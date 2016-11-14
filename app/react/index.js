import './babel-polyfill';
import 'element-closest';
import 'velocity-animate';
import 'velocity-animate/velocity.ui';
import './animation';

import RWR, { integrationsManager } from 'react-webpack-rails';
import RWRRedux from 'rwr-redux';

RWR.run();

integrationsManager.register('redux-store', RWRRedux.storeIntegrationWrapper);
integrationsManager.register('redux-container', RWRRedux.containerIntegrationWrapper);
integrationsManager.register('redux-router', RWRRedux.routerIntegrationWrapper);

import Store from './store';
RWRRedux.registerStore('Store', Store);

import Routes from './routes';
RWRRedux.registerRoutes('Routes', Routes);
