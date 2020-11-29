import React from 'react';
import Proptypes from 'prop-types';

const View = ({ children }) => {
  return <div className="container mx-auto max-w-screen-2xl">{children}</div>;
};

View.propTypes = {
  children: Proptypes.node,
};

export default View;
