import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import configureStore from 'store/configureStore';
import 'themes/globalStyles';
import App from './App';

export const { store, history, persistor } = configureStore();
const rootElement = document.getElementById('root');

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component store={store} history={history} persistor={persistor} />
    </AppContainer>,
    rootElement
  );
};

if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('./App', () => setTimeout(render(App)));
}

render(App);
