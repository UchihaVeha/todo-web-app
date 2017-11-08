// @flow
import { call } from 'redux-saga/es/effects';
import {
  tryRefreshTokens,
  getAuthorizationHeader
} from 'modules/authorize/sagas';
import request from './request';

export default function* apiCaller({
  headers = {},
  ...rest
}: {
  headers: Object
}): Generator<*, *, *> {
  const authorizeHeader = yield call(getAuthorizationHeader);
  const props = {
    ...rest,
    headers: {
      ...headers,
      ...authorizeHeader
    }
  };
  const response = yield call(request, props);
  if (response) {
    if (
      response.statusCode === 401 &&
      response.message !== 'refreshToken is expired'
    ) {
      const isRefreshed = yield call(tryRefreshTokens);
      if (isRefreshed) {
        return yield call(apiCaller, props);
      }
    }
    return response;
  }
  // TODO catch browser connection error
  return {};
}
