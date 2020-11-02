import { useInfoState } from '../../store/index'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { useMemo, useEffect } from 'react'
import EventModule from '../../../packages/event/index'
import { useRef } from 'react'

export const ax = axios.create();

export const refreshToken = async () => {
  // return await EventModule.refreshToken()
}

export const useAxiosLoader = () => {
  const token = useInfoState(state => state.token);
  let { current: retryCount } = useRef(3)

  const interceptors = useMemo(() => ({
    request: (config: AxiosRequestConfig) => {
      if (token) {
        config.headers.Authorization = `passport ${token}`
      }
      return config
    },
    response: (response: AxiosResponse) => {
      if (response.status === 401) {
        if (retryCount <= 0) {
          alert('登录失败，请重试')
          return
        }

        // await refreshToken()
        retryCount--
      }

      if (response.status === 200) {
        retryCount = 3
        return response
      }

      return response
    },
    error: (error: any) => Promise.reject(error),
  }), [token, retryCount]);

  useEffect(() => {
    const reqInterceptor = ax.interceptors.request.use(interceptors.request, interceptors.error);
    const resInterceptor = ax.interceptors.response.use(interceptors.response, interceptors.error);

    return () => {
      ax.interceptors.request.eject(reqInterceptor);
      ax.interceptors.response.eject(resInterceptor);
    };
  }, [interceptors]);
};