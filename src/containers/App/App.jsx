import React, { Component } from 'react';
import { HashRouter, Redirect } from 'react-router-dom';
import { Switch, Route } from 'react-router';

import { signIn, validateToken } from 'src/api/auth';
import Authenticate from 'src/components/Authenticate';
import PrivateRoute from 'src/containers/PrivateRoute';

import styles from './App.scss';

class App extends Component {
  state = {
    auth: {
      accessToken: localStorage.getItem('accessToken'),
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
      auth: {
        ...state.auth,
        loading: true,
        message: null,
      }
    }));

    // Request sign in response from server
    const response = await signIn({ ...args });

    if (response.accessToken) {
      // Save access token to localStorage for persistant sessions
      localStorage.setItem('accessToken', response.accessToken);
      // Save access token to container state
      this.setState(state => ({
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
      auth: {
        ...state.auth,
        accessToken: null,
        message,
      }
    }));
  }

  render() {
    const { auth } = this.state;

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
              render={() => (<div>Apps</div>)}
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
