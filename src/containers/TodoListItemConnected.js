// @flow
import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TodoListItem from 'components/TodoList/TodoListItem';
import {
  getTodoById,
  getIsHiddenSelector,
  getIsPending
} from 'modules/todo/reducers';
import { updateTodo, deleteTodo } from 'modules/todo/actions';
import { getTagNamesByIds } from 'modules/tag/reducers';
import type { State } from 'reducers';
import type { Dispatch } from 'react-redux';

const TodoListItemConnected = props => <TodoListItem {...props} />;

const mapStateToProps = ({ todo, tag, todoFilters }: State, { id }) => {
  const todoRecord = getTodoById({ todo, id });
  return {
    todo: todoRecord,
    tagNames: getTagNamesByIds(tag, todoRecord.tags),
    isHidden: getIsHiddenSelector({ todo, id, todoFilters }),
    isPending: getIsPending({ todo, id })
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onToggleIsCompleted: (todo, tagNames) => {
    dispatch(
      updateTodo(
        todo
          .set('tags', tagNames)
          .set('isCompleted', !todo.isCompleted)
          .toJS()
      )
    );
  },
  onDeleteTodo: bindActionCreators(deleteTodo, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(
  TodoListItemConnected
);
