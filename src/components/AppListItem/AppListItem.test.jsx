import React from 'react';

import AppListItem from './AppListItem';

test('Component mounts', () => {
  const component = shallow(<AppListItem />);

  expect(component.exists()).toBe(true);
});

test('Wrapping <Link> component contains app ID in path', () => {
  const appId = 'testAppID';
  const component = shallow(<AppListItem app={{ id: appId }} />);

  expect(component.find({ to: `/apps/${appId}` }));
});
