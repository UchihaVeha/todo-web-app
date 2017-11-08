import { fork } from 'redux-saga/effects';
import auth from 'modules/authorize/sagas';
import todo from 'modules/todo/sagas';
import redirects from './redirects';
import preloads from './preloads';

export default function*() {
  yield [fork(auth), fork(todo), fork(redirects), fork(preloads)];
}
