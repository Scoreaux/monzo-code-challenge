import React from 'react';

import AppList from './AppList';

test('Component mounts', () => {
  const component = shallow(<AppList />);

  expect(component.exists()).toBe(true);
});
