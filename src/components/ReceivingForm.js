import React, { useEffect, useState } from 'react';
import Select from 'react-select';

import useField from '../hooks/useField';
import usePartStore from '../hooks/usePartStore';
import Header from './Header';
import PartTable from './PartTable';
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

  const options = customers.map((customer) => ({
    value: customer.id,
    label: customer.name,
  }));

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
            <Select
              className="shadow"
              options={options}
              defaultValue={options[0]}
              onChange={(option) => setCustomerId(option.value)}
            />
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
