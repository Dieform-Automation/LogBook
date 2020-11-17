import React from 'react';
import CustomerForm from '../components/CustomerForm';
import DataTable from '../components/DataTable';
import Header from '../components/Header';
import Modal from '../components/Modal';
import useCustomers from '../hooks/useCustomers';
import useCreateCustomer from '../hooks/useCreateCustomer';

import useModal from '../hooks/useModal';

const parseData = (customers) => {
  if (customers) {
    return customers.map((c) => {
      return {
        ...c,
        name: c.name,
        contact: c.point_of_contact,
        phone: c.phone,
        email: c.email,
        address: `${c.street}, ${c.city} ${c.province}`,
      };
    });
  } else {
    return [];
  }
};

const Customers = () => {
  const { data: customers, isLoading } = useCustomers();
  const [createCustomer] = useCreateCustomer();

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

  const { isShowing, toggle } = useModal();

  const handleSubmit = (payload) => {
    createCustomer(payload, {
      onSuccess: () => {
        toggle();
      },
      onError: (err) => {
        console.log(err);
        alert(err.message);
      },
    });
  };

  return isLoading ? (
    <span>Loading...</span>
  ) : (
    <>
      <div className="flex justify-between items-center">
        <Header title="Customers" />
        <button className="btn btn-blue" onClick={toggle}>
          Add Customer
        </button>
      </div>
      <Modal isShowing={isShowing} hide={toggle} title="Add Customer">
        <CustomerForm onSubmit={handleSubmit} />
      </Modal>
      <DataTable columns={columns} data={data} />
    </>
  );
};

export default Customers;
