// @flow
import React from 'react';
import TodoFormConnected from 'containers/TodoFormConnected';
import type { Match } from 'react-router';
import { AppLayout } from 'components/Layout';
import UpdateTodoAppBar from './UpdateTodoAppBar';

type Props = {
  match: Match
};

export default ({ match }: Props) => (
  <AppLayout
    appBar={UpdateTodoAppBar}
    content={() => <TodoFormConnected id={match.params.id} />}
  />
);
