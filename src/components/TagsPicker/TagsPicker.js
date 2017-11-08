// @flow
import * as React from 'react';
import { withStyles } from 'material-ui/styles';
import { Chip } from 'material-ui';
import { FormControl, FormHelperText, FormLabel } from 'material-ui/Form';

const styles = theme => ({
  chip: {
    marginRight: theme.spacing.unit,
    marginTop: theme.spacing.unit
  },
  wrapper: {
    width: '100%',
    display: 'flex',
    flexFlow: 'row wrap'
  },
  inputWrapper: {
    flexGrow: 1,
    marginTop: theme.spacing.unit * 2
  },
  input: {
    border: 0,
    width: '100%',
    height: 30,
    '&::-webkit-input-placeholder': {
      color: 'rgba(0, 0, 0, 0.3)'
    },
    '&:focus': {
      outline: 'none'
    }
  }
});

type Props = {
  tags: string[],
  error: ?string,
  onRemoveTag: (name: string) => void,
  onAddTag: (name: string) => void,
  classes: Return<typeof styles>
};

class TagsPicker extends React.Component<Props> {
  static defaultProps = {
    error: null
  };

  input: ?HTMLInputElement;

  handleBlur = ({ target }: SyntheticInputEvent<>) => {
    if (target.value !== '') {
      this.props.onAddTag(target.value);
      if (this.input) this.input.value = '';
    }
  };

  handleKeyPress = (event: SyntheticInputEvent<>): void => {
    if (
      (event.charCode === 13 || event.charCode === 32) &&
      event.target.value !== ''
    ) {
      this.props.onAddTag(event.target.value);
      if (this.input) this.input.value = '';
    }
  };

  render() {
    const { tags, classes, error } = this.props;
    return (
      <FormControl fullWidth margin="dense" error={!!error}>
        <FormLabel>Tags</FormLabel>
        <div className={classes.wrapper}>
          {tags.map(tag => (
            <Chip
              label={tag}
              className={classes.chip}
              key={tag}
              onRequestDelete={() => this.props.onRemoveTag(tag)}
            />
          ))}
          <div className={classes.inputWrapper}>
            <input
              ref={input => {
                this.input = input;
              }}
              className={classes.input}
              placeholder="Add Tag"
              onKeyPress={this.handleKeyPress}
              onBlur={this.handleBlur}
            />
          </div>
        </div>
        <FormHelperText>{error}</FormHelperText>
      </FormControl>
    );
  }
}

export default withStyles(styles, { name: 'TagsPicker' })(TagsPicker);
