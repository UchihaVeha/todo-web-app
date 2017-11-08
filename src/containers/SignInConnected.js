// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import type { State } from 'reducers';
import { signInRequest } from 'modules/authorize/actions';
import {
  getIsAuthorized,
  getError,
  getIsFetching
} from 'modules/authorize/reducers';
import SignInForm from 'components/Authorize/SignInForm';

const SignInConnected = props => <SignInForm {...props} />;

const mapStateToProps = (state: State) => ({
  isAuthorized: getIsAuthorized(state),
  error: getError(state),
  isFetching: getIsFetching(state)
});

const mapDispatchToProps = {
  authorize: signInRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(SignInConnected);
