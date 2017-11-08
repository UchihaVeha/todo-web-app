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
  content: {
    flexGrow: 1,
    textAlign: 'center'
  }
});

type Props = {
  children: React.ComponentType<*>,
  classes: Return<typeof styles>
};

const LandingPageLayout = ({ children, classes }: Props) => (
  <div className={classes.root}>
    <Grid container direction="column">
      <Grid item lg={12}>
        <h1>Header</h1>
      </Grid>
      <Grid item lg={12} className={classes.content}>
        {children}
      </Grid>
      <Grid item lg={12}>
        <h1>Footer</h1>
      </Grid>
    </Grid>
  </div>
);

export default compose(pure, withStyles(styles, { name: 'LandingPageLayout' }))(
  LandingPageLayout
);
