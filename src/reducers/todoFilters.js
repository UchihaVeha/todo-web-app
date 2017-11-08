// @flow
import { Set } from 'immutable';
import {
  SET_DATE_FILTER,
  SET_TAGS_FILTER,
  SET_IS_COMPLETED_FILTER
} from 'actions/todoFilters';
import type { Actions } from 'actions/todoFilters';
import type { FilterProps } from 'modules/todo/reducers';

export type State = FilterProps;

const initialState: State = {
  onDate: new Date().toDateString(),
  tags: Set(),
  isCompleted: 'all'
};

export default (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case SET_DATE_FILTER:
      return {
        ...initialState,
        onDate: action.value
      };
    case SET_TAGS_FILTER:
      return {
        ...state,
        tags: Set(action.values)
      };
    case SET_IS_COMPLETED_FILTER:
      return {
        ...state,
        isCompleted: action.value
      };
    default:
      return state;
  }
};
