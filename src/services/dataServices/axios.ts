import { accessTokenCookieName, apiBaseUrl, ledgerBaseUrl } from '@/lib/constants';
import type { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import axios from 'axios';
import { t } from 'i18next';
import cookies from 'js-cookie';
import { toast } from 'sonner';
import { logout } from './auth';

export const Axios = axios.create({
  baseURL: apiBaseUrl
});
export const LedgerAxios = axios.create({
  baseURL: ledgerBaseUrl
});
const getRequestConfig = (config: InternalAxiosRequestConfig) => {
  const token = cookies.get(accessTokenCookieName);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};
const getRequestError = (error: AxiosError) => {
  console.log('Request Error', error);
  return Promise.reject(error);
};
const getResponseError = (error: any) => {
  if (error.response) {
    // Request made and server responded
    switch (error.response.status) {
      case 400: {
        console.log('Bad Request');
        break;
      }
      case 401: {
        delete Axios.defaults.headers.common.Authorization;
        logout().catch(console.error);
        break;
      }
      case 403: {
        console.log('Forbidden');
        break;
      }
      case 404: {
        console.log('Not Found');
        break;
      }
      case 500: {
        console.log('Internal Server Error');
        break;
      }
      case 502: {
        console.log('Bad Gateway');
        break;
      }
      case 503: {
        console.log('Service Unavailable');
        break;
      }
      case 504: {
        console.log('Gateway Timeout');
        break;
      }
      default: {
        break;
      }
    }
  } else if (error.request) {
    // The request was made but no response was received
    console.log('Error Request :', error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('Error Message :', error.message);
  }
  if (Array.isArray(error?.response?.data?.msg)) {
    error.response.data.msg?.forEach((message: any) => {
      toast.error(t(`errors.${message.msg}`) ?? 'Something went wrong!');
    });
  } else {
    toast.error(t(`errors.${error?.response?.data?.msg}`) ?? 'Something went wrong!');
  }
  return Promise.reject(new Error(error?.response?.data?.msg ?? 'Something went wrong!'));
};
const getResponseConfig = (response: AxiosResponse<any>): any => {
  return response.data;
};
Axios.interceptors.request.use(getRequestConfig, getRequestError);
Axios.interceptors.response.use(getResponseConfig, getResponseError);
LedgerAxios.interceptors.request.use(getRequestConfig, getRequestError);
LedgerAxios.interceptors.response.use(getResponseConfig, getResponseError);
