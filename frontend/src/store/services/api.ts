import {
  BaseQueryApi,
  createApi,
  FetchArgs,
  fetchBaseQuery
} from '@reduxjs/toolkit/query/react'

import { apiBaseUrl } from '@/utils/makeUrl'

export const baseQuery = fetchBaseQuery({
  baseUrl: apiBaseUrl,
  headers: {
    'Accept-Encoding': 'gzip, deflate, br, brotli',
    'content-type': 'application/json'
  }
})

const baseQueryWithReauth = async (
  args: FetchArgs,
  api: BaseQueryApi,
  extraOptions: object
) => {
  // todo reauth
  return baseQuery(args, api, extraOptions)
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  endpoints: () => ({}),
  tagTypes: []
})
