import React from 'react';

import Authenticate from './Authenticate';

test('Component mounts', () => {
  const component = shallow(<Authenticate />);

  expect(component.exists()).toBe(true);
});

test('Clicking button triggers props.signIn', () => {
  const signInMock = jest.fn();
  const component = shallow(<Authenticate signIn={signInMock} />);

  component.find('form').simulate('submit', { preventDefault: () => {} });

  expect(signInMock.mock.calls.length).toBe(1);
});

test('Calling props.signIn includes username in args', () => {
  const signInMock = jest.fn();
  const component = shallow(<Authenticate signIn={signInMock} />);
  const form = component.find('form');

  const componentState = {
    username: 'test',
    password: 'test',
  };
  component.setState(componentState);
  form.simulate('submit', { preventDefault: () => {} });

  expect(signInMock.mock.calls[0][0].password).toBe('test');
});

test('Calling props.signIn includes password in args', () => {
  const signInMock = jest.fn();
  const component = shallow(<Authenticate signIn={signInMock} />);
  const form = component.find('form');

  const componentState = {
    username: 'test',
    password: 'test',
  };
  component.setState(componentState);
  form.simulate('submit', { preventDefault: () => {} });

  expect(signInMock.mock.calls[0][0].username).toBe('test');
});
