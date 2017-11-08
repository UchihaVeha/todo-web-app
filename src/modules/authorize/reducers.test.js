import reducer from './reducers';
import * as actions from './actions';

describe('Module authorize | reducer', () => {
  it('should provide initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      isAuthorized: false,
      isFetching: false,
      error: null,
      accessToken: null,
      refreshToken: null
    });
  });

  it('should handle signUpRequest action', () => {
    const credentials = {};
    const beforeState = {
      isAuthorized: false,
      isFetching: false,
      error: null,
      accessToken: null,
      refreshToken: null
    };
    expect(reducer(beforeState, actions.signUpRequest(credentials))).toEqual({
      ...beforeState,
      isFetching: true
    });
  });

  it('should handle signInRequest action', () => {
    const credentials = {};
    const beforeState = {
      isAuthorized: false,
      isFetching: false,
      error: null,
      accessToken: null,
      refreshToken: null
    };
    expect(reducer(beforeState, actions.signInRequest(credentials))).toEqual({
      ...beforeState,
      isFetching: true
    });
  });

  it('should handle authorizeSuccess action', () => {
    const beforeState = {
      isAuthorized: false,
      isFetching: true,
      error: 'error',
      accessToken: null,
      refreshToken: null
    };
    const payload = {
      accessToken: 'accessToken',
      refreshToken: 'refreshToken'
    };

    expect(reducer(beforeState, actions.authorizeSuccess(payload))).toEqual({
      ...beforeState,
      isAuthorized: true,
      isFetching: false,
      error: null,
      ...payload
    });
  });

  it('should handle authorizeFailure action', () => {
    const newError = 'newError';
    const beforeState = {
      isAuthorized: false,
      isFetching: true,
      error: 'error',
      accessToken: null,
      refreshToken: null
    };
    expect(reducer(beforeState, actions.authorizeFailure(newError))).toEqual({
      ...beforeState,
      isFetching: false,
      error: newError
    });
  });

  it('should handle signOut action', () => {
    const beforeState = {
      isAuthorized: true,
      isFetching: false,
      error: null,
      accessToken: 'accessToken',
      refreshToken: 'refreshToken'
    };
    expect(reducer(beforeState, actions.signOut())).toEqual({
      ...beforeState,
      isAuthorized: false,
      accessToken: null,
      refreshToken: null
    });
  });
});
