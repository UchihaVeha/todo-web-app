// @flow
import { take, put, call, race, fork, select } from 'redux-saga/effects';
import type { IOEffect } from 'redux-saga/es/effects';
import ApiCaller from 'modules/apiCaller';
import * as api from 'services/api';
import { getRefreshToken, getAccessToken } from './reducers';
import {
  SIGN_UP_REQUEST,
  SIGN_IN_REQUEST,
  AUTHORIZE_FAILURE,
  SIGN_OUT,
  authorizeSuccess,
  authorizeFailure,
  signOut
} from './actions';

export function* authorize(params: *): Generator<IOEffect, *, *> {
  const { payload, message } = yield call(ApiCaller, params);
  if (payload) {
    yield put(authorizeSuccess(payload));
    return;
  }
  yield put(authorizeFailure(message));
}

export function* getAuthorizationHeader(): Generator<string, *, string> {
  const accessToken = yield select(getAccessToken);
  if (!accessToken) {
    return {};
  }
  return { Authorization: `Bearer ${accessToken}` };
}

export function* tryRefreshTokens(): Generator<IOEffect, *, *> {
  const refreshToken = yield select(getRefreshToken);
  if (refreshToken) {
    const { payload, message } = yield call(
      ApiCaller,
      api.refreshTokens(refreshToken)
    );
    if (payload) {
      yield put(authorizeSuccess(payload));
      return true;
    }
    yield put(authorizeFailure(message));
  }
  yield put(signOut());
  return false;
}

export function* watchAuth(): Generator<IOEffect, *, *> {
  while (true) {
    const { signUp, signIn } = yield race({
      signUp: take(SIGN_UP_REQUEST),
      signIn: take(SIGN_IN_REQUEST)
    });
    const params = signUp
      ? api.signUp(signUp.credentials)
      : api.signIn(signIn.credentials);
    yield fork(authorize, params);
    yield race({
      signOut: take(SIGN_OUT),
      failure: take(AUTHORIZE_FAILURE)
    });
  }
}

export default watchAuth;
