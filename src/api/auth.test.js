import axios from 'axios';

import { signIn, validateToken } from './auth';

jest.mock('axios');

describe('Sign in', () => {
  test('Signing in with valid credentials returns access token', async () => {
    axios.post.mockResolvedValueOnce({ data: { accessToken: 'fakeToken' } });
    const response = await signIn();
    expect(response.accessToken);
  });

  test('Signing in with incorrect credentials returns error object', async () => {
    const errorDesc = 'Error description from server';
    axios.post.mockRejectedValueOnce({
      response: {
        status: 401,
        data: {
          error: errorDesc,
        },
      },
    });
    const response = await signIn();
    expect(response.error).toBe(errorDesc);
  });

  test('Unknown response from server returns error object', async () => {
    axios.post.mockRejectedValueOnce(new Error('Unknown response from server'));
    const response = await signIn();
    expect(response.error);
  });
});

describe('Validate token', () => {
  test('Valid token returns true', async () => {
    axios.get.mockResolvedValueOnce();
    const isValid = await validateToken();
    expect(isValid).toBe(true);
  });

  test('Invalid or expired token returns false', async () => {
    axios.get.mockRejectedValueOnce();
    const isValid = await validateToken();
    expect(isValid).toBe(false);
  });
});
