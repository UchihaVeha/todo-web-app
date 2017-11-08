import { take, put, call, fork, race, select } from 'redux-saga/effects';
import ApiCaller from 'modules/apiCaller';
import * as api from 'services/api';
import * as actions from './actions';
import * as sagas from './sagas';
import * as reducers from './reducers';

describe('Module authorize | sagas', () => {
  describe('authorize', () => {
    const params = { url: 'url' };
    const payload = {
      accessToken: 'accessToken',
      refreshToken: 'refreshToken'
    };
    const message = 'error';

    it('1. should call ApiCaller with params', () => {
      const authorize = sagas.authorize(params);
      expect(authorize.next().value).toEqual(call(ApiCaller, params));
    });
    it('2.1.1 should put authorizeSuccess', () => {
      const authorize = sagas.authorize(params);
      authorize.next();
      expect(authorize.next({ payload }).value).toEqual(
        put(actions.authorizeSuccess(payload))
      );
    });
    it('2.1.2 should end', () => {
      const authorize = sagas.authorize(params);
      authorize.next();
      authorize.next({ payload });
      expect(authorize.next().done).toBeTruthy();
    });
    it('2.2.1 should put authorizeFailure', () => {
      const authorize = sagas.authorize(params);
      authorize.next();
      expect(authorize.next({ payload: undefined, message }).value).toEqual(
        put(actions.authorizeFailure(message))
      );
    });
    it('2.2.2 should end', () => {
      const authorize = sagas.authorize(params);
      authorize.next();
      authorize.next({ payload: undefined, message });
      expect(authorize.next().done).toBeTruthy();
    });
  });

  describe('getAuthorizationHeader', () => {
    it('1. should select getAccessToken', () => {
      const getAuthorizationHeader = sagas.getAuthorizationHeader();
      expect(getAuthorizationHeader.next().value).toEqual(
        select(reducers.getAccessToken)
      );
    });
    it('2.1 should return authorization header - token exist', () => {
      const accessToken = 'token';
      const header = { Authorization: `Bearer ${accessToken}` };
      const getAuthorizationHeader = sagas.getAuthorizationHeader();
      getAuthorizationHeader.next();
      const { value, done } = getAuthorizationHeader.next(accessToken);
      expect(value).toEqual(header);
      expect(done).toBeTruthy();
    });
    it('2.2 should return empty object - token not exist', () => {
      const getAuthorizationHeader = sagas.getAuthorizationHeader();
      getAuthorizationHeader.next();
      const { value, done } = getAuthorizationHeader.next(null);
      expect(value).toEqual({});
      expect(done).toBeTruthy();
    });
  });

  describe('tryRefreshTokens', () => {
    const refreshToken = 'token';
    const payload = {
      accessToken: 'accessToken',
      refreshToken: 'refreshToken'
    };
    const message = 'error';

    it('1. should select getRefreshToken', () => {
      const tryRefreshTokens = sagas.tryRefreshTokens();
      expect(tryRefreshTokens.next().value).toEqual(
        select(reducers.getRefreshToken)
      );
    });
    it('2.1 call ApiCaller - api.refreshToken', () => {
      const tryRefreshTokens = sagas.tryRefreshTokens();
      tryRefreshTokens.next();
      expect(tryRefreshTokens.next(refreshToken).value).toEqual(
        call(ApiCaller, api.refreshTokens(refreshToken))
      );
    });
    it('2.1.1 should put authorizeSuccess', () => {
      const tryRefreshTokens = sagas.tryRefreshTokens();
      tryRefreshTokens.next();
      tryRefreshTokens.next(refreshToken);
      expect(tryRefreshTokens.next({ payload }).value).toEqual(
        put(actions.authorizeSuccess(payload))
      );
      const { value, done } = tryRefreshTokens.next();
      expect(value).toEqual(true);
      expect(done).toBeTruthy();
    });
    it('2.1.2 should put authorizeFailure and signOut', () => {
      const tryRefreshTokens = sagas.tryRefreshTokens();
      tryRefreshTokens.next();
      tryRefreshTokens.next(refreshToken);
      expect(
        tryRefreshTokens.next({ payload: undefined, message }).value
      ).toEqual(put(actions.authorizeFailure(message)));
      expect(tryRefreshTokens.next().value).toEqual(put(actions.signOut()));
      const { value, done } = tryRefreshTokens.next();
      expect(value).toEqual(false);
      expect(done).toBeTruthy();
    });
    it('2.2 should put signOut', () => {
      const tryRefreshTokens = sagas.tryRefreshTokens();
      tryRefreshTokens.next();
      expect(tryRefreshTokens.next(null).value).toEqual(put(actions.signOut()));
      const { value, done } = tryRefreshTokens.next();
      expect(value).toEqual(false);
      expect(done).toBeTruthy();
    });
  });

  describe('watchAuth', () => {
    const signUp = { credentials: 'signUp' };
    const signIn = { credentials: 'signIn' };
    const raceParams = {
      signUp: take(actions.SIGN_UP_REQUEST),
      signIn: take(actions.SIGN_IN_REQUEST)
    };

    it('1. should race two take SIGN_UP_REQUEST and SIGN_IN_REQUEST', () => {
      const watchAuth = sagas.watchAuth();
      expect(watchAuth.next().value).toEqual(race(raceParams));
    });
    it('2.1 should fork authorize if signUp win race', () => {
      const watchAuth = sagas.watchAuth();
      watchAuth.next();
      expect(watchAuth.next({ signUp }).value).toEqual(
        fork(sagas.authorize, api.signUp(signUp.credentials))
      );
    });
    it('2.2 should fork authorize if signIn win race', () => {
      const watchAuth = sagas.watchAuth();
      watchAuth.next();
      expect(watchAuth.next({ signIn }).value).toEqual(
        fork(sagas.authorize, api.signIn(signIn.credentials))
      );
    });
    it('3 should race two take SIGN_OUT and AUTHORIZE_FAILURE', () => {
      const watchAuth = sagas.watchAuth();
      watchAuth.next();
      watchAuth.next({ signIn });
      expect(watchAuth.next().value).toEqual(
        race({
          signOut: take(actions.SIGN_OUT),
          failure: take(actions.AUTHORIZE_FAILURE)
        })
      );
    });
    it('4.1 should go to step 1 if signOut win race', () => {
      const watchAuth = sagas.watchAuth();
      watchAuth.next();
      watchAuth.next({ signIn });
      watchAuth.next({ signOut: true });
      expect(watchAuth.next().value).toEqual(race(raceParams));
    });
    it('4.2 should go to step 1 if authorizationFailure win race', () => {
      const watchAuth = sagas.watchAuth();
      watchAuth.next();
      watchAuth.next({ signIn });
      watchAuth.next({ failure: true });
      expect(watchAuth.next().value).toEqual(race(raceParams));
    });
  });
});
