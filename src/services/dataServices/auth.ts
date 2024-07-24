import type {
  TChangePasswordResponse,
  TForgotPasswordResponse,
  TResendOTPResponse,
  TResetPasswordResponse,
  TSignInResponse,
  TSignUpResponse,
  TVerifyOTPResponse
} from '@/@types/auth';
import { accessTokenCookieName, apiBaseUrl, refreshTokenCookieName, roleCookieName } from '@/lib/constants';
import type {
  OTPFormData,
  ResendOTPFormData,
  TChangePasswordRequestParameters,
  TForgotPasswordRequestParameters,
  TResetPasswordRequestParameters,
  TSignInRequestParameters,
  TSignUpRequestParameters
} from '@/lib/schemas/auth';
import { apiRoutes } from '@/routes/api';
import { persistor } from '@/app/store';
import axios, { AxiosError } from 'axios';
import cookies from 'js-cookie';
import { toast } from 'sonner';
import { Axios } from './axios';
import { publicPaths } from '@/routes/client-paths';
import type { GetProfileResponse } from '@/@types/profile';

export const login = async (parameters: TSignInRequestParameters) => {
  try {
    const response = await axios.post<TSignInResponse>(`${apiBaseUrl}${apiRoutes.signIn}`, parameters);
    if (response.data.success) {
      const data = response.data.response;
      cookies.set(accessTokenCookieName, data.token, { expires: data.expiry });
      cookies.set(refreshTokenCookieName, data.refreshToken, { expires: data.refreshExpiry });
      cookies.set(roleCookieName, data.user.role);
      window.location.href = '/';
    }
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response) {
        if (error.response.data.msg === 'USER_EMAIL_IS_NOT_VERIFIED') {
          toast.info('Please verify your email.');
          setTimeout(() => {
            window.location.href = publicPaths.verifyOTP;
          }, 1000);
        } else {
          toast.error(error.response.data.msg);
        }
      } else {
        toast.error(error.message);
      }
    }
  }
};

export const logout = async () => {
  cookies.remove(accessTokenCookieName);
  cookies.remove(refreshTokenCookieName);
  cookies.remove(roleCookieName);
  await persistor.purge();
  window.location.href = publicPaths.signIn;
};

export const register = async (parameters: TSignUpRequestParameters) => {
  try {
    const response: TSignUpResponse = await Axios.post(apiRoutes.signUp, parameters);
    return response;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response) {
        toast.error(error.response.data.msg);
      } else {
        toast.error(error.message);
      }
    }
  }
};

export const requestNewToken = async () => {
  try {
    const refreshToken = cookies.get(refreshTokenCookieName);
    const response = await axios.post<TSignInResponse>(`${apiBaseUrl}${apiRoutes.refreshToken}`, { refreshToken });
    if (response.data.success) {
      const data = response.data.response;
      cookies.set(accessTokenCookieName, data.token, { expires: data.expiry });
      cookies.set(refreshTokenCookieName, data.refreshToken, { expires: data.refreshExpiry });
    } else {
      cookies.remove(accessTokenCookieName);
      window.location.href = publicPaths.signIn;
    }
  } catch {
    cookies.remove(accessTokenCookieName);
    window.location.href = publicPaths.signIn;
  }
};

export const getUserRole = async () => {
  try {
    const result: GetProfileResponse = await Axios.get(apiRoutes.profile.GET);
    cookies.set(roleCookieName, result.response.role);
    return result.response.role;
  } catch {
    toast.error('Cannot get role of the user');
  }
};

export const verifyOTP = async (parameters: OTPFormData) => {
  try {
    const response: TVerifyOTPResponse = await Axios.post(apiRoutes.verifyOTP, parameters);
    return response;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response) {
        toast.error(error.response.data.msg);
      } else {
        toast.error(error.message);
      }
    }
  }
};

export const resnedOTP = async (parameters: ResendOTPFormData) => {
  try {
    const response: TResendOTPResponse = await Axios.post(apiRoutes.resendOTP, parameters);
    return response;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response) {
        toast.error(error.response.data.msg);
      } else {
        toast.error(error.message);
      }
    }
  }
};

export const forgot = async (parameters: TForgotPasswordRequestParameters) => {
  try {
    const response = await axios.post<TForgotPasswordResponse>(`${apiBaseUrl}${apiRoutes.forgotPassword}`, parameters);
    if (response.data.success) {
      toast.success('Please check your email to reset your password.');
    } else {
      toast.error(response.data.msg);
    }
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response) {
        toast.error(error.response.data.msg);
      } else {
        toast.error(error.message);
      }
    }
  }
};

export const changePassword = async (parameters: TChangePasswordRequestParameters) => {
  try {
    const response: TChangePasswordResponse = await Axios.post(apiRoutes.changePassword, parameters);
    return response;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response) {
        toast.error(error.response.data.msg);
      } else {
        toast.error(error.message);
      }
    }
  }
};

export const resetPassword = async (parameters: TResetPasswordRequestParameters) => {
  try {
    const response: TResetPasswordResponse = await Axios.post(apiRoutes.resetPassword, parameters);
    return response;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response) {
        toast.error(error.response.data.msg);
      } else {
        toast.error(error.message);
      }
    }
  }
};
