import React from 'react';
import PropTypes from 'prop-types';
import LandingPageLayout from './LandingPageLayout';
import DashboardLayout from './DashboardLayout';

const Layout = ({ isAuthorized, children }) => {
  const LayoutComponent = isAuthorized ? DashboardLayout : LandingPageLayout;
  return <LayoutComponent>{children}</LayoutComponent>;
};

Layout.propTypes = {
  isAuthorized: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired
};

export default Layout;
