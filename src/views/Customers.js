/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React, { useState } from 'react';
import { toast } from 'react-toastify';

import useModal from '../hooks/useModal';
import useCreateCustomer from '../hooks/useCreateCustomer';
import useUpdateCustomer from '../hooks/useUpdateCustomer';
import useCustomers from '../hooks/useCustomers';

import CustomerForm from '../components/CustomerForm';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';

import Header from '../elements/Header';
import Loader from '../elements/Loader';
import Error from '../elements/Error';
import View from '../elements/View';

import Edit from '../assets/edit.svg';

const Customers = () => {
  const { data: customers, isLoading, isError } = useCustomers();
  const [createCustomer] = useCreateCustomer();
  const [updateCustomer] = useUpdateCustomer();
  const [editCustomer, setEditCustomer] = useState(undefined);

  const columns = React.useMemo(
    () => [
      {
        id: 'company',
        Header: 'Company',
        accessor: 'name',
      },
      {
        id: 'point_of_contact',
        Header: 'Contact',
        accessor: 'point_of_contact',
      },
      {
        id: 'phone',
        Header: 'Phone',
        accessor: 'phone',
      },
      {
        id: 'email',
        Header: 'Email',
        accessor: 'email',
      },
      {
        id: 'address',
        Header: 'Address',
        accessor: (c) => `${c.street}, ${c.city} ${c.province}`,
      },
      {
        id: 'edit',
        Cell: ({ row }) => {
          const customer = row.original;
          const onClick = () => {
            setEditCustomer(customer);
            toggleEdit();
          };
          return (
            <Edit
              onClick={onClick}
              className="cursor-pointer text-blue-500 mx-auto w-6 h-6"
            />
          );
        },
      },
    ],
    []
  );
  const data = React.useMemo(() => (customers ? customers : []), [customers]);
  const sortBy = React.useMemo(() => [{ id: 'company' }]);

  const { isShowing: isShowingAdd, toggle: toggleAdd } = useModal();
  const { isShowing: isShowingEdit, toggle: toggleEdit } = useModal();

  const handleSubmitAdd = (payload) => {
    createCustomer(payload, {
      onSuccess: () => {
        toggleAdd();
        toast.success('Customer Created');
      },
      onError: (err) => {
        console.log(err);
        toast.error('Failed to create customer');
      },
    });
  };

  const handleSubmitEdit = (payload) => {
    updateCustomer(payload, {
      onSuccess: () => {
        toggleEdit();
        toast.success('Customer Updated');
      },
      onError: (err) => {
        console.log(err);
        toast.error('Failed to update customer');
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
        <button className="btn btn-blue" onClick={toggleAdd}>
          Add Customer
        </button>
      </div>
      <DataTable columns={columns} data={data} sortBy={sortBy} />
      <Modal isShowing={isShowingAdd} hide={toggleAdd} title="Add Customer">
        <CustomerForm onSubmit={handleSubmitAdd} />
      </Modal>
      <Modal isShowing={isShowingEdit} hide={toggleEdit} title="Edit Customer">
        <CustomerForm onSubmit={handleSubmitEdit} customer={editCustomer} />
      </Modal>
    </View>
  );
};

export default Customers;
