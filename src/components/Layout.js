import React from 'react';
import Proptypes from 'prop-types';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <>
      <main className="flex flex-col h-screen bg-gray-100">
        <Navbar />
        <div className="flex-grow sm:p-4">{children}</div>
      </main>
    </>
  );
};

Layout.propTypes = {
  children: Proptypes.node,
};

export default Layout;
