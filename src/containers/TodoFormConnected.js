// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import TodoForm from 'components/TodoForm';
import { createTodo, updateTodo } from 'modules/todo/actions';
import { createTodoRecord, getTodoById } from 'modules/todo/reducers';
import { getTagNamesByIds } from 'modules/tag/reducers';
import type { State } from 'reducers';
import type { TodoUpsert } from 'modules/todo/reducers';
import type { Dispatch } from 'react-redux';

const TodoFormConnected = props => <TodoForm {...props} />;

TodoFormConnected.defaultProps = {
  id: null
};

const mapStateToProps = ({ todo, tag }: State, { id }) => {
  const todoRecord = id ? getTodoById({ todo, id }) : createTodoRecord();
  return {
    todo: {
      ...todoRecord.toJS(),
      tags: getTagNamesByIds(tag, todoRecord.tags).toJS()
    }
  };
};

const mapDispatchToProps = (dispatch: Dispatch, { id }) => ({
  onSubmit: (todo: TodoUpsert) => {
    dispatch(id ? updateTodo(todo) : createTodo(todo));
    dispatch(push('/'));
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(TodoFormConnected);
