import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Routes from './components/routing/Routes';

// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

import { socket } from './utils/socketClient';
import { setAlert } from './actions/alert';

import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    socket.on('sendFriendRequest', data => {
      console.log(data);
      store.dispatch(loadUser());
      store.dispatch(setAlert(data.notification, 'info'));
    });
    socket.on('cancelFriendRequest', data => {
      console.log(data);
      store.dispatch(loadUser());
      store.dispatch(setAlert(data.notification, 'info'));
    });
    socket.on('acceptFriendRequest', data => {
      console.log(data);
      store.dispatch(loadUser());
      store.dispatch(setAlert(data.notification, 'success'));
    });
    socket.on('removeFriend', data => {
      console.log(data);
      store.dispatch(loadUser());
      store.dispatch(setAlert(data.notification, 'danger'));
    });
    store.dispatch(loadUser());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadUser]);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route component={Routes} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
