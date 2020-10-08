import React from 'react';
import Proptypes from 'prop-types';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <>
      <main className="h-screen bg-gray-100">
        <Navbar />
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{children}</div>
      </main>
    </>
  );
};

Layout.propTypes = {
  children: Proptypes.node,
};

export default Layout;
