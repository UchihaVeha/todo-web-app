import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import TodoListItem from './TodoListItem';

describe('TodoList/TodoListItem component', () => {
  let wrapper;
  const todo = {
    id: 0,
    title: 'test',
    onDate: new Date().toDateString(),
    isCompleted: false,
    tags: []
  };

  beforeEach(() => {
    wrapper = mount(
      <MemoryRouter initialEntries={['/']}>
        <TodoListItem todo={todo} tagNames={[]} />
      </MemoryRouter>
    );
  });

  it('should render component', () => {
    expect(wrapper.find('ListItem')).toMatchSnapshot();
  });
});
