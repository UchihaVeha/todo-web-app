// @flow
import React from 'react';
import { pick } from 'lodash';
import { pure, compose, withHandlers } from 'recompose';
import Radio, { RadioGroup } from 'material-ui/Radio';
import { FormControlLabel } from 'material-ui/Form';
import { withStyles } from 'material-ui/styles';
import type { isCompletedFilterProps } from 'modules/todo/reducers';

const styles = (theme: Object) => ({
  root: {
    marginBottom: 18
  },
  label: {
    color: theme.palette.common.darkWhite
  },
  checked: {
    color: theme.palette.secondary.A200
  }
});

type Props = {
  value: isCompletedFilterProps,
  onChangeHandler: () => void,
  classes: Object
};

export const FilterByIsCompletedComponent = ({
  value,
  onChangeHandler,
  classes
}: Props) => (
  <RadioGroup
    row
    value={value}
    className={classes.root}
    onChange={onChangeHandler}
  >
    <FormControlLabel
      value="all"
      control={
        <Radio className={classes.label} checkedClassName={classes.checked} />
      }
      label="All"
      classes={pick(classes, 'label')}
    />
    <FormControlLabel
      value="completed"
      control={
        <Radio className={classes.label} checkedClassName={classes.checked} />
      }
      label="Completed"
      classes={pick(classes, 'label')}
    />
    <FormControlLabel
      value="notCompleted"
      control={
        <Radio className={classes.label} checkedClassName={classes.checked} />
      }
      label="Not completed"
      classes={pick(classes, 'label')}
    />
  </RadioGroup>
);

export default compose(
  pure,
  withHandlers({
    onChangeHandler: props => (e, value) => {
      props.onChange(value);
    }
  }),
  withStyles(styles, { name: 'FilterByIsCompleted' })
)(FilterByIsCompletedComponent);
