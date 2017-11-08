// @flow
import type { Tag } from 'modules/tag/reducers';
import type { TodoEntity, TodoUpsert, TodoRecord, OnDate } from './reducers';

export const CREATE_TODO_REQUEST = 'todo/CREATE_TODO_REQUEST';
export const CREATE_TODO_SUCCESS = 'todo/CREATE_TODO_SUCCESS';
export const UPDATE_TODO_REQUEST = 'todo/UPDATE_TODO_REQUEST';
export const UPDATE_TODO_SUCCESS = 'todo/UPDATE_TODO_SUCCESS';
export const LOAD_TODOS_REQUEST = 'todo/LOAD_TODOS_REQUEST';
export const LOAD_TODOS_SUCCESS = 'todo/LOAD_TODOS_SUCCESS';
export const DELETE_TODO_REQUEST = 'todo/DELETE_TODO_REQUEST';

export type Actions =
  | {| type: 'todo/CREATE_TODO_REQUEST', todo: TodoUpsert |}
  | {|
      type: 'todo/CREATE_TODO_SUCCESS',
      prevTodo: TodoUpsert,
      nextTodo: TodoEntity,
      tags: { [number]: Tag }
    |}
  | {| type: 'todo/UPDATE_TODO_REQUEST', todo: TodoUpsert |}
  | {|
      type: 'todo/UPDATE_TODO_SUCCESS',
      prevTodo: TodoUpsert,
      nextTodo: TodoEntity,
      tags: { [number]: Tag }
    |}
  | {| type: 'todo/LOAD_TODOS_REQUEST', onDate: OnDate |}
  | {|
      type: 'todo/LOAD_TODOS_SUCCESS',
      todos: { [string]: TodoEntity },
      todoIds: number[],
      onDate: OnDate,
      tags: { [number]: Tag }
    |}
  | {|
      type: 'todo/DELETE_TODO_REQUEST',
      todo: TodoRecord
    |};

export const createTodo = (todo: TodoUpsert): Actions => ({
  type: CREATE_TODO_REQUEST,
  todo
});

export const createTodoSuccess = (
  prevTodo: TodoUpsert,
  nextTodo: TodoEntity,
  tags: { [number]: Tag }
): Actions => ({
  type: CREATE_TODO_SUCCESS,
  prevTodo,
  nextTodo,
  tags
});

export const updateTodo = (todo: TodoUpsert): Actions => ({
  type: UPDATE_TODO_REQUEST,
  todo
});

export const updateTodoSuccess = (
  prevTodo: TodoUpsert,
  nextTodo: TodoEntity,
  tags: { [number]: Tag }
): Actions => ({
  type: UPDATE_TODO_SUCCESS,
  prevTodo,
  nextTodo,
  tags
});

export const loadTodos = (onDate: OnDate): Actions => ({
  type: LOAD_TODOS_REQUEST,
  onDate
});

export const loadTodosSuccess = (
  todos: { [string]: TodoEntity },
  todoIds: number[],
  onDate: OnDate,
  tags: { [number]: Tag }
): Actions => ({
  type: LOAD_TODOS_SUCCESS,
  todos,
  todoIds,
  onDate,
  tags
});

export const deleteTodo = (todo: TodoRecord): Actions => ({
  type: DELETE_TODO_REQUEST,
  todo
});
