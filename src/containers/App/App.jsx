import React, { Component } from 'react';
import { HashRouter } from 'react-router-dom';
import { Switch, Route } from 'react-router';

import { signIn, validateToken } from 'src/api/auth';

import Authenticate from 'src/components/Authenticate';

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
        localStorage.setItem('accessToken', null);
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
    const response = await signIn({ ...args, expiry: '10s' });

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
    localStorage.setItem('accessToken', null);
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
      <HashRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <Authenticate auth={auth} signIn={this.signIn} />
            )}
          />
          <Route exact path="/apps" render={() => (<div>Apps</div>)} />
          <Route path="/apps/:id" render={props => (<div>App ID {props.match.params.id}</div>)} />
        </Switch>
      </HashRouter>
    );
  }
}

export default App;
