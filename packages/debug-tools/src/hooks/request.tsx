import useSWR, { SWRConfiguration } from 'swr'
import redaxios, { Response } from 'redaxios'
import { API_HOST, CHII_URL } from '../utils'
import { DebugTarget } from '@/shim'

export const useTargets = (config?: SWRConfiguration) => {
  const { data, error, mutate } = useSWR<Response<DebugTarget[]>>(
    `${CHII_URL}/targets`,
    redaxios.get,
    config
  )

  return {
    targets: data?.data || [],
    isLoading: !error && !data,
    isError: error,
    mutate,
  }
}

export const useIp = (config?: SWRConfiguration) => {
  const { data, error, mutate } = useSWR<Response<string>>(
    `${API_HOST}/ip`,
    redaxios.get,
    config
  )

  return {
    ip: data?.data || 'localhost',
    isLoading: !error && !data,
    isError: error,
    mutate,
  }
}
