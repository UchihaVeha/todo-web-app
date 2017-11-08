// @flow
import { put, call, select, takeEvery } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux/reducer';
import { SET_DATE_FILTER } from 'actions/todoFilters';
import { loadTodos } from 'modules/todo/actions';
import { toDate } from 'utils';
import type { State } from 'reducers/rootReducer';
import type { IOEffect } from 'redux-saga/es/effects';
import { getIsAuthorized } from 'modules/authorize/reducers';

function* preloadTodos(): Generator<IOEffect, *, *> {
  const { todoFilters: { onDate }, todo: { byOnDate } }: State = yield select();
  if (!byOnDate.has(toDate(onDate))) {
    yield put(loadTodos(onDate));
  }
}

function* preloadOnChangeLocation({ payload }): Generator<IOEffect, *, *> {
  const isAuthorized = yield select(getIsAuthorized);
  if (isAuthorized && payload.pathname === '/') {
    yield call(preloadTodos);
  }
}

function* watchPreload(): Generator<IOEffect, *, *> {
  yield takeEvery(LOCATION_CHANGE, preloadOnChangeLocation);
  yield takeEvery(SET_DATE_FILTER, preloadTodos);
}

export default watchPreload;
