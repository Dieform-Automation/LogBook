import React from 'react';
import Proptypes from 'prop-types';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <>
      <main className="flex flex-col h-screen bg-gray-100">
        <Navbar />
        <div className="container mx-auto flex-grow px-4 md:px-6 lg:px-8">{children}</div>
      </main>
    </>
  );
};

Layout.propTypes = {
  children: Proptypes.node,
};

export default Layout;
