import React from 'react';
import { shallow } from 'enzyme';
import { List } from 'immutable';
import FilterByTags from './FilterByTags';

describe('TodoFilters/FilterByTags component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<FilterByTags tags={List([])} value={List()} />);
  });

  it('should render withStyles', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render component', () => {
    expect(wrapper.dive()).toMatchSnapshot();
  });
});
