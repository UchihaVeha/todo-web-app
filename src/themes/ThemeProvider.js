import React from 'react';
import PropTypes from 'prop-types';

import MuiThemeProviderBefore from 'material-ui-before/styles/MuiThemeProvider';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { cyan, yellow } from 'material-ui/colors';

const theme = createMuiTheme({
  palette: {
    primary: cyan,
    secondary: {
      ...yellow,
      A200: yellow['400']
    }
  }
});

const AppThemeProvider = ({ children }) => (
  <MuiThemeProvider theme={theme}>
    <MuiThemeProviderBefore>{children}</MuiThemeProviderBefore>
  </MuiThemeProvider>
);

AppThemeProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default AppThemeProvider;
