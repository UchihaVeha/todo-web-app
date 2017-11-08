import React from 'react';
import { shallow } from 'enzyme';
import { OrderedMap } from 'immutable';
import TodoList from './TodoList';

describe('TodoList component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<TodoList todoIds={OrderedMap([])} isLoading={false} />);
  });

  it('should render pure', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render withStyles', () => {
    expect(wrapper.dive()).toMatchSnapshot();
  });

  it('should render component', () => {
    expect(wrapper.dive().dive()).toMatchSnapshot();
  });
});
