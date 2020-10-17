import React, { useEffect, useState } from 'react';
import useField from '../hooks/useField';
import usePartStore from '../hooks/usePartStore';
import Header from './Header';
import PartTable from './PartTable';
import DropdownArrow from '../assets/dropdown-arrow.svg';
import useCustomers from '../hooks/useCustomers';

const ReceivingForm = () => {
  const [customerId, setCustomerId] = useState();
  const customerPackingSlip = useField('text');
  const date = useField('date');
  const parts = usePartStore((state) => state.parts);
  const { data: customers, status, error } = useCustomers();

  useEffect(() => {
    if (customers && !customerId) {
      setCustomerId(customers[0].id);
    }
  }, [customers]);

  const onSubmit = (event) => {
    event.preventDefault();
    const payload = {
      customerId,
      customerPackingSlip: customerPackingSlip.fields.value,
      date: date.fields.value,
      received_parts: [...parts],
    };
    console.log(payload);
  };

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'error') return <div>Error {error.message}</div>;

  return (
    <section>
      <Header title="Receiving" />
      <div className="shadow-md w-full max-w-3xl bg-white rounded-lg">
        <form className="px-8 py-6" onSubmit={onSubmit}>
          {/* Date */}
          <div className="mb-4">
            <label className="form-label" htmlFor="date">
              Date
            </label>
            <input
              className="form-input"
              {...date.fields}
              name="date"
              id="date"
              required
            />
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
                value={customerId}
                onChange={(event) => setCustomerId(Number(event.target.value))}
              >
                {customers.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.name}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <DropdownArrow className="h-4 w-4" />
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
    </section>
  );
};

export default ReceivingForm;
