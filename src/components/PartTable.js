import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import Select from 'react-select';
import PropTypes from 'prop-types';

import useField from '../hooks/useField';
import useParts from '../hooks/useParts';
import useGlobalState from '../hooks/useGlobalState';
import TrashIcon from '../assets/trash.svg';

const PartTable = ({ customerId }) => {
  const [receivedParts, addRecPart, removeRecPart] = useGlobalState((state) => [
    state.receivedParts,
    state.addRecPart,
    state.removeRecPart,
  ]);

  const partsQuery = useParts(customerId);
  const isShipping = useRouteMatch('/shipping');

  const [formError, setFormError] = useState('');
  const [selectedPart, setSelectedPart] = useState();
  const quantity = useField('text');
  const bins = useField('text');

  useEffect(() => {
    setSelectedPart(null);
    setFormError('');
    quantity.reset();
    bins.reset();
  }, [customerId]);

  const isValidPart = () => {
    let message = '';

    const existingPart = receivedParts.some((part) => {
      return part.id === selectedPart.value;
    });

    if (!selectedPart) {
      message = 'Part number is required';
    } else if (existingPart) {
      message = 'Part number already exists';
    } else if (isNaN(quantity.fields.value) || quantity.fields.value === '') {
      message = 'Quantity value must be a number';
    } else if (isNaN(bins.fields.value) || bins.fields.value === '') {
      message = 'Bins value must be a number';
    }

    if (message !== '') {
      setFormError(message);
      return false;
    } else {
      setFormError('');
      return true;
    }
  };

  const addPartToTable = () => {
    if (isValidPart()) {
      const part = {
        id: selectedPart.value,
        partNumber: selectedPart.label,
        quantity: Number(quantity.fields.value),
        bins: Number(bins.fields.value),
      };
      addRecPart(part);
      quantity.reset();
      bins.reset();
    }
  };

  return (
    <>
      {partsQuery.isLoading ? (
        <span>Loading...</span>
      ) : (
        <div>
          {/* Inline Fields & Button */}
          <div className="flex flex-wrap -mx-3 mb-4 items-end">
            <div className="w-full md:flex-1 px-3 mb-4 md:mb-0">
              <label className="form-label" htmlFor="part-number" id="part-number">
                Part Number
              </label>
              <Select
                aria-labelledby="part-number"
                className="shadow"
                value={selectedPart}
                options={partsQuery.data.map((p) => ({ value: p.id, label: p.number }))}
                onChange={setSelectedPart}
              />
            </div>
            <div className="w-full md:flex-1 px-3 mb-4 md:mb-0">
              <label className="form-label" htmlFor="quantity">
                Quantity
              </label>
              <input
                className="form-input"
                name="quantity"
                id="quantity"
                data-testid="quantity"
                {...quantity.fields}
                placeholder="120"
              />
            </div>
            <div className="w-full md:flex-1 px-3 mb-4 md:mb-0">
              <label className="form-label" htmlFor="bins">
                Number of Bins
              </label>
              <input
                className="form-input"
                name="bins"
                id="bins"
                data-testid="bins"
                {...bins.fields}
                placeholder="2"
              />
            </div>
            <div className="w-full md:w-auto px-3">
              <button
                className={`${
                  isShipping ? 'btn-green' : 'btn-blue'
                } btn uppercase font-bold w-full max-w-screen-md whitespace-no-wrap`}
                type="button"
                data-testid="add-part-btn"
                onClick={addPartToTable}
              >
                Add Part
              </button>
            </div>
          </div>
          {/* Error Message */}
          <p className="text-center text-red-500 font-semibold text-sm my-3">
            {formError}
          </p>
          {/* Part Table */}
          <div className="shadow overflow-x-auto border border-gray-400 rounded mb-6">
            <table className="min-w-full divide-y divide-gray-400">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                    Part Number
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                    Bins
                  </th>
                  <th className="py-3 w-6"></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {receivedParts.map((part, key) => {
                  return (
                    <tr key={key}>
                      <td className="px-6 py-3 whitespace-no-wrap">{part.partNumber}</td>
                      <td className="px-6 py-3 whitespace-no-wrap">{part.quantity}</td>
                      <td className="px-6 py-3 whitespace-no-wrap">{part.bins}</td>
                      <td className="px-6 py-3 whitespace-no-wrap">
                        <TrashIcon
                          className="w-6 h-6 cursor-pointer text-red-600"
                          onClick={() => removeRecPart(key)}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

PartTable.propTypes = {
  customerId: PropTypes.number,
};
export default PartTable;
