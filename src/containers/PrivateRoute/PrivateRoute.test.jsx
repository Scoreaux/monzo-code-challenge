import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Route, Switch } from 'react-router';

import PrivateRoute from './PrivateRoute';

const Authed = () => (<div>Authenticated</div>);
const NotAuthed = () => (<div>Not Authenticated</div>);

test('Component mounts', () => {
  const component = shallow(<PrivateRoute loginPath="/" />);

  expect(component.exists()).toBe(true);
});

test('Redirects to login route when not authenticated', () => {
  const component = mount(
    <MemoryRouter>
      <Switch>
        <Route
          exact
          path="/"
          component={NotAuthed}
        />
        <PrivateRoute
          loginPath="/"
          isAuthenticated={false}
          render={() => (<Authed />)}
        />
      </Switch>
    </MemoryRouter>
  );

  expect(component.find('NotAuthed')).toHaveLength(1);
});

test('Renders private route when authenticated', () => {
  const component = mount(
    <MemoryRouter>
      <Switch>
        <PrivateRoute
          path="/"
          loginPath="/login"
          isAuthenticated
          render={() => (<Authed />)}
        />
      </Switch>
    </MemoryRouter>
  );

  expect(component.find('Authed')).toHaveLength(1);
});
