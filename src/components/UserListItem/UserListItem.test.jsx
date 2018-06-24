import React from 'react';

import UserListItem from './UserListItem';

test('Component mounts', () => {
  const component = shallow(<UserListItem />);

  expect(component.exists()).toBe(true);
});
