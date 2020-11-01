import React, { useState } from 'react';
import Select from 'react-select';

import useField from '../hooks/useField';
import useGlobalState from '../hooks/useGlobalState';
import useCustomers from '../hooks/useCustomers';

import PartTable from './PartTable';

const ReceivingForm = () => {
  const [selectedCustomer, setSelectedCustomer] = useState();
  const customerPackingSlip = useField('text');
  const date = useField('date');

  const [receivedParts, resetRecParts] = useGlobalState((state) => [
    state.receivedParts,
    state.resetRecParts,
  ]);

  const customersQuery = useCustomers();

  const onSubmit = (event) => {
    event.preventDefault();
    const payload = {
      customer_id: selectedCustomer.value,
      customer_packing_slip: customerPackingSlip.fields.value,
      date: date.fields.value,
      received_parts: receivedParts.map((part) => {
        return {
          part_id: part.id,
          part_quantity: part.quantity,
          bins: part.bins,
        };
      }),
    };
    console.log(payload);
  };

  return (
    <section>
      {customersQuery.isLoading ? (
        <span>Loading...</span>
      ) : (
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
                options={customersQuery.data.map((c) => ({ value: c.id, label: c.name }))}
                onChange={(option) => {
                  let shouldChange = true;
                  if (receivedParts.length > 0) {
                    shouldChange = confirm(
                      'Changing customers will remove existing part entries. Are you sure?'
                    );
                  }
                  if (shouldChange) {
                    resetRecParts();
                    setSelectedCustomer(option);
                  }
                }}
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
            {selectedCustomer && <PartTable customerId={selectedCustomer.value} />}
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
      )}
    </section>
  );
};

export default ReceivingForm;
