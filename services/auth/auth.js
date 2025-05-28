import api from '../api';

// signup a new user with credentials
export const signupWithCredentials = async (userData) => {
  try {
    const response = await api.post('/register', {
      ...userData,
      name: 'mahmoud',
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// signin the user with credentials
export const signinWithCredentials = async (credentials) => {
  try {
    const response = await api.post('/login', credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// get the google Oauth URL from the api
export const getGoogleOAuthUrl = async () => {
  try {
    const res = await api.get('/api/uauth/google/url');
    return res.data.url;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// reset user password using email, OTP
export const resetPassword = async ({ email, otp, newPassword }) => {
  try {
    const payload = {
      email,
      otp,
      newPassword,
    };

    const response = await api.post('/api/uauth/reset-password', payload);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// verify the OTP sent to the user email
export const verifyEmailOtp = async ({ email, otpCode }) => {
  try {
    const response = await api.post('/verify-otp', {
      email,
      otp_code: otpCode,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// resend OTP code to the user email
export const resendEmailOtp = async (email) => {
  try {
    const response = await api.post('/resend-otp', {
      email,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// get the user profile from the api
export async function getUserProfile() {
  try {
    const response = await api.get('/profile');
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
}

// change the user language preference via the API
export async function changeLang(languageCode) {
  try {
    const response = await api.post('/lang', {
      language: languageCode,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
}

// signout the user with credentials
export const signouutWithCredentials = async (credentials) => {
  try {
    const response = await api.post('/logout', credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
