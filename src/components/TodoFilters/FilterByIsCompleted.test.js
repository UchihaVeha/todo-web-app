import React from 'react';
import { shallow } from 'enzyme';
import FilterByIsCompleted from './FilterByIsCompleted';

describe('TodoFilters/FilterByIsCompleted component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<FilterByIsCompleted />);
  });

  it('should render pure', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render withHandlers', () => {
    expect(wrapper.dive()).toMatchSnapshot();
  });

  it('should render withStyles', () => {
    expect(wrapper.dive().dive()).toMatchSnapshot();
  });

  it('should render component', () => {
    expect(
      wrapper
        .dive()
        .dive()
        .dive()
    ).toMatchSnapshot();
  });
});
