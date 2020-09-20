import React from 'react';
import Layout from '../components/Layout';
import BoxIcon from '../assets/box.svg';
import TruckIcon from '../assets/truck.svg';

const Landing = () => {
  return (
    <Layout>
      <div className="h-full flex flex-col lg:flex-row lg:justify-evenly lg:p-40">
        <button className="bg-blue-600 hover:bg-blue-700 rounded-lg m-5 flex-grow max-w-4xl transform hover:-translate-y-1 hover:scale-110 transition duration-300 ease-in-out ">
          <div className="flex flex-col h-full justify-center">
            <BoxIcon className="mx-auto w-32 h-32 md:w-48 md:h-48 2xl:w-64 2xl:h-64"></BoxIcon>
            <h1 className="font-bold text-white text-5xl 2xl:text-6xl">Receiving</h1>
          </div>
        </button>
        <button className="bg-green-500 hover:bg-green-600 rounded-lg m-5 flex-grow max-w-4xl transform hover:-translate-y-1 hover:scale-110 transition duration-300 ease-in-out ">
          <div className="flex flex-col h-full justify-center">
            <TruckIcon className="mx-auto w-32 h-32 md:w-48 md:h-48 2xl:w-64 2xl:h-64"></TruckIcon>
            <h1 className="font-bold text-white text-5xl 2xl:text-6xl">Shipping</h1>
          </div>
        </button>
      </div>
    </Layout>
  );
};

export default Landing;
