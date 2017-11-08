import React from 'react';
import TodoListConnected from 'containers/TodoListConnected';
import TodoListCountConnected from 'containers/TodoListCountConnected';
import TodoFilterByDateConnected from 'containers/TodoFilterByDateConnected';
import TodoFilterByTagsConnected from 'containers/TodoFilterByTagsConnected';
import TodoFilterByIsCompletedConnected from 'containers/TodoFilterByIsCompletedConnected';
import { AppLayout } from 'components/Layout';

const AppBar = () => [
  <TodoFilterByDateConnected key={1} />,
  <TodoFilterByTagsConnected key={2} />,
  <TodoFilterByIsCompletedConnected key={3} />
];

const Content = () => [
  <TodoListCountConnected key={1} />,
  <TodoListConnected key={2} />
];

export default () => <AppLayout appBar={AppBar} content={Content} />;
