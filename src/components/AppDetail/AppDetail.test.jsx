import React from 'react';

import AppDetail from './AppDetail';

test('Component mounts', () => {
  const component = shallow(<AppDetail />);

  expect(component.exists()).toBe(true);
});

const testAppsObject = {
  list: [
    {
      id: 'testApp',
      name: 'Test App',
    },
  ],
};

const testUsersObject = {
  id: testAppsObject.list[0].id,
  page: 0,
  list: [
    { id: 'firstUser' },
    { id: 'secondUser' },
    { id: 'thirdUser' },
  ],
};

const testUsersObject25 = (page = 0) => {
  const list = [];
  for (let x = 0; x < 25; x += 1) {
    list.push({
      id: `user-${x}`
    });
  }
  return {
    id: testAppsObject.list[0].id,
    page,
    list,
  };
};

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

test('Component renders <UserListItem> for each user', () => {
  const component = shallow(
    <AppDetail
      apps={testAppsObject}
      users={testUsersObject}
      computedMatch={{
        params: {
          id: testAppsObject.list[0].id,
        },
      }}
    />
  );

  expect(component.find('UserListItem').length).toBe(3);
});

describe('User list pagination', () => {
  test('Clicking previous button loads previous page of users list', () => {
    const getUsersMock = jest.fn();
    const component = shallow(
      <AppDetail
        getUsers={getUsersMock}
        apps={testAppsObject}
        users={testUsersObject25(1)}
        computedMatch={{
          params: {
            id: testAppsObject.list[0].id,
          },
        }}
      />
    );

    component.find('button').at(0).simulate('click');

    expect(getUsersMock.mock.calls[1][1]).toBe(0);
  });

  test('Previous button is disabled when page number is 0', () => {
    const component = shallow(
      <AppDetail
        apps={testAppsObject}
        users={testUsersObject}
        computedMatch={{
          params: {
            id: testAppsObject.list[0].id,
          },
        }}
      />
    );

    expect(component.find('button').at(0).prop('disabled')).toBe(true);
  });

  test('Previous button is enabled when page number above 0', () => {
    const component = shallow(
      <AppDetail
        apps={testAppsObject}
        users={testUsersObject25(1)}
        computedMatch={{
          params: {
            id: testAppsObject.list[0].id,
          },
        }}
      />
    );

    expect(component.find('button').at(0).prop('disabled')).toBe(false);
  });

  test('Clicking next button loads next page of users list', () => {
    const getUsersMock = jest.fn();
    const component = shallow(
      <AppDetail
        getUsers={getUsersMock}
        apps={testAppsObject}
        users={testUsersObject25(1)}
        computedMatch={{
          params: {
            id: testAppsObject.list[0].id,
          },
        }}
      />
    );

    component.find('button').at(1).simulate('click');

    expect(getUsersMock.mock.calls[1][1]).toBe(2);
  });

  test('Next button is disabled when less than 25 users', () => {
    const component = shallow(
      <AppDetail
        apps={testAppsObject}
        users={testUsersObject}
        computedMatch={{
          params: {
            id: testAppsObject.list[0].id,
          },
        }}
      />
    );

    expect(component.find('button').at(1).prop('disabled')).toBe(true);
  });

  test('Next button is enabled when there is 25 users', () => {
    const component = shallow(
      <AppDetail
        apps={testAppsObject}
        users={testUsersObject25()}
        computedMatch={{
          params: {
            id: testAppsObject.list[0].id,
          },
        }}
      />
    );

    expect(component.find('button').at(1).prop('disabled')).toBe(false);
  });
});
