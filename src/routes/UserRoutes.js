// @flow
import React from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router';
import TodoListScene from 'scenes/TodoListScene';
import CreateTodoScene from 'scenes/CreateTodoScene';
import UpdateTodoScene from 'scenes/UpdateTodoScene';

const UserRoutes = () => (
  <Switch>
    <Route exact path="/" component={TodoListScene} />
    <Route path="/sign-up" render={() => <Redirect to="/" />} />
    <Route path="/sign-in" render={() => <Redirect to="/" />} />
    <Route path="/create" component={CreateTodoScene} />
    <Route path="/update/:id" component={UpdateTodoScene} />
    <Route render={() => <h1>Not Found</h1>} />
  </Switch>
);

export default withRouter(UserRoutes);
