// @flow
import React from 'react';
import { compose, pure, withHandlers } from 'recompose';
import { withRouter } from 'react-router';
import { withStyles } from 'material-ui/styles';
import { Paper, Button, Typography } from 'material-ui';
import AddIcon from 'material-ui-icons/Add';
import { grey } from 'material-ui/colors';

const styles = theme => ({
  total: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.unit,
    color: theme.palette.common.darkWhite,
    background: grey['700'],
    boxShadow: `inset ${theme.shadows[6]}`
  },
  label: {
    fontWeight: 900
  },
  button: {
    zIndex: 2000,
    alignSelf: 'flex-end',
    marginTop: '-36px'
  }
});

type Props = {
  count: number,
  classes: Object,
  history: Object,
  handleCreateClick: number => void
};
const TodoListCount = ({ count, classes, handleCreateClick }: Props): * => (
  <Paper square>
    <div className={classes.total}>
      <Typography type="caption" color="inherit" className={classes.label}>
        TOTAL: {count}
      </Typography>
      <Button
        fab
        color="accent"
        className={classes.button}
        onClick={handleCreateClick}
      >
        <AddIcon />
      </Button>
    </div>
  </Paper>
);

export default compose(
  pure,
  withRouter,
  withHandlers({
    handleCreateClick: props => () => {
      props.history.push('/create');
    }
  }),
  withStyles(styles, { name: 'TodoListCount' })
)(TodoListCount);
