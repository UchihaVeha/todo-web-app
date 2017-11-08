// @flow
import { put, call, takeEvery } from 'redux-saga/es/effects';
import { omit } from 'lodash';
import type { IOEffect } from 'redux-saga/es/effects';
import { normalize, schema } from 'normalizr';
import apiCaller from 'modules/apiCaller';
import * as api from 'services/api';
import {
  CREATE_TODO_REQUEST,
  UPDATE_TODO_REQUEST,
  LOAD_TODOS_REQUEST,
  DELETE_TODO_REQUEST,
  createTodoSuccess,
  updateTodoSuccess,
  loadTodosSuccess
} from './actions';

const TagSchema = new schema.Entity('tags');
const TodoSchema = new schema.Entity('todos', {
  tags: [TagSchema]
});
const TodoListSchema = [TodoSchema];

function* createTodo({ todo }): Generator<IOEffect, *, *> {
  const { payload } = yield call(
    apiCaller,
    api.createTodo(omit(todo, 'id', 'isPending'))
  );
  if (payload) {
    const { entities, result } = normalize(payload, TodoSchema);
    yield put(
      createTodoSuccess(todo, entities.todos[result], entities.tags || {})
    );
  }
  // Todo if error need reset status fetch and show error message
}

function* updateTodo({ todo }): Generator<IOEffect, *, *> {
  const { payload } = yield call(
    apiCaller,
    api.updateTodo(omit(todo, 'id', 'isPending'))
  );
  if (payload) {
    const { entities, result } = normalize(payload, TodoSchema);
    yield put(
      updateTodoSuccess(todo, entities.todos[result], entities.tags || {})
    );
  }
  // Todo if error need reset status fetch and show error message
}

function* loadTodos({ onDate }) {
  const { payload } = yield call(apiCaller, api.getTodos({ onDate }));
  if (payload) {
    const { entities = {}, result = [] } = normalize(payload, TodoListSchema);
    yield put(
      loadTodosSuccess(
        entities.todos || {},
        result,
        onDate,
        entities.tags || {}
      )
    );
  }
  // Todo if error need reset status fetch and show error message
}

function* deleteTodo({ todo }) {
  yield call(apiCaller, api.deleteTodo(todo.id));
  // Todo if error need reset status fetch and show error message
}

export default function* watchTodo(): Generator<IOEffect, *, *> {
  yield takeEvery(CREATE_TODO_REQUEST, createTodo);
  yield takeEvery(UPDATE_TODO_REQUEST, updateTodo);
  yield takeEvery(LOAD_TODOS_REQUEST, loadTodos);
  yield takeEvery(DELETE_TODO_REQUEST, deleteTodo);
}
