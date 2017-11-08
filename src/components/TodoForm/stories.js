import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { MemoryRouter } from 'react-router-dom';
import ThemeProvider from 'themes/ThemeProvider';
import TodoForm from './TodoForm';

storiesOf('Todo Form', module)
  .addDecorator(story => (
    <div style={{ padding: 30, maxWidth: 900 }}>
      <MemoryRouter>
        <ThemeProvider>{story()}</ThemeProvider>
      </MemoryRouter>
    </div>
  ))
  .add('TodoForm - create todo', () => (
    <TodoForm
      todo={{
        id: -1,
        title: '',
        isCompleted: false,
        onDate: new Date().toDateString(),
        tags: []
      }}
      onSubmit={action('submit')}
    />
  ))
  .add('TodoForm - update todo', () => (
    <TodoForm
      todo={{
        id: 1,
        title: 'Update Todo',
        isCompleted: true,
        onDate: new Date().toDateString(),
        tags: ['JQuery', 'Backbone', 'Angular', 'React']
      }}
      onSubmit={action('submit')}
    />
  ));
