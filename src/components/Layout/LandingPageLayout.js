// @flow
import * as React from 'react';
import { compose, pure } from 'recompose';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  root: {
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column',
    [theme.breakpoints.up('md')]: {
      maxWidth: 960,
      margin: '0 auto'
    }
  },
  fullHeight: {
    flexGrow: 1
  }
});

type Props = {
  children: React.ComponentType<*>,
  classes: Return<typeof styles>
};

const LandingPageLayout = ({ children, classes }: Props) => (
  <div className={classes.root}>
    <Grid container direction="column" className={classes.fullHeight}>
      <Grid item lg={12} />
      <Grid item lg={12} className={classes.fullHeight}>
        {children}
      </Grid>
      <Grid item lg={12} />
    </Grid>
  </div>
);

export default compose(pure, withStyles(styles, { name: 'LandingPageLayout' }))(
  LandingPageLayout
);
