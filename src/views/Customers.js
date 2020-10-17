import React from 'react';
import Header from '../components/Header';
import useCustomers from '../hooks/useCustomers';

const Customers = () => {
  const { data, status, error } = useCustomers();

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'error') return <div>Error {error.message}</div>;

  return (
    <div>
      <Header title="Customers" />
      {data.map((customer) => (
        <h1 key={customer.id}>{customer.name}</h1>
      ))}
    </div>
  );
};

export default Customers;
