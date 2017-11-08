// @flow
import * as React from 'react';
import { withStyles } from 'material-ui/styles';
import { MenuItem } from 'material-ui/Menu';
import { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import { Select } from 'material-ui';
import type { TagIds, Tags } from 'modules/tag';

const styles = theme => ({
  select: {
    width: '100% !important',
    '& button': {
      fill: `${theme.palette.common.darkWhite} !important`
    },
    '& hr': {
      borderBottom: `1px solid ${theme.palette.common.darkWhite} !important`
    },
    '& div': {
      color: `${theme.palette.common.darkWhite} !important`
    }
  },
  formControl: {
    width: '100%'
  }
});

type Props = {
  tags: Tags,
  value: TagIds,
  onChange: (tags: number[]) => void,
  classes: Return<typeof styles>
};
class FilterByTags extends React.Component<Props> {
  handleChange = (e: SyntheticEvent<{ value: any[] }>): void => {
    this.props.onChange(e.target.value);
  };

  render() {
    const { classes, value, tags } = this.props;
    return (
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="age-simple">Tags</InputLabel>
        <Select
          multiple
          displayEmpty
          value={value.toArray()}
          onChange={this.handleChange}
          className={classes.select}
        >
          {tags
            .map(tag => (
              <MenuItem key={tag.id} value={tag.id}>
                {tag.name}
              </MenuItem>
            ))
            .toArray()}
        </Select>
      </FormControl>
    );
  }
}

export default withStyles(styles, { name: 'FilterByTags' })(FilterByTags);
