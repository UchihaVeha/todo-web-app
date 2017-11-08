// @flow
import * as React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import Root from 'containers/RootConnected';
import { PersistGate } from 'redux-persist/es/integration/react';
import AppThemeProvider from 'themes/ThemeProvider';
import AppLoading from 'components/AppLoading';
import type { State } from 'reducers';

type Props = {
  store: State,
  history: Object,
  persistor: Object
};

export default ({ store, history, persistor }: Props) => (
  <Provider store={store}>
    <AppThemeProvider>
      <PersistGate loading={<AppLoading />} persistor={persistor}>
        <ConnectedRouter history={history}>
          <Root />
        </ConnectedRouter>
      </PersistGate>
    </AppThemeProvider>
  </Provider>
);
