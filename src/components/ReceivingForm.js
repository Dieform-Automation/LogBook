import React from 'react';
import useField from '../hooks/useField';
import usePartStore from '../hooks/usePartStore';
import PartTable from './PartTable';

const ReceivingForm = () => {
  const date = useField('date');
  const customerPackingSlip = useField('text');
  const parts = usePartStore((state) => state.parts);

  const onSubmit = (event) => {
    event.preventDefault();
    console.log(parts);
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
        <PartTable />
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
