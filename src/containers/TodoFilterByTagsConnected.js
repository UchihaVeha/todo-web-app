// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { setTagsFilter } from 'actions/todoFilters';
import { FilterByTags } from 'components/TodoFilters';
import { getTagsByDate } from 'modules/tag/reducers';
import type { Dispatch } from 'react-redux';
import type { State } from 'reducers';

const TodoFilterByTagsConnected = props => <FilterByTags {...props} />;

const mapStateToProps = ({ todoFilters, tag }: State) => ({
  value: todoFilters.tags,
  tags: getTagsByDate(tag, todoFilters.onDate)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onChange: values => dispatch(setTagsFilter(values))
});

export default connect(mapStateToProps, mapDispatchToProps)(
  TodoFilterByTagsConnected
);
