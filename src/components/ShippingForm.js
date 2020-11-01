import React from 'react';
import useField from '../hooks/useField';
import PartTable from './PartTable';
import DropdownArrow from '../assets/dropdown-arrow.svg';

const ShippingForm = () => {
  const date = useField('date');

  const onSubmit = (event) => {
    event.preventDefault();
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
              <DropdownArrow className="h-4 w-4" />
            </div>
          </div>
        </div>
        {/* Shipping Method */}
        <div className="mb-4">
          <label className="form-label" htmlFor="shipping-method">
            Shipping Method
          </label>
          <div className="relative w-full">
            <select
              name="shipping-method"
              id="shipping-method"
              className="shadow appearance-none border rounded w-full px-2 py-2 text-gray-700 border-gray-400 hover:border-gray-500 leading-tight focus:outline-none focus:shadow-outline"
              required
            >
              <option value="Pickup">Pickup</option>
              <option value="Drop Off">Drop Off</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <DropdownArrow className="h-4 w-4" />
            </div>
          </div>
        </div>
        <PartTable />
        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            className="btn btn-green uppercase font-bold w-full max-w-screen-md"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShippingForm;
