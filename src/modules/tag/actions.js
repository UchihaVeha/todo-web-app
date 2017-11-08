// @flow
import type { Tag } from './reducers';

export const SET_TAGS_BY_DATE = 'tag/SET_TAGS_BY_DATE';

export type Actions = {|
  type: 'tag/SET_TAGS_BY_DATE',
  payload: { tags: { [id: number]: Tag }, date: string }
|};

export const setTagsByDate = (
  tags: { [id: number]: Tag },
  date: string
): Actions => ({
  type: SET_TAGS_BY_DATE,
  payload: {
    tags,
    date
  }
});
