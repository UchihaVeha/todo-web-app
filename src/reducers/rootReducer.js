// @flow
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import auth from 'modules/authorize/reducers';
import todo from 'modules/todo/reducers';
import tag from 'modules/tag';
import todoFilters from './todoFilters';

const reducers = {
  auth,
  todo,
  tag,
  todoFilters,
  router: routerReducer
};

export type Reducers = typeof reducers;
type $ExtractFunctionReturn = <V>(v: (...args: any) => V) => V;
export type State = $ObjMap<Reducers, $ExtractFunctionReturn>;

export default combineReducers(reducers);
