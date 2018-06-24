// npm libs
import React from 'react';
import PropTypes from 'prop-types';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import { AppContainer } from 'react-hot-loader';

// Routing
import { Router } from 'routing';

const styles = {
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    margin: ' 0 auto',
  },
  bodyContainer: {
    flex: 1,
    margin: '0 auto',
    maxWidth: 768,
    overflow: 'auto',
    padding: 10,
    width: '100%',
  },
};

const App = ({ body, header }) => (
  <section style={styles.container}>
    {header()}
    <section style={styles.bodyContainer}>{body()}</section>
  </section>
);

App.propTypes = {
  body: PropTypes.func.isRequired,
  header: PropTypes.func,
};

App.defaultProps = {
  header: () => {},
};

const renderApp = () => (
  <BrowserRouter>
    <App body={() => <Router />} />
  </BrowserRouter>
);

const Root = () => {
  if (APP_SETTINGS.environment === 'development') {
    return <AppContainer>{renderApp()}</AppContainer>;
  }
  return renderApp();
};

export default Root;
