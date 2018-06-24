// npm libs
import React from 'react';
import ReactDOM from 'react-dom';

// containers
import Root from 'pages';

// styles
import 'styles/reset.css';

// ga config
import './ga-config.js';

const styles = {
  display: 'flex',
  flex: 1,
  height: '100vh',
};

const target = document.createElement('main');
target.setAttribute(
  'style',
  Object.keys(styles)
    .map(key => `${key}:${styles[key]}`)
    .join(';'),
);

document.body.appendChild(target);
ReactDOM.render(<Root />, target);

if (module.hot) {
  module.hot.accept('./pages/index.jsx', () => {
    // eslint-disable-next-line
    const NextApp = require('./pages/index.jsx').default;
    ReactDOM.render(<NextApp />, target);
  });
}
