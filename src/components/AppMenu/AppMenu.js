// @flow
import * as React from 'react';
import { compose, pure } from 'recompose';
import { Link } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import { Drawer, Button } from 'material-ui';
import List, { ListItem } from 'material-ui/List';

const styles = () => ({
  drawerPaper: {
    width: 250
  },
  button: {
    width: '100%',
    textTransform: 'none',
    justifyContent: 'flex-start'
  }
});

type Props = {
  classes: Return<typeof styles>,
  handleMenuToggle: () => void,
  open: boolean
};

export const menuItems = [{ title: 'Home', url: '/' }];

export const AppMenuComponent = ({
  open,
  handleMenuToggle,
  classes
}: Props) => (
  <Drawer
    open={open}
    onRequestClose={handleMenuToggle}
    ModalProps={{
      keepMounted: true // Better open performance on mobile.
    }}
    classes={{
      paper: classes.drawerPaper
    }}
  >
    <List>
      {menuItems.map(item => (
        <ListItem key={item.url} disableGutters>
          <Button
            disableRipple
            to={item.url}
            component={Link}
            className={classes.button}
          >
            {item.title}
          </Button>
        </ListItem>
      ))}
    </List>
  </Drawer>
);

export default compose(pure, withStyles(styles, { name: 'AppMenu' }))(
  AppMenuComponent
);
