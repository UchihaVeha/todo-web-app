import React from 'react';
import { AppLayout } from 'components/Layout';
import TodoFormConnected from 'containers/TodoFormConnected';
import CreateTodoAppBar from './CreateTodoAppBar';

export default () => (
  <AppLayout appBar={CreateTodoAppBar} content={TodoFormConnected} />
);
