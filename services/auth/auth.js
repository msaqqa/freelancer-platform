import { apiTaqat } from '../api';

// signup a new user with credentials
export const signupWithCredentials = async (userData) => {
  try {
    const response = await apiTaqat.post('/register', userData, {
      showNotification: false,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// signin the user with credentials
export const signinWithCredentials = async (credentials) => {
  try {
    const response = await apiTaqat.post('/login', credentials, {
      showNotification: false,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// get the google Oauth URL from the api
export const getGoogleOAuthUrl = async () => {
  try {
    const googleUrl = 'https://dev.taqatportal.com/api/auth/google';
    window.location.href = googleUrl;
  } catch (error) {
    throw error;
  }
};

export const handleGoogleCallback = () => {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    let token = urlParams.get('token');
    if (!token && window.location.hash) {
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      token = hashParams.get('token');
    }
    if (token) {
      Cookies.set('token', token);
    }
  } catch (error) {
    throw error;
  }
};

// user forget password using email, OTP
export const forgetPassword = async (email) => {
  try {
    const response = await apiTaqat.post('/forget-password', email, {
      showNotification: false,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// user change password
export const resetPassword = async (payload) => {
  try {
    const response = await apiTaqat.post(
      '/reset-password',
      {
        ...payload,
        password: payload?.newPassword,
        password_confirmation: payload?.confirmPassword,
      },
      {
        showNotification: false,
      },
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// verify the OTP sent to the user email
export const verifyEmailOtp = async ({ email, otpCode }) => {
  try {
    const response = await apiTaqat.post(
      '/verify-otp',
      {
        email,
        otp_code: otpCode,
      },
      {
        showNotification: false,
      },
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// resend OTP code to the user email
export const resendVerificationCode = async (contact) => {
  try {
    const response = await apiTaqat.post('/resend-otp', contact);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// get the user data from the api
export async function getAuthUserData() {
  try {
    const response = await apiTaqat.get('/profile');
    return response.data;
  } catch (error) {
    throw error;
  }
}

// change the user language preference via the API
export async function changeLang(lang) {
  try {
    const response = await apiTaqat.post('/lang', lang);
    return response.data;
  } catch (error) {
    throw error;
  }
}

// signout the user
export const signoutUser = async (credentials) => {
  try {
    const response = await apiTaqat.post('/logout', credentials);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// set the account type data
export const submitAccountType = async (payload) => {
  try {
    const response = await apiTaqat.post('/account-type', payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};
