// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import TodoList from 'components/TodoList';
import {
  getTodoIdsByOnDate,
  getIsLoadingByOnDate
} from 'modules/todo/reducers';
import type { State } from 'reducers';
import TodoListItemConnected from './TodoListItemConnected';

const TodoListConnected = props => (
  <TodoList {...props} listItem={TodoListItemConnected} />
);

const mapStateToProps = ({ todo, todoFilters }: State) => ({
  todoIds: getTodoIdsByOnDate({ todo, todoFilters }),
  isLoading: getIsLoadingByOnDate(todo, todoFilters.onDate)
});

export default connect(mapStateToProps)(TodoListConnected);
