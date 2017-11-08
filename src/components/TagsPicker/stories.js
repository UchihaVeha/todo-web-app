import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import ThemeProvider from 'themes/ThemeProvider';
import TagsPicker from './TagsPicker';

const tags = ['JQuery', 'Backbone', 'Marionette', 'Angular', 'React'];

storiesOf('TagsPicker', module)
  .addDecorator(story => (
    <div style={{ padding: 30, maxWidth: 600 }}>
      <ThemeProvider>{story()}</ThemeProvider>
    </div>
  ))
  .add('empty', () => (
    <TagsPicker
      tags={[]}
      onAddTag={action('ADD TAG')}
      onRemoveTag={action('REMOVE TAG')}
    />
  ))
  .add('with items', () => (
    <TagsPicker
      tags={tags}
      onAddTag={action('ADD TAG')}
      onRemoveTag={action('REMOVE TAG')}
    />
  ));
