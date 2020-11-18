import React from 'react';
import Cog from '../assets/cog.svg';

const Loader = () => {
  return (
    <div className="flex flex-col justify-center items-center space-y-1 flex-grow">
      <Cog className="animate-spin-slow h-24 w-24" />
      <p className="text-xl font-semibold">Loading...</p>
    </div>
  );
};

export default Loader;
