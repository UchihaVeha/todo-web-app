import jss from 'jss';
import normalize from 'normalize-jss';
import 'typeface-roboto';
import configureJSS from './configureJSS';

configureJSS();

const globalStyles = {
  '@global': {
    body: {},
    '#root': {
      /*  '& > div': {
        display: 'flex',
        minHeight: '100vh',
        flexDirection: 'column'
      }
      */
    },
    'input:-webkit-autofill': {
      '-webkit-box-shadow': '0 0 0px 1000px white inset'
    }
  }
};

const attachGlobalStyles = () => {
  jss.createStyleSheet(normalize).attach();
  jss.createStyleSheet(globalStyles).attach();
};

attachGlobalStyles();
