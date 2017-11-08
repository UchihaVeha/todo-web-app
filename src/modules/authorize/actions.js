// @flow
export const SIGN_UP_REQUEST = 'authorize/SIGN_UP_REQUEST';
export const SIGN_IN_REQUEST = 'authorize/SIGN_IN_REQUEST';
export const AUTHORIZE_SUCCESS = 'authorize/AUTHORIZE_SUCCESS';
export const AUTHORIZE_FAILURE = 'authorize/AUTHORIZE_FAILURE';
export const SIGN_OUT = 'authorize/SIGN_OUT';

export type signInCredentials = { email: string, password: string };
export type signUpCredentials = { email: string, password: string };

export type Actions =
  | {|
      type: 'authorize/SIGN_UP_REQUEST',
      credentials: signUpCredentials
    |}
  | {|
      type: 'authorize/SIGN_IN_REQUEST',
      credentials: signInCredentials
    |}
  | {|
      type: 'authorize/AUTHORIZE_SUCCESS',
      accessToken: string,
      refreshToken: string
    |}
  | {|
      type: 'authorize/AUTHORIZE_FAILURE',
      error: string
    |}
  | {|
      type: 'authorize/SIGN_OUT'
    |};

export const signUpRequest = (credentials: signUpCredentials): Actions => ({
  type: SIGN_UP_REQUEST,
  credentials
});

export const signInRequest = (credentials: signInCredentials): Actions => ({
  type: SIGN_IN_REQUEST,
  credentials
});

export const authorizeSuccess = ({
  accessToken,
  refreshToken
}: {
  accessToken: string,
  refreshToken: string
}): Actions => ({
  type: AUTHORIZE_SUCCESS,
  accessToken,
  refreshToken
});

export const authorizeFailure = (
  error: string = 'Sorry, Some error happen'
): Actions => ({
  type: AUTHORIZE_FAILURE,
  error
});

export const signOut = () => ({
  type: SIGN_OUT
});
