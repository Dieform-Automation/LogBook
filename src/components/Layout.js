import React from 'react';
import Proptypes from 'prop-types';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <>
      <main className="flex flex-col h-screen">
        <Navbar />
        <div className="container mx-auto flex flex-col flex-grow px-4 md:px-8 lg:px-10 xl:px-12">
          {children}
        </div>
      </main>
    </>
  );
};

Layout.propTypes = {
  children: Proptypes.node,
};

export default Layout;
