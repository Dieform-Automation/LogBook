import React from 'react';

import BoxIcon from '../assets/box.svg';
import TruckIcon from '../assets/truck.svg';
import { useHistory } from 'react-router-dom';

const Landing = () => {
  let history = useHistory();

  return (
    <div className="h-full flex flex-col lg:flex-row lg:justify-evenly lg:p-32 3xl:p-48">
      <button
        id="receiving"
        onClick={() => {
          history.push('/receiving');
        }}
        className="bg-blue-600 hover:bg-blue-700 rounded-lg m-5 flex-grow max-w-4xl transform hover:-translate-y-1 hover:scale-110 transition duration-300 ease-in-out "
      >
        <div className="flex flex-col justify-center">
          <BoxIcon className="mx-auto w-32 h-32 md:w-48 md:h-48 2xl:w-56 2xl:h-56 3xl:w-64 3xl:h-64" />
          <h1 className="font-bold text-white text-5xl 3xl:text-6xl">Receiving</h1>
        </div>
      </button>
      <button
        id="shipping"
        onClick={() => {
          history.push('/shipping');
        }}
        className="bg-green-500 hover:bg-green-600 rounded-lg m-5 flex-grow max-w-4xl transform hover:-translate-y-1 hover:scale-110 transition duration-300 ease-in-out "
      >
        <div className="flex flex-col justify-center">
          <TruckIcon className="mx-auto w-32 h-32 md:w-48 md:h-48 2xl:w-56 2xl:h-56 3xl:w-64 3xl:h-64" />
          <h1 className="font-bold text-white text-5xl 3xl:text-6xl">Shipping</h1>
        </div>
      </button>
    </div>
  );
};

export default Landing;
