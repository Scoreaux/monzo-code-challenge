import axios from 'axios';

import { getApps, updateApp, getUsers } from './apps';

jest.mock('axios');

describe('Get apps list', () => {
  test('Requesting with valid token returns app list', async () => {
    axios.get.mockResolvedValueOnce({ data: { apps: ['an app'] } });
    const response = await getApps();

    expect(response.apps.length).toBe(1);
  });

  test('Requesting with invalid or missing token returns unauthorized error', async () => {
    axios.get.mockRejectedValueOnce({
      response: {
        status: 401,
        data: {
          error: 'Unauthorized!'
        }
      }
    });
    const response = await getApps();

    expect(response.status).toBe(401);
  });

  test('Unknown response from server returns error object', async () => {
    axios.get.mockRejectedValueOnce(new Error('Unknown response from server'));
    const response = await getApps();

    expect(response.error);
  });
});

describe('Update app', () => {
  test('Requesting with valid token returns updated app', async () => {
    const appId = 'testAppId';
    axios.put.mockResolvedValueOnce({ data: { app: { id: appId } } });
    const response = await updateApp();

    expect(response.app.id).toBe(appId);
  });

  test('Requesting with invalid or missing token returns unauthorized error', async () => {
    axios.put.mockRejectedValueOnce({
      response: {
        status: 401,
        data: {
          error: 'Unauthorized!'
        }
      }
    });
    const response = await updateApp();

    expect(response.status).toBe(401);
  });

  test('Unknown response from server returns error object', async () => {
    axios.put.mockRejectedValueOnce(new Error('Unknown response from server'));
    const response = await updateApp();

    expect(response.error);
  });
});

describe('Get app users', () => {
  test('Requesting with valid token returns user list', async () => {
    axios.get.mockResolvedValueOnce({ data: { users: ['a user'] } });
    const response = await getUsers();

    expect(response.users.length).toBe(1);
  });

  test('Requesting with invalid or missing token returns unauthorized error', async () => {
    axios.get.mockRejectedValueOnce({
      response: {
        status: 401,
        data: {
          error: 'Unauthorized!'
        }
      }
    });
    const response = await getUsers();

    expect(response.status).toBe(401);
  });

  test('Unknown response from server returns error object', async () => {
    axios.get.mockRejectedValueOnce(new Error('Unknown response from server'));
    const response = await getUsers();

    expect(response.error);
  });
});
