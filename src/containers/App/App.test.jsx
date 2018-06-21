import React from 'react';

import App from './App';

test('Component mounts', () => {
  const component = shallow(<App />);
  expect(component.exists()).toBe(true);
});
