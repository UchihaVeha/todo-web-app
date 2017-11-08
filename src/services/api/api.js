import { apiUrl } from 'config';

export const createTodo = params => ({
  url: `${apiUrl}/todos`,
  method: 'POST',
  params
});

export const updateTodo = (params, id) => ({
  url: `${apiUrl}/todos/${id}`,
  method: 'PATCH',
  params
});

export const getTodos = params => ({
  url: `${apiUrl}/todos`,
  method: 'GET',
  params
});

export const deleteTodo = id => ({
  url: `${apiUrl}/todos/${id}`,
  method: 'DELETE'
});

export const signUp = credentials => ({
  url: `${apiUrl}/sign-up`,
  method: 'POST',
  params: credentials
});

export const signIn = credentials => ({
  url: `${apiUrl}/sign-in`,
  method: 'POST',
  params: credentials
});

export const refreshTokens = token => ({
  url: `${apiUrl}/token`,
  method: 'POST',
  params: { refreshToken: token }
});
