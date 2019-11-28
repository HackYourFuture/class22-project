import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from './../layout/Spinner';

import Chat from './Chat';

const App = ({ auth: { user } }) => {
  if (!user) {
    return <Spinner />;
  }
  const username = user.name;
  const chat = username ? <Chat /> : null;
  return <Fragment>{chat}</Fragment>;
};

App.propTypes = {
  auth: PropTypes.object
};

const mapStateToProps = state => ({
  user: state.user,
  auth: state.auth
});

export default connect(mapStateToProps)(App);
