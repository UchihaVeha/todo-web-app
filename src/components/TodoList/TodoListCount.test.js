import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import TodoListCount from './TodoListCount';

describe('TodoList/TodoListCount component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <MemoryRouter>
        <TodoListCount count={0} />
      </MemoryRouter>
    );
  });

  it('should render pure', () => {
    expect(wrapper.find('Paper')).toMatchSnapshot();
  });
});
