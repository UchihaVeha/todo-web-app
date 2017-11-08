import React from 'react';
import { shallow } from 'enzyme';
import AppMenu, { menuItems, AppMenuComponent } from './AppMenu';

describe('AppMenu component', () => {
  const wrapper = (
    { open = false, handleMenuToggle = jest.fn(), classes = {} } = {}
  ) =>
    shallow(
      <AppMenuComponent
        open={open}
        handleMenuToggle={handleMenuToggle}
        classes={classes}
      />
    );

  it('should render component', () => {
    expect(wrapper()).toMatchSnapshot();
  });

  it('should have enhance', () => {
    expect(shallow(<AppMenu />)).toMatchSnapshot();
  });

  it('should have menu items', () => {
    expect(menuItems).toMatchSnapshot();
  });
});
