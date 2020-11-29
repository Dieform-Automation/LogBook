import React from 'react';

import useShipments from '../hooks/useShipments';
import ShippingForm from '../components/ShippingForm';
import DataTable from '../components/DataTable';
import Header from '../elements/Header';
import Loader from '../elements/Loader';
import Error from '../elements/Error';

const parseData = (shipments) => {
  if (shipments) {
    return shipments.flatMap((shipment) => {
      const { customer, date, shipping_method, id, shipped_parts } = shipment;
      const data = shipped_parts.map((part) => ({
        date: new Date(date).toLocaleDateString(),
        customer: customer,
        packing_slip: id,
        shipping_method: shipping_method,
        part_number: part.part_number,
        quantity: part.quantity,
        bins: part.bins,
        data: shipment,
      }));
      return data;
    });
  } else {
    return [];
  }
};

const Shipping = () => {
  const { data: shipments, isLoading, isError } = useShipments();

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
        Header: 'Packing Slip',
        accessor: 'packing_slip',
      },
      {
        Header: 'Shipping Method',
        accessor: 'shipping_method',
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

  const data = React.useMemo(() => parseData(shipments), [shipments]);

  return isLoading ? (
    <Loader />
  ) : isError ? (
    <Error />
  ) : (
    <>
      <Header title="Shipping" />
      <ShippingForm />
      <div className="py-4">
        <DataTable columns={columns} data={data} />
      </div>
    </>
  );
};

export default Shipping;
