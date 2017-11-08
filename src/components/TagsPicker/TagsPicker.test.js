import React from 'react';
import { shallow, mount } from 'enzyme';
import { FormHelperText, SvgIcon } from 'material-ui';
import TagsPicker from './TagsPicker';

describe('TagsPicker component', () => {
  let wrapper;

  beforeEach(() => {
    const tags = ['test tag'];
    wrapper = shallow(<TagsPicker tags={tags} />);
  });

  it('should render withStyles', () => {
    expect(wrapper.dive()).toMatchSnapshot();
  });

  it('should render component', () => {
    expect(wrapper.dive().dive()).toMatchSnapshot();
  });

  it('should call onAddTag on key press', () => {
    const value = 'test value';
    const onAddTag = jest.fn();
    const input = shallow(<TagsPicker tags={[]} onAddTag={onAddTag} />)
      .dive()
      .find('input');
    input.simulate('keyPress', { charCode: 13, target: { value: '' } });
    expect(onAddTag).not.toHaveBeenCalled();
    input.simulate('keyPress', { charCode: 32, target: { value: '' } });
    expect(onAddTag).not.toHaveBeenCalled();
    input.simulate('keyPress', { charCode: 13, target: { value } });
    expect(onAddTag).toHaveBeenCalledWith(value);
    input.simulate('keyPress', { charCode: 32, target: { value } });
    expect(onAddTag).toHaveBeenCalledWith(value);
  });

  it('should call onAddTag on blur', () => {
    const onAddTag = jest.fn();
    const value = 'test value';
    wrapper = shallow(<TagsPicker tags={[]} onAddTag={onAddTag} />).dive();
    wrapper.find('input').simulate('blur', { target: { value: '' } });
    expect(onAddTag).not.toHaveBeenCalled();
    wrapper.find('input').simulate('blur', { target: { value } });
    expect(onAddTag).toHaveBeenCalledWith(value);
  });

  it('should call onRemoveTag', () => {
    const onRemoveTag = jest.fn();
    const tag = 'Test Tag';
    wrapper = mount(<TagsPicker tags={[tag]} onRemoveTag={onRemoveTag} />);
    wrapper.find(SvgIcon).simulate('click');
    expect(onRemoveTag).toHaveBeenCalledWith(tag);
  });

  it('should render error', () => {
    const error = 'test error';
    wrapper = shallow(<TagsPicker tags={[]} error={error} />).dive();
    expect(wrapper.dive().find(FormHelperText)).toHaveProp('children', error);
  });
});
