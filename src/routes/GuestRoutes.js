// @flow
import React from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router';
import SignUpScene from 'scenes/SignUpScene';
import SignInScene from 'scenes/SignInScene';
import HomeScene from 'scenes/HomeScene';
import { LandingPageLayout } from 'components/Layout';

const GuestRoutes = () => (
  <LandingPageLayout>
    <Switch>
      <Route exact path="/" component={HomeScene} />
      <Route path="/sign-up" component={SignUpScene} />
      <Route path="/sign-in" component={SignInScene} />
      <Route path="/create" render={() => <Redirect to="/sign-in" />} />
      <Route path="/update/:id" render={() => <Redirect to="/sign-in" />} />
      <Route render={() => <h1>Not Found</h1>} />
    </Switch>
  </LandingPageLayout>
);

export default withRouter(GuestRoutes);
