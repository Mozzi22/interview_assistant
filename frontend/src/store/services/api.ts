import {
  BaseQueryApi,
  createApi,
  FetchArgs,
  fetchBaseQuery
} from '@reduxjs/toolkit/query/react'

import { RootState } from '@/store'
import { apiBaseUrl } from '@/utils/makeUrl'

export const baseQuery = fetchBaseQuery({
  baseUrl: apiBaseUrl,
  prepareHeaders: (headers, { getState }) => {
    headers.set('Accept-Encoding', 'gzip, deflate, br, brotli')
    headers.set('content-type', 'application/json')

    const token = (getState() as RootState).user.token
    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }

    return headers
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
