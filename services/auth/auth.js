import { apiTaqat } from '../api';

// signup a new user with credentials
export const signupWithCredentials = async (userData) => {
  const response = await apiTaqat.post('/register', userData, {
    showNotification: false,
  });
  return response.data;
};

// signin the user with credentials
export const signinWithCredentials = async (credentials) => {
  const response = await apiTaqat.post('/login', credentials, {
    showNotification: false,
  });
  return response.data;
};

// get the google Oauth URL from the api
export const getGoogleOAuthUrl = async () => {
  const googleUrl = 'https://dev.taqatportal.com/api/auth/google';
  window.location.href = googleUrl;
};

export const handleGoogleCallback = () => {
  const urlParams = new URLSearchParams(window.location.search);
  let token = urlParams.get('token');
  if (!token && window.location.hash) {
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    token = hashParams.get('token');
  }
  if (token) {
    Cookies.set('token', token);
  }
};

// user forget password using email, OTP
export const forgetPassword = async (email) => {
  const response = await apiTaqat.post('/forget-password', email, {
    showNotification: false,
  });
  return response.data;
};

// user change password
export const resetPassword = async (payload) => {
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
};

// verify the OTP sent to the user email
export const verifyEmailOtp = async ({ email, otpCode }) => {
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
};

// resend OTP code to the user email
export const resendVerificationCode = async (contact) => {
  const response = await apiTaqat.post('/resend-otp', contact);
  return response.data;
};

// get the user data from the api
export async function getAuthUserData() {
  const response = await apiTaqat.get('/profile');
  return response.data;
}

// change the user language preference via the API
export async function changeLang(lang) {
  const response = await apiTaqat.post('/lang', lang);
  return response.data;
}

// signout the user
export const signoutUser = async (credentials) => {
  const response = await apiTaqat.post('/logout', credentials);
  return response.data;
};

// set the account type data
export const submitAccountType = async (payload) => {
  const response = await apiTaqat.post('/account-type', payload);
  return response.data;
};
