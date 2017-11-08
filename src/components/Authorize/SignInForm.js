// @flow
import * as React from 'react';
import Joi from 'joi-browser';
import validate from 'utils/validate';
import { withStyles } from 'material-ui/styles';
import { CircularProgress } from 'material-ui/Progress';
import { TextField, Button, Typography } from 'material-ui';
import { Redirect } from 'react-router';

const styles = {
  root: {
    margin: '60px auto 0',
    width: '256px',
    position: 'relative'
  },
  action: {
    textAlign: 'center',
    marginTop: 24
  }
};

const scheme = {
  email: Joi.string()
    .email()
    .max(255)
    .required(),
  password: Joi.string()
    .alphanum()
    .min(6)
    .max(60)
};

type validationErrors = $ObjMap<typeof scheme, (f: () => any) => string | null>;

type Props = {
  isAuthorized: boolean,
  error: ?string,
  isFetching: boolean,
  authorize: ({ email: string, password: string }) => void,
  classes: Object
};

type State = {
  values: { email: string, password: string },
  errors: validationErrors
};

class SignInForm extends React.Component<Props, State> {
  state = {
    values: {
      email: '',
      password: ''
    },
    errors: {
      email: null,
      password: null
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.error !== this.state.errors.email) {
      this.updateState({ errors: { email: nextProps.error } });
    }
  }

  handleSubmit = (): void => {
    const { isValid, errors } = validate(this.state.values, scheme);
    if (isValid) {
      this.props.authorize(this.state.values);
    } else {
      this.updateState({ errors });
    }
  };

  updateState({ values = {}, errors = {} }: { values?: *, errors?: * }) {
    this.setState({
      values: { ...this.state.values, ...values },
      errors: { ...this.state.errors, ...errors }
    });
  }

  updateOneAttr = (attr: string, value: *): void => {
    const values = { [attr]: value };
    if (this.state.errors[attr] !== null) {
      const { errors } = validate(values, scheme);
      this.updateState({ values, errors: { [attr]: errors[attr] } });
    } else {
      this.updateState({ values });
    }
  };

  handleChange = ({ target }: SyntheticInputEvent<>): void => {
    if (target.name && target.value) {
      this.updateOneAttr(target.name, target.value);
    }
  };

  handleBlur = ({ currentTarget }: SyntheticEvent<HTMLInputElement>) => {
    const { errors } = validate(this.state.values, scheme);
    this.updateState({
      errors: { [currentTarget.name]: errors[currentTarget.name] }
    });
  };

  render() {
    const { isAuthorized, isFetching, classes } = this.props;
    const { values, errors } = this.state;
    if (isAuthorized) {
      return <Redirect to={{ pathname: '/' }} />;
    }
    return (
      <div className={classes.root}>
        <Typography align="center" type="title">
          Sign In
        </Typography>
        <TextField
          label="Email"
          type="email"
          name="email"
          value={values.email}
          error={!!errors.email}
          helperText={errors.email || ''}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
        />
        <TextField
          label="Password"
          type="password"
          name="password"
          value={values.password}
          error={!!errors.password}
          helperText={errors.password || ''}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
        />
        <div className={classes.action}>
          {isFetching ? (
            <CircularProgress size={50} />
          ) : (
            <Button raised color="primary" onClick={this.handleSubmit}>
              Sign In
            </Button>
          )}
        </div>
      </div>
    );
  }
}

export default withStyles(styles, { name: 'SignInForm' })(SignInForm);
