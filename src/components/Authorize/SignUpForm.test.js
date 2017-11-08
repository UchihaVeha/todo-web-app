import React from 'react';
import { shallow } from 'enzyme';
import SignUpForm from './SignUpForm';

describe('Authorize/SignUpForm component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<SignUpForm />).dive();
  });

  it('should render a wrapper element', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have initial state', () => {
    expect(wrapper.state()).toEqual({
      values: {
        email: '',
        password: ''
      },
      errors: {
        email: null,
        password: null
      }
    });
  });

  it('should update state when got new prop error', () => {
    const message = 'test error';
    wrapper.setProps({ error: message });
    expect(wrapper).toHaveState('errors', { email: message, password: null });
  });

  it('should display new values and errors', () => {
    const newState = {
      values: {
        email: 'email',
        password: 'password'
      },
      errors: {
        email: 'email error',
        password: 'password error'
      }
    };
    wrapper.setState(newState);
    const emailInput = wrapper.find('TextField').at(0);
    const passwordInput = wrapper.find('TextField').at(1);
    expect(emailInput).toHaveProp('value', newState.values.email);
    expect(emailInput).toHaveProp('error', true);
    expect(emailInput).toHaveProp('helperText', newState.errors.email);
    expect(passwordInput).toHaveProp('value', newState.values.password);
    expect(passwordInput).toHaveProp('error', true);
    expect(passwordInput).toHaveProp('helperText', newState.errors.password);
  });

  it('should call handleChange', () => {
    const instance = wrapper.instance();
    const spy = jest.spyOn(instance, 'handleChange');
    instance.forceUpdate();
    wrapper.update();
    wrapper
      .find('TextField')
      .at(0)
      .simulate('change', { target: { type: 'email' } });
    expect(spy).toHaveBeenCalledTimes(1);
    wrapper
      .find('TextField')
      .at(1)
      .simulate('change', { target: { type: 'password' } });
    expect(spy).toHaveBeenCalledTimes(2);
  });

  it('should call handleBlur', () => {
    const instance = wrapper.instance();
    const spy = jest.spyOn(instance, 'handleBlur');
    instance.forceUpdate();
    wrapper.update();
    wrapper
      .find('TextField')
      .at(0)
      .simulate('blur', { currentTarget: { name: 'password' } });
    expect(spy).toHaveBeenCalledTimes(1);
    wrapper
      .find('TextField')
      .at(1)
      .simulate('blur', { currentTarget: { name: 'password' } });
    expect(spy).toHaveBeenCalledTimes(2);
  });

  it('should render CircularProgress', () => {
    expect(wrapper.find('withStyles(Button)')).toBePresent();
    wrapper.setProps({ isFetching: true });
    expect(wrapper.find('withStyles(Button)')).not.toBePresent();
    expect(wrapper.find('withStyles(CircularProgress)')).toBePresent();
  });

  it('should render Redirect', () => {
    expect(wrapper.find('Redirect')).not.toBePresent();
    wrapper.setProps({ isAuthorized: true });
    expect(wrapper.find('Redirect')).toBePresent();
  });

  it('should call authorize', () => {
    const authorize = jest.fn();
    const state = {
      values: {
        email: 'testemail@gmail.com',
        password: 'password'
      },
      errors: {
        email: null,
        password: null
      }
    };
    wrapper = shallow(<SignUpForm authorize={authorize} />).dive();
    wrapper.setState(state);
    wrapper.find('withStyles(Button)').simulate('click');
    expect(authorize).toBeCalledWith(state.values);
  });
});
