import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { OrderedSet } from 'immutable';
import { MemoryRouter } from 'react-router-dom';
import TodoList from './TodoList';
import TodoListItem from './TodoListItem';

storiesOf('Todo List Item', module)
  .addDecorator(story => (
    <div style={{ padding: 30, maxWidth: 900 }}>
      <MemoryRouter>{story()}</MemoryRouter>
    </div>
  ))
  .add('is not completed', () => (
    <TodoListItem
      todo={{
        id: 1,
        title: 'Todo',
        isCompleted: false
      }}
      tagNames={[]}
      isHidden={false}
      isPending={false}
      onToggleIsCompleted={action('on click')}
      onDeleteTodo={action('delete click')}
    />
  ))
  .add('is completed', () => (
    <TodoListItem
      todo={{
        id: 1,
        title: 'Todo',
        isCompleted: true
      }}
      tagNames={[]}
      isHidden={false}
      isPending={false}
      onToggleIsCompleted={action('on click')}
      onDeleteTodo={action('delete click')}
    />
  ))
  .add('with tags', () => (
    <TodoListItem
      todo={{
        id: 1,
        title: 'Todo',
        isCompleted: false
      }}
      tagNames={['React', 'Angular']}
      isHidden={false}
      isPending={false}
      onToggleIsCompleted={action('on click')}
      onDeleteTodo={action('delete click')}
    />
  ))
  .add('is pending', () => (
    <TodoListItem
      todo={{
        id: 1,
        title: 'Todo',
        isCompleted: false
      }}
      tagNames={['React', 'Angular']}
      isHidden={false}
      isPending
      onToggleIsCompleted={action('on click')}
      onDeleteTodo={action('delete click')}
    />
  ));

storiesOf('Todo List', module)
  .addDecorator(story => (
    <div style={{ padding: 30, maxWidth: 600 }}>
      <MemoryRouter>{story()}</MemoryRouter>
    </div>
  ))
  .add('default', () => (
    <TodoList
      todoIds={OrderedSet([1, 2])}
      isLoading={false}
      listItem={() => (
        <TodoListItem
          todo={{
            id: 1,
            title: 'Todo',
            isCompleted: false
          }}
          tagNames={[]}
          isHidden={false}
          isPending={false}
          onToggleIsCompleted={action('on click')}
          onDeleteTodo={action('delete click')}
        />
      )}
    />
  ))
  .add('is loading', () => <TodoList todoIds={OrderedSet([])} isLoading />)
  .add('empty', () => <TodoList todoIds={OrderedSet([])} isLoading={false} />);
