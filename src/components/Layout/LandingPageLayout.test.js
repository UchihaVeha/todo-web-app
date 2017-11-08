import React from 'react';
import { shallow } from 'enzyme';
import LandingPageLayout from './LandingPageLayout';

describe('Layout/LandingPageLayout component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <LandingPageLayout>
        <span>Content</span>
      </LandingPageLayout>
    );
  });

  it('should render withStyles', () => {
    expect(wrapper.dive()).toMatchSnapshot();
  });

  it('should render component', () => {
    expect(wrapper.dive().dive()).toMatchSnapshot();
  });
});
