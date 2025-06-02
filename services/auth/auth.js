import { apiTaqat } from '../api';

// signup a new user with credentials
export const signupWithCredentials = async (userData) => {
  try {
    const response = await apiTaqat.post('/register', {
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
    const response = await apiTaqat.post('/login', credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// get the google Oauth URL from the api
export const getGoogleOAuthUrl = async () => {
  try {
    const googleUrl = 'https://dev.taqatportal.com/api/auth/google';
    window.location.href = googleUrl;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// user forget password using email, OTP
export const forgetPassword = async (email) => {
  try {
    const response = await apiTaqat.post('/forget-password', email);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// user change password
export const resetPassword = async (payload) => {
  console.log('payload', payload);
  try {
    const response = await apiTaqat.post('/reset-password', {
      ...payload,
      password: payload?.newPassword,
      password_confirmation: payload?.confirmPassword,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// verify the OTP sent to the user email
export const verifyEmailOtp = async ({ email, otpCode }) => {
  try {
    const response = await apiTaqat.post('/verify-otp', {
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
    const response = await apiTaqat.post('/resend-otp', {
      email,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// get the user data from the api
export async function getAuthUserData() {
  try {
    const response = await apiTaqat.get('/profile');
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
}

// change the user language preference via the API
export async function changeLang(languageCode) {
  try {
    const response = await apiTaqat.post('/lang', {
      language: languageCode,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
}

// signout the user
export const signoutUser = async (credentials) => {
  try {
    const response = await apiTaqat.post('/logout', credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
