import React from 'react';
import Proptypes from 'prop-types';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">{children}</div>
      </main>
    </>
  );
};

Layout.propTypes = {
  children: Proptypes.node,
};

export default Layout;
