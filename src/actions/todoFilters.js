// @flow
import type { isCompletedFilterProps } from 'modules/todo';
import type { TagIds } from 'modules/tag';

export const SET_DATE_FILTER = 'SET_DATE_FILTER';
export const SET_TAGS_FILTER = 'SET_TAGS_FILTER';
export const SET_IS_COMPLETED_FILTER = 'SET_IS_COMPLETED_FILTER';

export type Actions =
  | {| type: 'SET_DATE_FILTER', value: string |}
  | {| type: 'SET_TAGS_FILTER', values: TagIds |}
  | {| type: 'SET_IS_COMPLETED_FILTER', value: isCompletedFilterProps |};

export const setDateFilter = (value: string): Actions => ({
  type: SET_DATE_FILTER,
  value
});

export const setTagsFilter = (values: TagIds): Actions => ({
  type: SET_TAGS_FILTER,
  values
});

export const setIsCompletedFilter = (
  value: isCompletedFilterProps
): Actions => ({
  type: SET_IS_COMPLETED_FILTER,
  value
});
