import React from 'react';
import PropTypes from 'prop-types';
import ShippedParts from './ShippedParts';

import { PDFDownloadLink } from '@react-pdf/renderer';

import PackingSlip from '../components/PackingSlipTemplate';

import Download from '../assets/download.svg';
import Cog from '../assets/cog.svg';
import Exclamation from '../assets/exclamation.svg';

const ShipmentConfirmation = ({ shipment }) => {
  shipment.packing_slip = String(shipment.id).padStart(6, '0');
  shipment.date = new Date(shipment.date).toLocaleDateString();

  return (
    <div className="p-4 space-y-4 text-left">
      <div className="flex flex-wrap justify-between">
        <h1 className="form-label flex flex-col">
          Date
          <span className="font-normal tracking-normal normal-case">{shipment.date}</span>
        </h1>
        <h1 className="form-label flex flex-col">
          Customer
          <span className="font-normal tracking-normal normal-case">
            {shipment.customer}
          </span>
        </h1>
        <h1 className="form-label flex flex-col">
          Shipping
          <span className="font-normal tracking-normal normal-case">
            {shipment.shipping_method}
          </span>
        </h1>
        <h1 className="form-label flex flex-col">
          Packing Slip No.
          <span className="font-normal tracking-normal normal-case">
            {shipment.packing_slip}
          </span>
        </h1>
      </div>
      <ShippedParts parts={shipment.shipped_parts} />
      <div className="mt-2">
        <PDFDownloadLink
          document={<PackingSlip shipment={shipment} />}
          fileName={`PS-${shipment.packing_slip}.pdf`}
        >
          {({ loading, error }) =>
            loading ? (
              <div className="flex space-x-1 justify-center items-center text-black">
                <span>Loading...</span>
                <Cog className="h-6 w-6 animate-spin-slow" />
              </div>
            ) : error ? (
              <div className="flex flex-wrap items-center justify-between bg-red-100 border border-red-400 text-red-700 px-6 py-2 rounded">
                <p>Failed to generate packing slip</p>
                <Exclamation className="h-6 w-6" />
              </div>
            ) : (
              <div className="flex flex-wrap items-center justify-between bg-green-100 border border-green-400 text-green-700 px-6 py-2 rounded">
                <p>Packing slip successfully generated!</p>
                <button className="btn btn-green flex space-x-1 items-center text-white">
                  <span>Download</span>
                  <Download className="h-6 w-6" />
                </button>
              </div>
            )
          }
        </PDFDownloadLink>
      </div>
    </div>
  );
};

ShipmentConfirmation.propTypes = {
  shipment: PropTypes.object.isRequired,
};
export default ShipmentConfirmation;
