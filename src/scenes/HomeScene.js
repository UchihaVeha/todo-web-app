import React from 'react';
import { withRouter } from 'react-router';
import { Button } from 'material-ui';

const LandingPage = withRouter(({ history }) => (
  <div>
    <h1>Landing Page</h1>
    <Button raised color="primary" onClick={() => history.push('/sign-up')}>
      Sign Up
    </Button>{' '}
    <Button raised onClick={() => history.push('/sign-in')}>
      Sign In
    </Button>
  </div>
));

export default LandingPage;
