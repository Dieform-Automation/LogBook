import React from 'react';
import DataTable from '../components/DataTable';
import Header from '../components/Header';
import useCustomers from '../hooks/useCustomers';

const parseData = (customers) => {
  if (customers) {
    return customers.map((c) => {
      return {
        ...c,
        name: c.name,
        contact: c.point_of_contact,
        phone: c.phone,
        email: c.email,
        address: `${c.street}, ${c.city}`,
      };
    });
  } else {
    return [];
  }
};

const Customers = () => {
  const { data: customers, isLoading } = useCustomers();
  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Contact',
        accessor: 'contact',
      },
      {
        Header: 'Phone',
        accessor: 'phone',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Address',
        accessor: 'address',
      },
    ],
    []
  );

  const data = React.useMemo(() => parseData(customers), [customers]);

  return (
    <>
      {isLoading ? (
        <span>Loading...</span>
      ) : (
        <div className="container mx-auto">
          <Header title="Customers" />
          <DataTable columns={columns} data={data} />
        </div>
      )}
    </>
  );
};

export default Customers;
