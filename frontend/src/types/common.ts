type TServerStatus = 'success' | 'failed'

export type TServerResponse<T> = {
  data: T
  errors?: Record<string, string>[] | unknown
  status: TServerStatus
}

export type TServerResponsePagination<T> = {
  count: number
  next: string | null
  previous: string | null
  results: T
}
