/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
/* eslint-disable no-unused-vars */
import React from 'react';

import useShipments from '../hooks/useShipments';

import ShippingForm from '../components/ShippingForm';
import DataTable from '../components/DataTable';

import Header from '../elements/Header';
import Loader from '../elements/Loader';
import Error from '../elements/Error';
import View from '../elements/View';

import DownChevron from '../assets/chevron-down.svg';
import RightChevron from '../assets/chevron-right.svg';
// import Download from '../assets/download.svg';
import ShippedParts from '../components/ShippedParts';
import PackingSlip from '../components/packingSlip/PackingSlip';

import { PDFDownloadLink, Document } from '@react-pdf/renderer';

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
              <RightChevron className="mx-auto animate-rotate-90-cw w-6 h-6" />
            ) : (
              <DownChevron className="mx-auto animate-rotate-90-ccw w-6 h-6" />
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
        Cell: ({ row }) => (
          <div
            onClick={() => console.log(row.original)}
            className="cursor-pointer flex space-x-4 justify-center items-center group"
          >
            <p className="group-hover:text-green-500">{row.values.packing_slip}</p>
            <PDFDownloadLink
              fileName="packing-slip.pdf"
              document={
                <Document>
                  <PackingSlip shipment={row.original} />
                </Document>
              }
            >
              {({ blob, url, loading, error }) =>
                loading ? 'Loading document...' : 'Download now!'
              }
            </PDFDownloadLink>

            {/* <Download className="h-6 w-6 group-hover:text-green-500" /> */}
          </div>
        ),
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
