// @flow
import { combineReducers } from 'redux';
import { createSelector } from 'reselect';
import { OrderedSet, Map, Record } from 'immutable';
import { omit } from 'lodash';
import { compose } from 'recompose';
import { toDate } from 'utils';
import type { State as TodoFiltersState } from 'reducers/todoFilters';
import type { TagIds } from 'modules/tag/reducers';

import {
  CREATE_TODO_REQUEST,
  CREATE_TODO_SUCCESS,
  UPDATE_TODO_REQUEST,
  UPDATE_TODO_SUCCESS,
  LOAD_TODOS_REQUEST,
  LOAD_TODOS_SUCCESS,
  DELETE_TODO_REQUEST
} from './actions';
import type { Actions } from './actions';

export type OnDate = string;
export type TodoIds = OrderedSet<number>;

export type TodoEntity = {
  id: number,
  title: string,
  onDate: OnDate,
  isCompleted: boolean,
  tags: number[]
};

export type TodoUpsert = {
  id: number,
  title: string,
  onDate: OnDate,
  isCompleted: boolean,
  tags: string[]
};

export type TodoRecordInstance = {|
  id: number,
  title: string,
  onDate: OnDate,
  isCompleted: boolean,
  tags: OrderedSet<number>
|};

export type isCompletedFilterProps = 'all' | 'completed' | 'notCompleted';

export type FilterProps = {
  onDate: OnDate,
  tags: TagIds,
  isCompleted: isCompletedFilterProps
};
export type UrlFilterProps = { onDate: OnDate };

export const todoRecord = Record({
  id: 0,
  title: '',
  onDate: '',
  isCompleted: false,
  tags: OrderedSet([])
});

export type TodoRecord = Return<typeof todoRecord>;

export const createTodoRecord = (
  todoEntity: $Shape<TodoEntity> = {}
): TodoRecord => {
  const { tags = [], ...todo } = todoEntity;
  const props = Object.assign(
    {},
    {
      id: Math.round(Math.random() * -1000000),
      onDate: new Date().toDateString()
    },
    todo,
    {
      tags: OrderedSet(tags)
    }
  );
  return todoRecord(props);
};

type IsPendingState = OrderedSet<number>;

export const isPendingReducer = (
  state: IsPendingState = OrderedSet(),
  action: Actions
): IsPendingState => {
  switch (action.type) {
    case CREATE_TODO_REQUEST:
    case UPDATE_TODO_REQUEST:
      return state.add(action.todo.id);
    case CREATE_TODO_SUCCESS:
    case UPDATE_TODO_SUCCESS:
      return state.delete(action.prevTodo.id);
    default:
      return state;
  }
};

type IsLoadingByOnDateState = OrderedSet<OnDate>;
export const isLoadingByOnDateReducer = (
  state: IsLoadingByOnDateState = OrderedSet(),
  action: Actions
): IsLoadingByOnDateState => {
  switch (action.type) {
    case LOAD_TODOS_REQUEST:
      return state.add(toDate(action.onDate));
    case LOAD_TODOS_SUCCESS:
      return state.delete(toDate(action.onDate));
    default:
      return state;
  }
};

const mapItemAddId = (key, id) => map =>
  map.update(key, (ids = OrderedSet()) => ids.add(id));
const mapItemDeleteId = (key, id) => map =>
  map.update(key, (ids = OrderedSet()) => ids.delete(id));

type ByOnDateState = Map<OnDate, TodoIds>;

export const byOnDateReducer = (
  state: ByOnDateState = Map(),
  action: Actions
): ByOnDateState => {
  switch (action.type) {
    case CREATE_TODO_REQUEST:
    case UPDATE_TODO_REQUEST:
      return mapItemAddId(toDate(action.todo.onDate), action.todo.id)(state);
    case CREATE_TODO_SUCCESS:
      return state.withMutations(
        compose(
          mapItemAddId(toDate(action.nextTodo.onDate), action.nextTodo.id),
          mapItemDeleteId(toDate(action.prevTodo.onDate), action.prevTodo.id)
        )
      );
    case UPDATE_TODO_SUCCESS:
      const { prevTodo, nextTodo } = action;
      if (toDate(prevTodo.onDate) !== toDate(nextTodo.onDate)) {
        return state.withMutations(
          compose(
            mapItemAddId(toDate(action.nextTodo.onDate), action.nextTodo.id),
            mapItemDeleteId(toDate(action.prevTodo.onDate), action.prevTodo.id)
          )
        );
      }
      return state;
    case LOAD_TODOS_SUCCESS:
      return state.set(toDate(action.onDate), OrderedSet(action.todoIds));
    case DELETE_TODO_REQUEST:
      return mapItemDeleteId(toDate(action.todo.onDate), action.todo.id)(state);
    default:
      return state;
  }
};

const toMapRecords = (response: { [string]: TodoEntity }): Map<string, *> =>
  Map(response).map(value => createTodoRecord(value));

type EntitiesState = Map<string, TodoRecord>;

export const entitiesReducer = (
  state: EntitiesState = Map(),
  action: Actions
): EntitiesState => {
  switch (action.type) {
    case CREATE_TODO_REQUEST:
    case UPDATE_TODO_REQUEST:
      return state.set(
        String(action.todo.id),
        // in request tags is array of names, not id
        createTodoRecord(omit(action.todo, 'tags'))
      );
    case CREATE_TODO_SUCCESS:
    case UPDATE_TODO_SUCCESS:
      const { prevTodo, nextTodo } = action;
      return state.withMutations(map => {
        if (prevTodo.id !== nextTodo.id) {
          map.delete(String(prevTodo.id));
        }
        map.set(String(nextTodo.id), createTodoRecord(nextTodo));
      });
    case LOAD_TODOS_SUCCESS:
      return state.merge(toMapRecords(action.todos));
    case DELETE_TODO_REQUEST:
      return state.delete(String(action.todo.id));
    default:
      return state;
  }
};

type State = {
  isPending: IsPendingState,
  isLoadingByOnDate: IsLoadingByOnDateState,
  byOnDate: ByOnDateState,
  entities: EntitiesState
};

export default combineReducers({
  isPending: isPendingReducer,
  isLoadingByOnDate: isLoadingByOnDateReducer,
  byOnDate: byOnDateReducer,
  entities: entitiesReducer
});

export const getTodoIdsByOnDate = ({
  todo,
  todoFilters
}: {
  todo: State,
  todoFilters: TodoFiltersState
}): TodoIds => todo.byOnDate.get(toDate(todoFilters.onDate), OrderedSet());

export const getIsLoadingByOnDate = (state: State, onDate: string): boolean =>
  state.isLoadingByOnDate.contains(toDate(onDate));

export const getTodoById = ({
  todo,
  id
}: {
  todo: State,
  id: number
}): TodoRecord => todo.entities.get(String(id), createTodoRecord());

export const getIsPending = ({ todo, id }: { todo: State, id: number }) =>
  todo.isPending.includes(id);

const getFilterByIsCompletedSelector = createSelector(
  getTodoById,
  ({ todoFilters }: { todoFilters: TodoFiltersState }) =>
    todoFilters.isCompleted,
  (todo, isCompleted): boolean =>
    isCompleted === 'all' ||
    (isCompleted === 'completed' && todo.isCompleted) ||
    (isCompleted === 'notCompleted' && !todo.isCompleted)
);

const getFilterByTagsSelector = createSelector(
  getTodoById,
  ({ todoFilters }: { todoFilters: TodoFiltersState }) => todoFilters.tags,
  (todo, tags): boolean =>
    tags.size === 0 || tags.some(tag => todo.tags.includes(Number(tag)))
);

export const getIsHiddenSelector = createSelector(
  getFilterByIsCompletedSelector,
  getFilterByTagsSelector,
  (filterByIsCompleted, filterByTags): boolean =>
    !(filterByIsCompleted && filterByTags)
);

export const getFilterCountSelector = createSelector(
  getTodoIdsByOnDate,
  ({ todo }: { todo: State }) => todo,
  ({ todoFilters }: { todoFilters: TodoFiltersState }) => todoFilters,
  (todoIds, todo, todoFilters) =>
    todoIds
      .filter(
        id =>
          getFilterByIsCompletedSelector({ id, todo, todoFilters }) &&
          getFilterByTagsSelector({ id, todo, todoFilters })
      )
      .count()
);
