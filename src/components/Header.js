import React from 'react';
import Proptypes from 'prop-types';

const Header = ({ title }) => {
  return (
    <header>
      <div className="max-w-7xl py-6">
        <h1 className="text-4xl font-bold leading-tight text-gray-900">{title}</h1>
      </div>
    </header>
  );
};

Header.propTypes = {
  title: Proptypes.string.isRequired,
};

export default Header;
