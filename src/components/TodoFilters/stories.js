import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { AppBar } from 'material-ui';
import { List } from 'immutable';
import ThemeProvider from 'themes/ThemeProvider';
import FilterByDate from './FilterByDate';
import FilterByTags from './FilterByTags';

const tags = List([{ id: 0, name: 'React' }, { id: 1, name: 'Angular' }]);
const value = List([1]);

storiesOf('Todo Filters', module)
  .addDecorator(story => (
    <ThemeProvider>
      <AppBar position="static" style={{ maxWidth: '900px', padding: '30px' }}>
        {story()}
      </AppBar>
    </ThemeProvider>
  ))
  .add('FilterByDate - default', () => (
    <FilterByDate
      onChange={action('date changed')}
      value={new Date().toISOString()}
    />
  ))
  .add('FilterByTags - default', () => (
    <FilterByTags
      onChange={action('tags changed')}
      tags={tags}
      value={List()}
    />
  ))
  .add('FilterByTags - selected', () => (
    <FilterByTags onChange={action('tags changed')} tags={tags} value={value} />
  ));
