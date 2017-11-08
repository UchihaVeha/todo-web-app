// @flow
import * as React from 'react';
import { compose, withState, withHandlers, pure } from 'recompose';
import { withStyles } from 'material-ui/styles';
import { IconButton, AppBar, Toolbar } from 'material-ui';
import { grey } from 'material-ui/colors';
import MenuIcon from 'material-ui-icons/Menu';
import AppMenu from 'components/AppMenu';

const upMdWith = 960;

const styles = theme => ({
  root: {
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column'
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    background: grey['100']
  },
  header: {
    [theme.breakpoints.up('md')]: {
      maxWidth: upMdWith,
      margin: '0 auto'
    }
  },
  toolbar: {
    alignItems: 'stretch',
    flexDirection: 'column'
  },
  content: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    [theme.breakpoints.up('md')]: {
      maxWidth: upMdWith,
      margin: '0 auto'
    }
  }
});

type Props = {
  appBar: React.ComponentType<*>,
  content: React.ComponentType<*>,
  classes: Return<typeof styles>,
  handleMenuToggle: () => void,
  open: boolean
};
export const AppLayoutComponent = ({
  appBar: Header,
  content: Content,
  classes,
  handleMenuToggle,
  open
}: Props) => (
  <div className={classes.root}>
    <div className={classes.container}>
      <AppMenu open={open} handleMenuToggle={handleMenuToggle} />
      <AppBar position="static" className={classes.header}>
        <Toolbar>
          <IconButton
            color="contrast"
            aria-label="Menu"
            onClick={handleMenuToggle}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
        <Toolbar className={classes.toolbar}>
          <Header />
        </Toolbar>
      </AppBar>
      <div className={classes.content}>
        <Content />
      </div>
    </div>
  </div>
);

export default compose(
  pure,
  withState('open', 'setOpen', false),
  withHandlers({
    handleMenuToggle: ({ open, setOpen }) => () => setOpen(!open)
  }),
  withStyles(styles, { name: 'AppLayout' })
)(AppLayoutComponent);
