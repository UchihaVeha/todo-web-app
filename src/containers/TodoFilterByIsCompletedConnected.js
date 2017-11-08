// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { setIsCompletedFilter } from 'actions/todoFilters';
import { FilterByIsCompleted } from 'components/TodoFilters';
import type { Dispatch } from 'react-redux';
import type { State } from 'reducers';

const TodoFilterByIsCompletedConnected = props => (
  <FilterByIsCompleted {...props} />
);

const mapStateToProps = ({ todoFilters }: State) => ({
  value: todoFilters.isCompleted
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onChange: value => dispatch(setIsCompletedFilter(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(
  TodoFilterByIsCompletedConnected
);
