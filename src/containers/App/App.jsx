import React, { Component } from 'react';
import { HashRouter, Redirect } from 'react-router-dom';
import { Switch, Route } from 'react-router';

import { signIn, validateToken } from 'src/api/auth';
import { getApps, getUsers } from 'src/api/apps';
import Authenticate from 'src/components/Authenticate';
import PrivateRoute from 'src/containers/PrivateRoute';
import AppList from 'src/components/AppList';
import AppDetail from 'src/components/AppDetail';

import styles from './App.scss';

class App extends Component {
  state = {
    auth: {
      accessToken: localStorage.getItem('accessToken'),
      loading: false,
      message: null,
    },
    apps: {
      list: [],
      loading: false,
      message: null,
    },
    users: {
      id: null,
      page: 0,
      list: [],
      loading: false,
      message: null,
    },
  }

  async componentDidMount() {
    const { auth } = this.state;

    // Clear access token if validation fails
    if (auth.accessToken) {
      const isValid = await validateToken(auth.accessToken);
      if (!isValid) {
        localStorage.removeItem('accessToken');
        this.setState(state => ({
          ...state,
          auth: {
            ...state.auth,
            accessToken: null,
          },
        }));
      }
    }
  }

  signIn = async (args) => {
    // Set loading status to true
    this.setState(state => ({
      ...state,
      auth: {
        ...state.auth,
        loading: true,
        message: null,
      },
    }));

    // Request sign in response from server
    const response = await signIn({ ...args });

    if (response.accessToken) {
      // Save access token to localStorage for persistant sessions
      localStorage.setItem('accessToken', response.accessToken);
      // Save access token to container state
      this.setState(state => ({
        ...state,
        auth: {
          ...state.auth,
          accessToken: response.accessToken,
          loading: false,
        }
      }));
    } else {
      // Save error message to container state
      this.setState({
        auth: {
          accessToken: null,
          loading: false,
          message: response.error,
        },
      });
    }
  }

  signOut = (message) => {
    // Remove access taken from localStorage
    localStorage.removeItem('accessToken');
    // Remove access token from container state
    this.setState(state => ({
      ...state,
      auth: {
        ...state.auth,
        accessToken: null,
        message,
      }
    }));
  }

  getApps = async () => {
    // Set loading status to true
    this.setState(state => ({
      ...state,
      apps: {
        ...state.apps,
        loading: true,
      }
    }));
    // Request apps list from server
    const response = await getApps(this.state.auth.accessToken);
    if (response.apps) {
      // Update apps list from response
      this.setState({
        apps: {
          list: response.apps,
          loading: false,
        },
      });
    } else if (response.status === 401) {
      // Token has expired or is invalid, clear app list and sign out of app
      this.setState({
        apps: {
          list: [],
          loading: false,
        },
      }, () => {
        this.signOut(response.error);
      });
    } else {
      // An error occurred, display error messsage
      this.setState({
        apps: {
          list: [],
          loading: false,
          message: response.error,
        },
      });
    }
  }

  getUsers = async (id, page = 0) => {
    // Set loading status to true
    this.setState(state => ({
      ...state,
      users: {
        list: state.users.id === id ? state.users.list : [],
        id,
        page,
        loading: true,
      }
    }));
    // Request apps list from server
    const response = await getUsers(
      this.state.auth.accessToken,
      { id, offset: page * 25 },
    );
    if (response.users) {
      // Update apps list from response
      this.setState({
        users: {
          id,
          page,
          list: response.users,
          loading: false,
        },
      });
    } else if (response.status === 401) {
      // Token has expired or is invalid, clear app list and sign out of app
      this.setState({
        users: {
          id,
          page,
          list: [],
          loading: false,
        },
      }, () => {
        this.signOut(response.error);
      });
    } else {
      // An error occurred, display error messsage
      this.setState({
        users: {
          id,
          page,
          list: [],
          loading: false,
          message: response.error,
        },
      });
    }
  }

  render() {
    const { auth, apps, users } = this.state;

    return (
      <div className={styles.container}>
        <HashRouter>
          <Switch>
            <Route
              exact
              path="/"
              render={routeProps => (
                auth.accessToken ?
                  <Redirect to="/apps" />
                  :
                  <Authenticate auth={auth} signIn={this.signIn} {...routeProps} />
              )}
            />
            <PrivateRoute
              exact
              path="/apps"
              render={routeProps => (
                <AppList apps={apps} getApps={this.getApps} {...routeProps} />
              )}
              isAuthenticated={auth.accessToken}
              loginPath="/"
            />
            <PrivateRoute
              exact
              path="/apps/:id"
              render={routeProps => (
                <AppDetail
                  apps={apps}
                  users={users}
                  getApps={this.getApps}
                  getUsers={this.getUsers}
                  {...routeProps}
                />
              )}
              isAuthenticated={auth.accessToken}
              loginPath="/"
            />
          </Switch>
        </HashRouter>
      </div>
    );
  }
}

export default App;
