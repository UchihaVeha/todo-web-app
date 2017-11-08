import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import ThemeProvider from 'themes/ThemeProvider';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

storiesOf('Authorize/SignInForm', module)
  .addDecorator(story => (
    <div style={{ padding: 30, textAlign: 'center' }}>
      <ThemeProvider>{story()}</ThemeProvider>
    </div>
  ))
  .add('SignInForm default', () => (
    <SignInForm
      isAuthorized={false}
      error={null}
      isFetching={false}
      authorize={action('authorize')}
    />
  ))
  .add('SignInForm fetching', () => (
    <SignInForm
      isAuthorized={false}
      error={null}
      isFetching
      authorize={action('authorize')}
    />
  ));

storiesOf('Authorize/SignUpForm', module)
  .addDecorator(story => (
    <div style={{ padding: 30, textAlign: 'center' }}>
      <ThemeProvider>{story()}</ThemeProvider>
    </div>
  ))
  .add('SignUpForm default', () => (
    <SignUpForm
      isAuthorized={false}
      error={null}
      isFetching={false}
      authorize={action('authorize')}
    />
  ))
  .add('SignUpForm fetching', () => (
    <SignUpForm
      isAuthorized={false}
      error={null}
      isFetching
      authorize={action('authorize')}
    />
  ));
