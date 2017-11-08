// @flow
import React from 'react';
import { connect } from 'react-redux';
import { setDateFilter } from 'actions/todoFilters';
import { FilterByDate } from 'components/TodoFilters';
import type { State } from 'reducers';
import type { Dispatch } from 'react-redux';

const TodoFilterByDateConnected = props => <FilterByDate {...props} />;

const mapStateToProps = ({ todoFilters }: State) => ({
  value: todoFilters.onDate
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onChange: value => dispatch(setDateFilter(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(
  TodoFilterByDateConnected
);
