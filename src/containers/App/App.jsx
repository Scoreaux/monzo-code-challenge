import React, { Component } from 'react';
import { HashRouter, Redirect } from 'react-router-dom';
import { Switch, Route } from 'react-router';

import { signIn, validateToken } from 'src/api/auth';
import { getApps } from 'src/api/apps';
import Authenticate from 'src/components/Authenticate';
import PrivateRoute from 'src/containers/PrivateRoute';
import AppList from 'src/components/AppList';

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
    }
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
        this.signOut();
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

  render() {
    const { auth, apps } = this.state;

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
              render={() => (<AppList apps={apps} getApps={this.getApps} />)}
              isAuthenticated={auth.accessToken}
              loginPath="/"
            />
            <PrivateRoute
              exact
              path="/apps/:id"
              render={props => (<div>App ID {props.match.params.id}</div>)}
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
