import axios from 'axios';

export async function signIn({ username, password, expiry } = {}) {
  try {
    const response = await axios.post(`${process.env.BASE_URL}/login`, {
      username,
      password,
      expiry,
    });
    // Return access token
    return { accessToken: response.data.accessToken };
  } catch (error) {
    const { response = {} } = error;
    // Return error from server if one exists in response data
    if (response.data && response.data.error) {
      return { error: response.data.error };
    }
    // Return error
    return { error: 'An unknown error occurred, please try again later' };
  }
}

export async function validateToken(accessToken) {
  try {
    await axios.get(`${process.env.BASE_URL}`, {
      headers: {
        Authorization: accessToken,
      }
    });
    // Server response was 200 indicating a valid access token, return true
    return true;
  } catch (error) {
    // No valid access token or server error, return false
    return false;
  }
}
