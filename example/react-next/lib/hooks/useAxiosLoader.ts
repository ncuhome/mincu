import { useInfoState } from '../../store/index'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { useMemo, useEffect, useCallback } from 'react'
import { eventModule } from 'mincu'

export const fetch = axios.create();

let failedQueue = []
let isRefreshing = false

const processQueue = (error: any, _token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(_token);
    }
  })

  failedQueue = [];
}

export const useAxiosLoader = () => {
  const [token, handleValue] = useInfoState(state => [state.token, state.handleValue]);

  const refreshToken = useCallback(async () => {
    const res = await eventModule.refreshToken()
    handleValue("token", res.token ?? '')
    return res.token
  }, [])

  const handleTokenExpired = useCallback((error: any) => {
    const { response: { status } } = error;
    const originalRequest = error.config;

    if (status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject })
        }).then(_token => {
          originalRequest.headers['Authorization'] = `passport ${_token}`
          return fetch(originalRequest);
        }).catch(err => {
          return Promise.reject(err);
        })
      }

      originalRequest._retry = true;
      isRefreshing = true

      return new Promise((resolve, reject) => {
        refreshToken()
          .then(_token => {
            fetch.defaults.headers.common['Authorization'] = `passport ${_token}`;
            originalRequest.headers['Authorization'] = `passport ${_token}`;
            processQueue(null, _token);
            resolve(fetch(originalRequest));
          })
          .catch((err) => {
            processQueue(err);
            reject(err);
          })
          .finally(() => {
            isRefreshing = false
          })
      })
    }

    return Promise.reject(error);
  }, [])

  const interceptors = useMemo(() => ({
    request: (config: AxiosRequestConfig) => {
      if (token) {
        config.headers.Authorization = `passport ${token}`
      }
      return config
    },
    response: (response: AxiosResponse) => response,
    error: handleTokenExpired,
  }), [token]);

  useEffect(() => {
    const reqInterceptor = fetch.interceptors.request.use(interceptors.request);
    const resInterceptor = fetch.interceptors.response.use(interceptors.response, interceptors.error);

    return () => {
      fetch.interceptors.request.eject(reqInterceptor);
      fetch.interceptors.response.eject(resInterceptor);
    };
  }, [interceptors]);

  return { refreshToken, fetch }
};