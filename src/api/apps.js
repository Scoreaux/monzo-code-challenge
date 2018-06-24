import axios from 'axios';

export async function getApps(accessToken) {
  try {
    const response = await axios.get(`${process.env.BASE_URL}/apps`, {
      headers: {
        Authorization: accessToken,
      }
    });
    return response.data;
  } catch (error) {
    const { response = {} } = error;
    if (response.status === 401) {
      // Return unauthorized error and status
      return { error: response.data.error, status: 401 };
    } else if (response.data && response.data.error) {
      // Return error from server if one exists in response data
      return { error: response.data.error };
    }
    // Return error
    return { error: 'An unknown error occurred, please try again later' };
  }
}

export async function updateApp() {
  return false;
}
