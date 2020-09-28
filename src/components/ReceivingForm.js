import React, { useState } from 'react';
import useField from '../hooks/useField';
import TrashIcon from '../assets/trash.svg';

const ReceivingForm = () => {
  const date = useField('date');
  const customerPackingSlip = useField('text');
  const partNumber = useField('text');
  const quantity = useField('text');
  const bins = useField('text');

  const [error, setError] = useState('');
  const [parts, setParts] = useState([]);

  const isValidPart = () => {
    const existingPart = parts.some((part) => {
      return part.partNumber === partNumber.fields.value;
    });

    if (partNumber.fields.value === '') {
      setError('Part number is required');
      return false;
    } else if (existingPart) {
      setError('Part number already exists');
      return false;
    } else if (isNaN(quantity.fields.value) || quantity.fields.value === '') {
      setError('Quantity value must be a number');
      return false;
    } else if (isNaN(bins.fields.value) || bins.fields.value === '') {
      setError('Bins value must be a number');
      return false;
    }

    return true;
  };

  const addPart = (event) => {
    event.preventDefault();

    if (!isValidPart()) {
      setTimeout(() => setError(''), 4000);
      return;
    }

    const part = {
      partNumber: partNumber.fields.value,
      quantity: Number(quantity.fields.value),
      bins: Number(bins.fields.value),
    };

    setParts(parts.concat(part));
    partNumber.reset();
    quantity.reset();
    bins.reset();
  };

  const removePart = (key) => {
    setParts(
      parts.filter((_, index) => {
        return index !== key;
      })
    );
  };

  const onSubmit = (event) => {
    event.preventDefault();

    if (!parts.length > 0) {
      setError('At least 1 part is required');
      setTimeout(() => setError(''), 4000);
      return;
    }
  };

  return (
    <div className="w-full max-w-5xl">
      <form className="shadow-md rounded px-8 py-6" onSubmit={onSubmit}>
        {/* Date */}
        <div className="mb-4">
          <label className="form-label" htmlFor="date">
            Date
          </label>
          <input className="form-input" {...date.fields} name="date" id="date" required />
        </div>
        {/* Customer Select */}
        <div className="mb-4">
          <label className="form-label" htmlFor="customer">
            Customer
          </label>
          <div className="relative w-full">
            <select
              name="customer"
              id="customer"
              className="shadow appearance-none border rounded w-full px-2 py-2 text-gray-700 border-gray-400 hover:border-gray-500 leading-tight focus:outline-none focus:shadow-outline"
              required
            >
              <option value="Matcor Brampton">Matcor Brampton</option>
              <option value="Matcor Mississauga">Matcor Mississauga</option>
              <option value="Matcor Bramlea">Matcor Bramlea</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
        {/* Customer Packing Slip */}
        <div className="mb-4">
          <label className="form-label" htmlFor="customer-packing-slip">
            Customer Packing Slip
          </label>
          <input
            className="form-input"
            {...customerPackingSlip.fields}
            name="customer-packing-slip"
            id="customer-packing-slip"
            placeholder="17896438"
            required
          />
        </div>
        {/* Inline Fields & Button */}
        <div className="flex flex-wrap -mx-3 mb-4 items-end">
          <div className="w-full md:flex-1 px-3 mb-4 md:mb-0">
            <label className="form-label" htmlFor="part-number">
              Part Number
            </label>
            <input
              className="form-input"
              name="part-number"
              id="part-number"
              {...partNumber.fields}
              placeholder="3030-8629"
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
              {...bins.fields}
              placeholder="2"
            />
          </div>
          <div className="w-full md:w-auto px-3">
            <button
              className="btn btn-blue uppercase font-bold w-full max-w-screen-md whitespace-no-wrap"
              type="button"
              onClick={addPart}
            >
              Add Part
            </button>
          </div>
        </div>
        {/* Error Message */}
        <p className="text-center text-red-500 font-semibold text-sm my-3">{error}</p>
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
              {parts.map((part, key) => {
                return (
                  <tr key={key}>
                    <td className="px-6 py-3 whitespace-no-wrap">{part.partNumber}</td>
                    <td className="px-6 py-3 whitespace-no-wrap">{part.quantity}</td>
                    <td className="px-6 py-3 whitespace-no-wrap">{part.bins}</td>
                    <td className="px-6 py-3 whitespace-no-wrap">
                      <TrashIcon
                        className="w-6 h-6 cursor-pointer text-red-600"
                        onClick={() => removePart(key)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            className="btn btn-blue uppercase font-bold w-full max-w-screen-md"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReceivingForm;
