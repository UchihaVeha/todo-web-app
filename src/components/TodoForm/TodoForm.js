// @flow
import * as React from 'react';
import { compose } from 'recompose';
import { withRouter } from 'react-router';
import {
  Button,
  TextField,
  Checkbox,
  FormControl,
  FormControlLabel,
  Paper
} from 'material-ui';
import { withStyles } from 'material-ui/styles';
import DatePicker from 'material-ui-before/DatePicker/index';
import Joi from 'joi-browser';
import TagsPicker from 'components/TagsPicker';
import validate from 'utils/validate';
import type { TodoUpsert } from 'modules/todo/reducers';

const styles = (theme: *) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing.unit * 2,
    background: 'white',
    [theme.breakpoints.down('md')]: {
      flexGrow: 1
    }
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between'
  }
});

const tagSchema = Joi.string()
  .min(2)
  .max(50)
  .trim()
  .label('tags');

const scheme = {
  title: Joi.string()
    .min(6)
    .max(100)
    .required(),
  tags: Joi.array()
    .items(tagSchema)
    .max(20)
    .unique()
};

type validationErrors = $ObjMap<typeof scheme, (f: () => any) => string | null>;
type Props = {
  todo: TodoUpsert,
  onSubmit: TodoUpsert => void,
  history: Object,
  classes: Return<typeof styles>
};
type State = {
  values: TodoUpsert,
  errors: validationErrors
};

export class TodoFormComponent extends React.Component<Props, State> {
  state = {
    values: this.props.todo,
    errors: {
      title: null,
      tags: null
    }
  };

  updateState({ values = {}, errors = {} }: { values?: *, errors?: * }) {
    this.setState({
      values: { ...this.state.values, ...values },
      errors: { ...this.state.errors, ...errors }
    });
  }

  handleSubmit = (): void => {
    const { isValid, errors } = validate(this.state.values, scheme);
    if (isValid) {
      this.props.onSubmit(this.state.values);
    } else {
      this.updateState({ errors });
    }
  };

  handleChange = (
    e: SyntheticInputEvent<> | null,
    value: string | null
  ): void => {
    if (e && e.target.type === 'text') {
      this.updateOneAttr(e.target.name, e.target.value);
    } else if (e && e.target.type === 'checkbox') {
      this.updateOneAttr(e.target.name, e.target.checked);
      // TODO update this after migrate date picker to next version
    } else if (value) {
      this.updateOneAttr('onDate', value);
    }
  };

  updateOneAttr = (attr: string, value: *): void => {
    const values = { [attr]: value };
    if (this.state.errors[attr] !== null) {
      const { errors } = validate(values, scheme);
      this.updateState({ values, errors: { [attr]: errors[attr] } });
    } else {
      this.updateState({ values });
    }
  };

  handleBlur = ({ target }: SyntheticInputEvent<>) => {
    const { errors } = validate(this.state.values, scheme);
    this.updateState({ errors: { [target.name]: errors[target.name] } });
  };

  handleAddTag = (tag: string): void => {
    const tags = [...this.state.values.tags, tag.replace(/\W+[-]+/g, '')];
    const { errors } = validate({ tags }, scheme);
    if (errors.tags) {
      this.updateState({ errors: { tags: errors.tags } });
    } else {
      this.updateState({
        values: { tags },
        errors: { tags: null }
      });
    }
  };

  handleRemoveTag = (name: string): void => {
    const { values } = this.state;
    this.updateState({
      values: { tags: values.tags.filter(tagName => tagName !== name) },
      errors: { tags: null }
    });
  };

  render() {
    const { id, title, onDate, isCompleted, tags } = this.state.values;
    const { errors } = this.state;
    const { classes } = this.props;
    return (
      <Paper className={classes.root}>
        <TextField
          label="Title"
          name="title"
          fullWidth
          required
          value={title}
          error={!!errors.title}
          helperText={errors.title ? errors.title : ''}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
        />
        <DatePicker
          style={{ width: '100%' }}
          textFieldStyle={{ width: '100%' }}
          floatingLabelText="Date"
          value={new Date(onDate)}
          onChange={this.handleChange}
          container="inline"
          autoOk
        />
        <FormControl fullWidth>
          <FormControlLabel
            name="isCompleted"
            checked={isCompleted}
            onChange={this.handleChange}
            control={<Checkbox tabIndex="-1" />}
            label="Is completed"
          />
        </FormControl>
        <TagsPicker
          tags={tags}
          error={errors.tags}
          onAddTag={this.handleAddTag}
          onRemoveTag={this.handleRemoveTag}
        />
        <div className={classes.actions}>
          <Button raised color="primary" onClick={this.handleSubmit}>
            {id > 0 ? 'Update' : 'Create'}
          </Button>
          <Button raised onClick={() => this.props.history.push('/')}>
            Cancel
          </Button>
        </div>
      </Paper>
    );
  }
}

export default compose(withRouter, withStyles(styles, { name: 'TodoForm' }))(
  TodoFormComponent
);
