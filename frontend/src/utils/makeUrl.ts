export const apiBaseUrl =
  typeof window !== 'undefined'
    ? process.env.NODE_ENV === 'development'
      ? process.env.NEXT_PUBLIC_API_URL
      : `${window.location.origin}/api/`
    : process.env.NEXT_PUBLIC_API_URL
