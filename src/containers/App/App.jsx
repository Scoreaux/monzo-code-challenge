import React, { Component } from 'react';
import { HashRouter } from 'react-router-dom';
import { Switch, Route } from 'react-router';

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route exact path="/" render={() => (<div>Sign in</div>)} />
          <Route exact path="/apps" render={() => (<div>Apps</div>)} />
          <Route path="/apps/:id" render={props => (<div>App ID {props.match.params.id}</div>)} />
        </Switch>
      </HashRouter>
    );
  }
}

export default App;
