import React from 'react';

import useModal from '../hooks/useModal';
import useCreateCustomer from '../hooks/useCreateCustomer';
import useCustomers from '../hooks/useCustomers';

import CustomerForm from '../components/CustomerForm';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';

import Header from '../elements/Header';
import Loader from '../elements/Loader';
import Error from '../elements/Error';
import View from '../elements/View';

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
  const { data: customers, isLoading, isError } = useCustomers();
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
    <Loader />
  ) : isError ? (
    <Error />
  ) : (
    <View>
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
    </View>
  );
};

export default Customers;
