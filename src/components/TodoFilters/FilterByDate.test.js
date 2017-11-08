import React from 'react';
import { shallow, mount } from 'enzyme';
import { IconButton } from 'material-ui';
import ThemeProvider from 'themes/ThemeProvider';
import FilterByDate from './FilterByDate';

describe('TodoFilters/FilterByDate component', () => {
  let wrapper;
  const date = '2017-10-28T21:00:00.000Z';
  const prevDay = 'Sat Oct 28 2017';
  const nextDay = 'Mon Oct 30 2017';

  it('should render withStyles', () => {
    wrapper = shallow(<FilterByDate value={date} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render component', () => {
    wrapper = shallow(<FilterByDate value={date} />);
    expect(wrapper.dive()).toMatchSnapshot();
  });

  it('should handle next day', () => {
    const onChange = jest.fn();
    wrapper = mount(
      <ThemeProvider>
        <FilterByDate value={date} onChange={onChange} />
      </ThemeProvider>
    );
    wrapper
      .find(IconButton)
      .at(1)
      .simulate('click', {});
    expect(onChange).toHaveBeenCalledWith(nextDay);
  });

  it('should handle prev day', () => {
    const onChange = jest.fn();
    wrapper = mount(
      <ThemeProvider>
        <FilterByDate value={date} onChange={onChange} />
      </ThemeProvider>
    );
    wrapper
      .find(IconButton)
      .at(0)
      .simulate('click', {});
    expect(onChange).toHaveBeenCalledWith(prevDay);
  });
});
