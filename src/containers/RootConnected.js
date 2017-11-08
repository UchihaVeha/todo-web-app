// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { GuestRoutes, UserRoutes } from 'routes';
import { getIsAuthorized } from 'modules/authorize/reducers';
import type { State } from 'reducers/index';

type Props = {
  isAuthorized: boolean
};
const App = ({ isAuthorized }: Props) =>
  isAuthorized ? <UserRoutes /> : <GuestRoutes />;

const mapStateToProps = (state: State) => ({
  isAuthorized: getIsAuthorized(state)
});

export default withRouter(connect(mapStateToProps)(App));
