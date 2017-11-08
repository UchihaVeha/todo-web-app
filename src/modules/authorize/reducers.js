// @flow
import {
  SIGN_UP_REQUEST,
  SIGN_IN_REQUEST,
  AUTHORIZE_SUCCESS,
  AUTHORIZE_FAILURE,
  SIGN_OUT
} from './actions';
import type { Actions } from './actions';

type State = {
  isAuthorized: boolean,
  isFetching: boolean,
  error: ?string,
  accessToken: ?string,
  refreshToken: ?string
};

const initialState = {
  isAuthorized: false,
  isFetching: false,
  error: null,
  accessToken: null,
  refreshToken: null
};

export default (state: State = initialState, action: Actions) => {
  switch (action.type) {
    case SIGN_IN_REQUEST:
    case SIGN_UP_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: null
      };
    case AUTHORIZE_SUCCESS:
      return {
        ...state,
        isAuthorized: true,
        isFetching: false,
        error: null,
        accessToken: action.accessToken,
        refreshToken: action.refreshToken
      };
    case AUTHORIZE_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    case SIGN_OUT:
      return {
        ...state,
        isAuthorized: false,
        accessToken: null,
        refreshToken: null
      };
    default:
      return state;
  }
};

export const getIsAuthorized = ({ auth }: { auth: State }) => auth.isAuthorized;
export const getError = ({ auth }: { auth: State }) => auth.error;
export const getIsFetching = ({ auth }: { auth: State }) => auth.isFetching;
export const getAccessToken = ({ auth }: { auth: State }) => auth.accessToken;
export const getRefreshToken = ({ auth }: { auth: State }) => auth.refreshToken;
