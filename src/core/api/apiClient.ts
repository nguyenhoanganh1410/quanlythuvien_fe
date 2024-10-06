/* eslint-disable @typescript-eslint/no-explicit-any */
import { localStorageKeys } from '@/constants';
import Axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { camelizeKeys, decamelizeKeys } from 'humps';
import { jwtDecode } from 'jwt-decode';
import moment from 'moment';

export interface IApiClient {
  post<T>(path: string, object: T, config?: RequestConfig): Promise<any>;
  patch<T>(path: string, object: T): Promise<any>;
  put<T>(path: string, object: T): Promise<any>;
  get(path: string): Promise<any>;
}

export type HttpHeaders = {
  [key: string]: string;
};

export interface RequestConfig extends AxiosRequestConfig {
  headers: HttpHeaders;
}

export class ApiConfiguration {
  accessToken?: string;
}

class ApiClient implements IApiClient {
  private client: AxiosInstance;

  protected createAxiosClient(): AxiosInstance {
    const accessToken = localStorage.getItem(localStorageKeys.accessToken);
    const api = Axios.create({
      baseURL: import.meta.env.VITE_API_URI,
      responseType: 'json' as const,
      headers: {
        'Content-Type': 'application/json',
        ...(accessToken && {
          Authorization: `Bearer ${accessToken}`,
        }),
      },
      timeout: 150 * 1000,
    });

    api.interceptors.response.use((response: AxiosResponse) => {
      if (response.data && response.headers['content-type'] === 'application/json') {
        response.data = camelizeKeys(response.data);
      }
      return response;
    });

    api.interceptors.request.use(async (config) => {
      const newConfig = { ...config };
      newConfig.url = `${config.url}`;
      if (newConfig.headers['Content-Type'] === 'multipart/form-data') return newConfig;
      if (config.params) {
        newConfig.params = decamelizeKeys(config.params);
      }
      if (config.data) {
        newConfig.data = decamelizeKeys(config.data);
      }
      return newConfig;
    });

    return api;
  }

  constructor() {
    this.client = this.createAxiosClient();
  }

  async post<T>(path: string, payload: T, config?: RequestConfig) {
    try {
      const response = config ? await this.client.post(path, payload, config) : await this.client.post(path, payload);
      return response.data;
    } catch (error: unknown | AxiosError) {
      return this.handleServiceError(error as AxiosError);
    }
  }

  async patch<T>(path: string, payload: T, config?: RequestConfig) {
    try {
      const response = config ? await this.client.patch(path, payload, config) : await this.client.patch(path, payload);
      return response.data;
    } catch (error: unknown | AxiosError) {
      return this.handleServiceError(error as AxiosError);
    }
  }

  async put<T>(path: string, payload: T, config?: RequestConfig) {
    try {
      const response = config ? await this.client.put(path, payload, config) : await this.client.put(path, payload);
      return response.data;
    } catch (error: unknown | AxiosError) {
      return this.handleServiceError(error as AxiosError);
    }
  }

  async get<T>(path: string, config?: RequestConfig) {
    try {
      const response = await this.client.get<T>(path, { ...config });
      return response.data;
    } catch (error: unknown | AxiosError) {
      return this.handleServiceError(error as AxiosError);
    }
  }

  async delete<T>(path: string, config?: RequestConfig) {
    try {
      const response = await this.client.delete<T>(path, { ...config });
      return response.data;
    } catch (error: unknown | AxiosError) {
      return this.handleServiceError(error as AxiosError);
    }
  }

  async handleServiceError(error: AxiosError | any) {
    if (error.response) {
      const { data, status } = error.response;
      const originalReq = error.config;
      if (status === 401 && error.config && originalReq) {
        const accessTokenLocalStorage = localStorage.getItem(localStorageKeys.accessToken) ?? '';
        const accessToken = accessTokenLocalStorage ? jwtDecode(accessTokenLocalStorage) : null;
        const isExpired = accessToken ? moment(accessToken.exp! * 1000).diff(moment()) < 1 : false;
        if (isExpired) {
          let res = await fetch(`${import.meta.env.VITE_API_URI}/user/token_refresh`, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
              'Content-Type': 'application/json',
            },
            redirect: 'follow',
            referrer: 'no-referrer',
            body: JSON.stringify({
              refresh: localStorage.getItem(localStorageKeys.refreshToken),
            }),
          });
          const data = await res.json();
          if (data) {
            localStorage.setItem(localStorageKeys.accessToken, data.access);
            originalReq.headers['Authorization'] = 'Bearer ' + data.access;
          }
        }
      }
      if (status === 403) {
        localStorage.clear();
        window.location.reload();
        return;
      }
      if (data?.message?.details?.length > 0) {
        return {
          status: error.response.status,
          message: data.message.details[0].message,
          isError: true,
        };
      }

      if (typeof data === 'string') {
        return {
          status: status,
          message: data,
          isError: true,
        };
      }

      return {
        status: status,
        data: data,
        message: error.message,
        isError: true,
      };
    } else {
      return {
        isError: true,
        message: error.message,
      };
    }
  }
}
export const apiClient = new ApiClient();
