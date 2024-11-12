/* eslint-disable max-params */
"use client"
import {
  QueryKey,
  useQuery,
  UseQueryOptions,
} from '@tanstack/react-query'
import axios, { AxiosError, AxiosResponse } from 'axios'


export type useGetQueryOptions = UseQueryOptions<
  AxiosResponse<any, any>,
  AxiosError<unknown, any>,
  AxiosResponse<any, any>,
  QueryKey
>

export const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

export const useGetQuery = (
  name: string,
  url: string,
  options?: useGetQueryOptions,
  params?: unknown[],
) => {
  return useQuery({
    queryKey: params ? [name, ...params] : [name],
    queryFn: async () => {
      const finalUrl = `${baseUrl}${url}`
      try {
        return await axios.get(finalUrl);
      } catch (error: unknown) {
        throw error;
      }
    },
    staleTime: 1000 * 60 * 5,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    networkMode: 'always',
    retry: true,
    refetchOnReconnect: true,
    ...options
  })
}