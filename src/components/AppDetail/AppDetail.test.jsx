import React from 'react';

import AppDetail from './AppDetail';

test('Component mounts', () => {
  const component = shallow(<AppDetail />);

  expect(component.exists()).toBe(true);
});

test('Component shows loading message when loading app details', () => {
  const component = shallow(<AppDetail apps={{ loading: true, list: [] }} />);

  expect(component.find('.center'));
});

test('Component shows error message when no app exists with matching ID', () => {
  const component = shallow(
    <AppDetail
      apps={{ list: [] }}
      computedMatch={{
        params: {
          id: 'testID',
        },
      }}
    />
  );

  expect(component.find('.message.error'));
});
