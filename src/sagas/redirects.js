import { put, takeEvery } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { CREATE_TODO_REQUEST } from '../modules/todo/actions';

function* redirectAfterTodoCreated() {
  yield put(push('/'));
}

function* watchRedirects() {
  yield takeEvery(CREATE_TODO_REQUEST, redirectAfterTodoCreated);
}

export default watchRedirects;
