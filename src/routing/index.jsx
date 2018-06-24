// npm libs
import React from 'react';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';

// pages
import Entry from 'pages/Entry';
import Home from 'pages/Home';

const ROOT = APP_SETTINGS.environment === 'development' ? '' : '/blog';
const routes = {
  HOME: ROOT === '' ? '/' : ROOT,
  ENTRY: `${ROOT}/:slug`,
};

const Router = () => (
  <Switch>
    <Route exact path={routes.HOME} component={Home} />
    <Route path={routes.ENTRY} component={Entry} />
  </Switch>
);

export { Router, routes };
