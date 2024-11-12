import { useGetQuery, useGetQueryOptions } from "@/hooks/useRequest"

export const getImages = (options?: useGetQueryOptions) => {
  return useGetQuery('Get images', `/api/images`, <any>{
    enabled: true,
    retry: true,
    ...options
  })
}