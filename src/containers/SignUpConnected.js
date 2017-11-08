// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import type { State } from 'reducers';
import { signUpRequest } from 'modules/authorize/actions';
import {
  getIsAuthorized,
  getError,
  getIsFetching
} from 'modules/authorize/reducers';
import SignUpForm from 'components/Authorize/SignUpForm';

const SignUpConnected = props => <SignUpForm {...props} />;

const mapStateToProps = (state: State) => ({
  isAuthorized: getIsAuthorized(state),
  error: getError(state),
  isFetching: getIsFetching(state)
});

const mapDispatchToProps = {
  authorize: signUpRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpConnected);
