import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { PDFDownloadLink } from '@react-pdf/renderer';

import PackingSlip from '../components/PackingSlipTemplate';

import Download from '../assets/download.svg';
import File from '../assets/file.svg';
import Cog from '../assets/cog.svg';
import Exclamation from '../assets/exclamation.svg';

const DownloadPackingSlip = ({ shipment }) => {
  const [show, setShow] = useState(false);
  return (
    <div className="cursor-pointer flex items-center">
      {show ? (
        <PDFDownloadLink
          document={<PackingSlip shipment={shipment} />}
          fileName={`PS-${shipment.packing_slip}.pdf`}
        >
          {({ loading, error }) =>
            loading ? (
              <button className="flex space-x-1 items-center py-1 px-2 rounded text-black">
                <span>Loading...</span>
                <Cog className="h-6 w-6 animate-spin-slow" />
              </button>
            ) : error ? (
              <button className="flex space-x-1 items-center bg-red-500 py-1 px-2 rounded text-white">
                <span>Error</span>
                <Exclamation className="h-6 w-6 " />
              </button>
            ) : (
              <button className="flex space-x-1 items-center bg-green-500 py-1 px-2 rounded text-white">
                <span>Download</span>
                <Download className="h-6 w-6" />
              </button>
            )
          }
        </PDFDownloadLink>
      ) : (
        <button
          onClick={() => setShow(true)}
          className="flex space-x-1 items-center bg-blue-500 py-1 px-2 rounded text-white"
        >
          <span>Generate</span>
          <File className="h-6 w-6" />
        </button>
      )}
    </div>
  );
};

DownloadPackingSlip.propTypes = {
  shipment: PropTypes.object.isRequired,
};

export default DownloadPackingSlip;
