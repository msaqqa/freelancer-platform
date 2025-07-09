import { RiErrorWarningFill } from '@remixicon/react';
import i18n from 'i18next';
import Cookies from 'js-cookie';
import { toast } from 'sonner';
import { Alert, AlertIcon, AlertTitle } from '@/components/ui/alert';

/**
 * Error codes and their corresponding messages
 */
export const ERROR_CODES = {
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  VALIDATION_ERROR: 422,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
  NETWORK_ERROR: 'NETWORK_ERROR', // tested
  TIMEOUT_ERROR: 'TIMEOUT_ERROR',
};

/**
 * Default error messages for different scenarios
 */
const t = (key) => {
  return i18n.isInitialized ? i18n.t(`${key}`, { ns: 'errorMessages' }) : key;
};
const DEFAULT_MESSAGES = {
  [ERROR_CODES.UNAUTHORIZED]: t('errors.unauthorized'),
  [ERROR_CODES.FORBIDDEN]: t('errors.forbidden'),
  [ERROR_CODES.NOT_FOUND]: t('errors.notFound'),
  [ERROR_CODES.VALIDATION_ERROR]: t('errors.validationError'),
  [ERROR_CODES.INTERNAL_SERVER_ERROR]: t('errors.internalServerError'),
  [ERROR_CODES.SERVICE_UNAVAILABLE]: t('errors.serviceUnavailable'),
  [ERROR_CODES.NETWORK_ERROR]: t('errors.networkError'),
  [ERROR_CODES.TIMEOUT_ERROR]: t('errors.timeoutError'),
  DEFAULT: t('errors.default'),
};

/**
 * Handles API errors consistently across the application
 * @param {Error} error - The error object from axios
 * @param {Object} options - Additional options for error handling
 * @param {string} options.notificationDuration - Duration of the notification in seconds
 * @returns {Object} Formatted error object
 */
export const handleApiError = (error, options = { showNotification: true }) => {
  let errorResponse = {
    status: error.response?.status,
    message:
      error.response?.data?.error?.message ||
      error.response?.data?.message ||
      error.message,
    data: error.response?.data,
    type: 'error',
  };

  // Handle network errors
  if (!error.response) {
    if (error.code === 'ECONNABORTED') {
      errorResponse = {
        ...errorResponse,
        status: ERROR_CODES.TIMEOUT_ERROR,
        message: DEFAULT_MESSAGES[ERROR_CODES.TIMEOUT_ERROR],
      };
    } else {
      errorResponse = {
        ...errorResponse,
        status: ERROR_CODES.NETWORK_ERROR,
        message: DEFAULT_MESSAGES[ERROR_CODES.NETWORK_ERROR],
      };
    }
  }

  // Get default message if none provided
  if (!errorResponse.message) {
    errorResponse.message =
      DEFAULT_MESSAGES[errorResponse.status] || DEFAULT_MESSAGES.DEFAULT;
  }

  // Handle specific error codes
  switch (errorResponse.status) {
    case ERROR_CODES.UNAUTHORIZED:
      Cookies.remove('token');
      Cookies.remove('language');
      // Only redirect if we're not already on the login page
      if (!window.location.pathname.includes('/signin')) {
        window.location.href = '/signin';
      }
      break;

    case ERROR_CODES.VALIDATION_ERROR:
      // Format validation errors if available
      if (errorResponse.data?.errors) {
        errorResponse.validationErrors = errorResponse.data.errors;
        errorResponse.message = Object.values(errorResponse.data.errors)
          .flat()
          .join(', ');
      }
      break;

    case ERROR_CODES.FORBIDDEN:
      errorResponse = {
        ...errorResponse,
        status: ERROR_CODES.FORBIDDEN,
        message:
          errorResponse.message || DEFAULT_MESSAGES[ERROR_CODES.FORBIDDEN],
      };
      break;

    default:
      // Log unexpected errors
      if (errorResponse.status >= 500) {
        console.error('Server Error:', errorResponse);
      }
  }

  // Show notification if enabled
  if (
    options.showNotification &&
    errorResponse.status >= 400 &&
    errorResponse.status < 500
  ) {
    toast.custom(
      () => (
        <Alert variant="mono" icon="destructive">
          <AlertIcon>
            <RiErrorWarningFill />
          </AlertIcon>
          <AlertTitle>{errorResponse.message}</AlertTitle>
        </Alert>
      ),

      {
        position: 'top-center',
      },
    );
  }

  return errorResponse;
};
