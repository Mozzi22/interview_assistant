export const enum SIGN_IN_API {
  TOKEN_REFRESH = 'token/refresh/',
  LOGIN = 'auth/login',
  REGISTRATION = 'auth/register',
  RESET_PASSWORD_REQUEST = 'auth/password-reset/request',
  RESET_PASSWORD_CONFIRM = 'auth/password-reset/confirm'
}

export const enum QUESTIONS_API {
  CATEGORIES = '/questions/categories'
}

export const enum AI_API {
  CHAT = 'ai/chat'
}

export const enum API_METHODS {
  POST = 'POST',
  GET = 'GET',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
  PUT = 'PUT'
}
