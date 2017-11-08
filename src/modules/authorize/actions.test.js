import * as actions from './actions';

describe('Module authorize | actions', () => {
  it('should signUpRequest create SIGN_UP_REQUEST action', () => {
    const credentials = {
      email: 'test@test.ua',
      password: 'test'
    };
    expect(actions.signUpRequest(credentials)).toEqual({
      type: actions.SIGN_UP_REQUEST,
      credentials
    });
  });

  it('should signInRequest create SIGN_IN_REQUEST action', () => {
    const credentials = {
      email: 'test@test.ua',
      password: 'test'
    };
    expect(actions.signInRequest(credentials)).toEqual({
      type: actions.SIGN_IN_REQUEST,
      credentials
    });
  });

  it('should authorizeSuccess create AUTHORIZE_SUCCESS action', () => {
    const payload = {
      refreshToken: 'refreshToken',
      accessToken: 'accessToken'
    };
    expect(actions.authorizeSuccess(payload)).toEqual({
      type: actions.AUTHORIZE_SUCCESS,
      ...payload
    });
  });

  it('should authorizeFailure create AUTHORIZE_FAILURE action', () => {
    const error = 'error';
    expect(actions.authorizeFailure(error)).toEqual({
      type: actions.AUTHORIZE_FAILURE,
      error
    });
  });

  it('should signOut SIGN_OUT action', () => {
    expect(actions.signOut()).toEqual({
      type: actions.SIGN_OUT
    });
  });
});
