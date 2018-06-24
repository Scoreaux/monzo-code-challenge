import axios from 'axios';

import { getApps } from './apps';

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
