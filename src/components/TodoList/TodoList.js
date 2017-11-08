// @flow
import React from 'react';
import { compose, pure } from 'recompose';
import { withStyles } from 'material-ui/styles';
import { List, Paper } from 'material-ui';
import { CircularProgress } from 'material-ui/Progress';
import type { TodoIds } from 'modules/todo/reducers';

const styles = theme => ({
  list: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: theme.spacing.unit,
    background: 'white'
  },
  centered: {
    textAlign: 'center'
  }
});

type Props = {
  todoIds: TodoIds,
  isLoading: boolean,
  classes: Object,
  listItem: any
};
const TodoList = ({
  todoIds,
  isLoading,
  classes,
  listItem: ListItem
}: Props): * => (
  <div>
    <Paper className={classes.list}>
      <div className={classes.centered}>
        {!isLoading && todoIds.count() === 0 && <span>No items</span>}
        {isLoading && <CircularProgress size={30} />}
      </div>
      <List>{todoIds.map(id => <ListItem key={id} id={id} />).toArray()}</List>
    </Paper>
  </div>
);

export default compose(pure, withStyles(styles, { name: 'TodoList' }))(
  TodoList
);
