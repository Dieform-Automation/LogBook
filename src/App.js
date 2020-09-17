import React from 'react';

const App = () => {
  return (
    <div className='h-screen flex flex-col justify-center items-center space-y-2'>
      <h1 className='text-4xl'>LogBook</h1>
      <h2 className='text-2xl'>All things inventory management at DieForm</h2>
      <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold rounded py-2 px-16'>
        Login
      </button>
    </div>
  );
};

export default App;
