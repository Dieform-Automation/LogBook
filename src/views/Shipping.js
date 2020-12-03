/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React from 'react';

import useShipments from '../hooks/useShipments';

import ShippingForm from '../components/ShippingForm';
import DataTable from '../components/DataTable';
import ShippedParts from '../components/ShippedParts';
import DownloadPackingSlip from '../components/DownloadPackingSlip';

import Header from '../elements/Header';
import Loader from '../elements/Loader';
import Error from '../elements/Error';
import View from '../elements/View';

import DownChevron from '../assets/chevron-down.svg';
import RightChevron from '../assets/chevron-right.svg';

const parseData = (shipments) => {
  if (shipments) {
    return shipments.map((shipment) => ({
      ...shipment,
      date: new Date(shipment.date).toLocaleDateString(),
      packing_slip: String(shipment.id).padStart(6, '0'),
    }));
  } else {
    return [];
  }
};

const Shipping = () => {
  const { data: shipments, isLoading, isError } = useShipments();

  const columns = React.useMemo(
    () => [
      {
        id: 'expander',
        Header: () => null,
        Cell: ({ row }) => (
          <span {...row.getToggleRowExpandedProps()}>
            {row.isExpanded ? (
              <DownChevron className="mx-auto w-6 h-6" />
            ) : (
              <RightChevron className="mx-auto w-6 h-6" />
            )}
          </span>
        ),
      },
      {
        Header: 'Date',
        accessor: 'date',
      },
      {
        Header: 'Customer',
        accessor: 'customer',
      },
      {
        Header: 'Shipping Method',
        accessor: 'shipping_method',
      },
      {
        Header: 'Packing Slip',
        accessor: 'packing_slip',
      },
      {
        id: 'download',
        Header: 'Download',
        Cell: ({ row }) => <DownloadPackingSlip row={row} />,
      },
      {
        id: 'parts',
        accessor: (row) => {
          const { shipped_parts } = row;
          return shipped_parts.map((p) => p.part_number).join(' ');
        },
        Cell: () => null,
      },
    ],
    []
  );

  const renderRowSubComponent = React.useCallback(({ row }) => {
    return (
      <div className="p-8">
        <ShippedParts parts={row.original.shipped_parts} />
      </div>
    );
  }, []);

  const data = React.useMemo(() => parseData(shipments), [shipments]);

  return isLoading ? (
    <Loader />
  ) : isError ? (
    <Error />
  ) : (
    <View>
      <Header title="Shipping" />
      <ShippingForm />
      <div className="py-4">
        <DataTable
          columns={columns}
          data={data}
          renderRowSubComponent={renderRowSubComponent}
        />
      </div>
    </View>
  );
};

export default Shipping;
