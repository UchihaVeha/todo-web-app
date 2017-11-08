// @flow
import React from 'react';
import { compose } from 'recompose';
import { withRouter } from 'react-router';
import { withStyles } from 'material-ui/styles';
import { Typography, IconButton } from 'material-ui';
import BeforeIcon from 'material-ui-icons/ArrowBack';

const styles = {
  root: {
    display: 'flex',
    alignItems: 'center'
  },
  title: {
    flexGrow: 1,
    marginRight: 48
  }
};

const CreateTodoAppBar = withRouter(({ history, classes }) => (
  <div className={classes.root}>
    <IconButton
      color="inherit"
      aria-label="Back"
      onClick={() => history.push('/')}
    >
      <BeforeIcon />
    </IconButton>
    <Typography type="headline" align="center" className={classes.title}>
      {'Create Todo'}
    </Typography>
  </div>
));

export default compose(
  withRouter,
  withStyles(styles, { name: 'CreateTodoAppBar' })
)(CreateTodoAppBar);
