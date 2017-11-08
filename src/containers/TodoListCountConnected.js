// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import TodoListCount from 'components/TodoList/TodoListCount';
import { getFilterCountSelector } from 'modules/todo/reducers';
import type { State } from 'reducers';

const TodoListCountConnected = props => <TodoListCount {...props} />;

const mapStateToProps = ({ todo, todoFilters }: State) => ({
  count: getFilterCountSelector({ todo, todoFilters })
});

export default connect(mapStateToProps)(TodoListCountConnected);
