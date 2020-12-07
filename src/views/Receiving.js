import React from 'react';

import useRecOrders from '../hooks/useRecOrders';

import ReceivingForm from '../components/ReceivingForm';
import DataTable from '../components/DataTable';

import Header from '../elements/Header';
import Loader from '../elements/Loader';
import Error from '../elements/Error';
import View from '../elements/View';

const parseData = (recOrders) => {
  if (recOrders) {
    return recOrders.flatMap((received) => {
      const { customer, date, received_parts } = received;
      const data = received_parts.map((part) => ({
        ...received,
        date: new Date(String(date).concat('-0500')).toLocaleDateString(),
        customer: customer,
        part_number: part.part_number,
        quantity: part.quantity,
        bins: part.bins,
      }));
      return data;
    });
  } else {
    return [];
  }
};

const Receiving = () => {
  const { data: recOrders, isLoading, isError } = useRecOrders();

  const columns = React.useMemo(
    () => [
      {
        id: 'date',
        Header: 'Date',
        accessor: 'date',
      },
      {
        id: 'customer',
        Header: 'Customer',
        accessor: 'customer',
      },
      {
        id: 'part_number',
        Header: 'Part Number',
        accessor: 'part_number',
      },
      {
        id: 'quantity',
        Header: 'Quantity',
        accessor: 'quantity',
      },
      {
        id: 'bins',
        Header: 'Bins',
        accessor: 'bins',
      },
    ],
    []
  );

  const data = React.useMemo(() => parseData(recOrders), [recOrders]);
  const sortBy = React.useMemo(() => [{ id: 'date', desc: true }]);

  return isLoading ? (
    <Loader />
  ) : isError ? (
    <Error />
  ) : (
    <View>
      <Header title="Receiving" />
      <ReceivingForm />
      <div className="py-4">
        <DataTable columns={columns} data={data} sortBy={sortBy} />
      </div>
    </View>
  );
};

export default Receiving;
