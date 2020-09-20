import React from 'react';
import Proptypes from 'prop-types';

const Layout = ({ children }) => {
  return <div className="h-screen flex flex-col">{children}</div>;
};

Layout.propTypes = {
  children: Proptypes.node,
};

export default Layout;
