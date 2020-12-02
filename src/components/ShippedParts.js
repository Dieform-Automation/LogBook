import React from 'react';
import PropTypes from 'prop-types';

const ShippedParts = ({ parts }) => {
  return (
    <div className="overflow-x-auto border border-gray-400 rounded">
      <table className="table-auto w-full divide-y divide-gray-400">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wide">
              Part Number
            </th>
            <th className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wide">
              Quantity
            </th>
            <th className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wide">
              Bins
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {parts.map((part, key) => {
            return (
              <tr key={key}>
                <td className="px-6 py-3 whitespace-no-wrap">{part.part_number}</td>
                <td className="px-6 py-3 whitespace-no-wrap">{part.quantity}</td>
                <td className="px-6 py-3 whitespace-no-wrap">{part.bins}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

ShippedParts.propTypes = {
  parts: PropTypes.array,
};

export default ShippedParts;
