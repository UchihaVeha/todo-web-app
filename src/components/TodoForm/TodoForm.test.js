import React from 'react';
import { shallow } from 'enzyme';
import ThemeProvider from 'themes/ThemeProvider';
import { TodoFormComponent } from './TodoForm';

describe('TodoForm component', () => {
  let wrapper;
  const todo = {
    id: 0,
    title: 'test',
    onDate: '2017-10-31T22:00:00.000Z',
    isCompleted: false,
    tags: []
  };

  beforeEach(() => {
    wrapper = shallow(
      <ThemeProvider>
        <TodoFormComponent todo={todo} classes={{}} />
      </ThemeProvider>
    )
      .dive()
      .dive()
      .dive()
      .dive();
  });

  it('should render component', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
