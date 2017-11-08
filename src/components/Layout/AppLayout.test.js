import React from 'react';
import { shallow } from 'enzyme';
import AppLayout, { AppLayoutComponent } from './AppLayout';

describe('Layout/AppLayout component', () => {
  const wrapper = (
    {
      open = false,
      handleMenuToggle = jest.fn(),
      appBar = () => <div>appBar</div>,
      content = () => <div>content</div>,
      classes = {}
    } = {}
  ) =>
    shallow(
      <AppLayoutComponent
        appBar={appBar}
        content={content}
        open={open}
        handleMenuToggle={handleMenuToggle}
        classes={classes}
      />
    );

  it('should render component', () => {
    expect(wrapper()).toMatchSnapshot();
  });

  it('should render with enhances', () => {
    expect(
      shallow(
        <AppLayout
          appBar={() => <div>appBar</div>}
          content={() => <div>content</div>}
        />
      )
    ).toMatchSnapshot();
  });
});
