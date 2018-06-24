import React from 'react';

import AppList from './AppList';

test('Component mounts', () => {
  const component = shallow(<AppList />);

  expect(component.exists()).toBe(true);
});

test('Component triggers props.getApps() on mount', () => {
  const getAppsMock = jest.fn();
  const component = shallow(<AppList getApps={getAppsMock} />);

  expect(getAppsMock.mock.calls.length).toBe(1);
});

test('<AppListItem> rendered for each app in list', () => {
  const appsProp = {
    list: [
      {
        id: 1,
        name: 'Test App',
      },
      {
        id: 2,
        name: 'Second Test App',
      }
    ],
  };
  const component = shallow(<AppList apps={appsProp} />);

  expect(component.find('AppListItem').length).toBe(2);
});

test('Error message rendered when error getting app list occurs', () => {
  const errorText = 'An error occurred';
  const appsProp = {
    message: errorText,
    list: [],
  };
  const component = shallow(<AppList apps={appsProp} />);

  expect(component.find('.message.error').text()).toBe(errorText);
});
