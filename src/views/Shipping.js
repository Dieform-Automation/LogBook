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

const getDate = (date) => new Date(String(date).concat('-0500')).toLocaleDateString();
const getPackingSlip = (id) => String(id).padStart(6, '0');

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
        id: 'date',
        Header: 'Date',
        accessor: (shipment) => getDate(shipment.date),
      },
      {
        id: 'customer',
        Header: 'Customer',
        accessor: 'customer',
      },
      {
        id: 'shipping_method',
        Header: 'Shipping Method',
        accessor: 'shipping_method',
      },
      {
        id: 'packing_slip',
        Header: 'Packing Slip',
        accessor: (shipment) => getPackingSlip(shipment.id),
      },
      {
        id: 'download',
        Header: 'Download',
        disableSortBy: true,
        // Add list of shipped parts as accessor in order to be searched by global filter
        accessor: (row) => {
          const { shipped_parts } = row;
          return shipped_parts.map((p) => p.part_number).join(' ');
        },
        Cell: ({ row }) => {
          const shipment = row.original;
          const date = getDate(shipment.date);
          const packing_slip = getPackingSlip(shipment.id);
          return <DownloadPackingSlip shipment={{ ...shipment, date, packing_slip }} />;
        },
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

  const data = React.useMemo(() => (shipments ? shipments : []), [shipments]);
  const sortBy = React.useMemo(() => [{ id: 'date', desc: true }]);

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
          sortBy={sortBy}
        />
      </div>
    </View>
  );
};

export default Shipping;
