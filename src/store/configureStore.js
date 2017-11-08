import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware, { END } from 'redux-saga';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/es/storage';
import rootReducer from 'reducers/rootReducer';
import SagaManager from 'sagas/SagaManager';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth']
};

export default initialState => {
  const history = createHistory();
  const reducer = persistReducer(persistConfig, rootReducer);
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [
    createLogger({ duration: true }),
    sagaMiddleware,
    routerMiddleware(history)
  ];
  const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middlewares))
  );
  const persistor = persistStore(store);
  store.close = () => store.dispatch(END);
  SagaManager.startSagas(sagaMiddleware);
  if (module.hot) {
    module.hot.accept('reducers/rootReducer', () => {
      store.replaceReducer(rootReducer);
    });

    module.hot.accept('sagas/SagaManager', () => {
      SagaManager.cancelSagas(store);
      SagaManager.startSagas(sagaMiddleware);
    });
  }
  return { history, store, persistor };
};
