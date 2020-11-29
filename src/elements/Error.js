import React from 'react';
import Exclamation from '../assets/exclamation.svg';

const Error = () => {
  return (
    <div className="flex flex-col justify-center items-center space-y-1 flex-grow">
      <Exclamation className="text-red-700 h-24 w-24" />
      <p className="text-black text-xl font-semibold">
        Error: Unable to connect to server
      </p>
    </div>
  );
};

export default Error;
