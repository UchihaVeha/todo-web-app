// @flow
import { Set, Map, Record, fromJS } from 'immutable';
import {
  CREATE_TODO_SUCCESS,
  UPDATE_TODO_SUCCESS,
  LOAD_TODOS_SUCCESS
} from 'modules/todo/actions';
import type { Actions } from 'modules/todo/actions';
import { toDate } from 'utils';
import type { OnDate } from 'modules/todo';

export type Tag = {
  id: number,
  name: string
};
export type Tags = Set<Tag>;
export type TagIds = Set<string>;

export type State = {
  byOnDate: Map<OnDate, TagIds>,
  entities: Map<string, *>
};

export const TagRecord = Record({
  id: 0,
  name: ''
});

const getNewTag = () =>
  TagRecord({
    id: Math.round(Math.random() * -1000000)
  });

const initialState: State = {
  byOnDate: Map(),
  entities: Map()
};

const toMapRecords = (tags: { [number]: Tag }): Map<string, *> =>
  // $FlowFixMe: fromJs return mixed type
  fromJS(tags, (key, value) => {
    if (key === '') {
      return value.toMap();
    }
    return TagRecord(value);
  });

export default (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case CREATE_TODO_SUCCESS:
    case UPDATE_TODO_SUCCESS:
      const { prevTodo, nextTodo, tags } = action;
      return {
        byOnDate: state.byOnDate.withMutations(map =>
          map
            .delete(toDate(prevTodo.onDate))
            .set(toDate(nextTodo.onDate), Set(Object.keys(tags)))
        ),
        entities: state.entities.merge(toMapRecords(action.tags))
      };
    case LOAD_TODOS_SUCCESS:
      return {
        byOnDate: state.byOnDate.set(
          toDate(action.onDate),
          Set(Object.keys(action.tags))
        ),
        entities: state.entities.merge(toMapRecords(action.tags))
      };
    default:
      return state;
  }
};

export const getTagNamesByIds = (state: State, ids: Set<number>): Set<string> =>
  ids.map(id => state.entities.get(String(id), getNewTag()).name);

export const getTagsByDate = (state: State, date: string): Tags =>
  state.byOnDate
    .get(toDate(date), Set())
    .map(id => state.entities.get(String(id), getNewTag()));
