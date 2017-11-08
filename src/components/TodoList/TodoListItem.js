'no babel-plugin-flow-react-proptypes';

// @flow
import React from 'react';
import { compose, pure, withHandlers } from 'recompose';
import { withRouter } from 'react-router';
import { withStyles } from 'material-ui/styles';
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from 'material-ui/List';
import { Checkbox, IconButton } from 'material-ui';
import EditIcon from 'material-ui-icons/Edit';
import DeleteIcon from 'material-ui-icons/Delete';
import Menu, { MenuItem } from 'material-ui/Menu';
import MoreVertIcon from 'material-ui-icons/MoreVert';
import type { TodoRecord } from 'modules/todo/reducers';

const styles = () => ({
  root: {
    display: 'none'
  }
});

type Props = {
  todo: TodoRecord,
  tagNames: *,
  isHidden: boolean,
  isPending: boolean,
  handleOnClick: number => void,
  handleEditClick: number => void,
  handleDeleteClick: number => void,
  classes: Object
};

class TodoListItemMenu extends React.Component {
  state = {
    anchorEl: null,
    open: false
  };

  handleClick = event => {
    this.setState({ open: true, anchorEl: event.currentTarget });
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { handleEditClick, handleDeleteClick } = this.props;
    return (
      <div>
        <IconButton
          aria-label="More"
          aria-owns={this.state.open ? 'todo-list-item-menu' : null}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="todo-list-item-menu"
          anchorEl={this.state.anchorEl}
          open={this.state.open}
          onRequestClose={this.handleRequestClose}
        >
          <MenuItem key={0} onClick={this.handleRequestClose}>
            <IconButton aria-label="Edit" onClick={handleEditClick}>
              <EditIcon />
            </IconButton>
          </MenuItem>
          <MenuItem key={1} onClick={this.handleRequestClose}>
            <IconButton aria-label="Delete" onClick={handleDeleteClick}>
              <DeleteIcon />
            </IconButton>
          </MenuItem>
        </Menu>
      </div>
    );
  }
}

const TodoListItem = ({
  todo,
  tagNames,
  isHidden,
  isPending,
  handleOnClick,
  handleEditClick,
  handleDeleteClick,
  classes
}: Props) => (
  <ListItem
    button
    divider
    disableGutters
    disabled={isPending}
    onClick={handleOnClick}
    classes={isHidden ? classes : {}}
  >
    <Checkbox disableRipple tabIndex="-1" checked={todo.isCompleted} />
    <ListItemText
      primary={todo.title}
      secondary={tagNames.map(tag => <span key={tag}>{`${tag} `}</span>)}
    />
    <ListItemSecondaryAction>
      <TodoListItemMenu
        handleEditClick={handleEditClick}
        handleDeleteClick={handleDeleteClick}
      />
    </ListItemSecondaryAction>
  </ListItem>
);

export default compose(
  pure,
  withRouter,
  withHandlers({
    handleOnClick: props => () => {
      props.onToggleIsCompleted(props.todo, props.tagNames);
    },
    handleEditClick: props => () => {
      props.history.push(`/update/${props.todo.id}`);
    },
    handleDeleteClick: props => () => {
      props.onDeleteTodo(props.todo);
    }
  }),
  withStyles(styles, { name: 'TodoListItem' })
)(TodoListItem);
