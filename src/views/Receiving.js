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
        date: new Date(date).toLocaleDateString(),
        customer: customer,
        part_number: part.part_number,
        quantity: part.quantity,
        bins: part.bins,
        data: received,
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
        Header: 'Date',
        accessor: 'date',
      },
      {
        Header: 'Customer',
        accessor: 'customer',
      },
      {
        Header: 'Part Number',
        accessor: 'part_number',
      },
      {
        Header: 'Quantity',
        accessor: 'quantity',
      },
      {
        Header: 'Bins',
        accessor: 'bins',
      },
    ],
    []
  );

  const data = React.useMemo(() => parseData(recOrders), [recOrders]);

  return isLoading ? (
    <Loader />
  ) : isError ? (
    <Error />
  ) : (
    <View>
      <Header title="Receiving" />
      <ReceivingForm />
      <div className="py-4">
        <DataTable columns={columns} data={data} />
      </div>
    </View>
  );
};

export default Receiving;
