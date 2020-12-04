import React from 'react';
import { Form, Formik } from 'formik';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import useCustomers from '../hooks/useCustomers';
import useMapToOptions from '../hooks/useMapToOptions';
import usePartTable from '../hooks/usePartTable';
import useCreateRecOrder from '../hooks/useCreateRecOrder';

import PartTable from './PartTable';

import Loader from '../elements/Loader';
import TextInput from '../elements/TextInput';
import Dropdown from '../elements/Dropdown';
import Error from '../elements/Error';

const receivingSchema = Yup.object().shape({
  received_parts: Yup.array().min(1, 'At least one part is required').required(),
  customer_packing_slip: Yup.string().required('Customer Packing Slip is required'),
  customer_id: Yup.number().required('Customer is required'),
  date: Yup.string().required('Date is required'),
});

const ReceivingForm = () => {
  const { partList, resetPartList } = usePartTable();
  const { data: customers, isLoading, isError } = useCustomers();
  const [createRecOrder] = useCreateRecOrder();
  const customerOptions = React.useMemo(() => useMapToOptions(customers, 'id', 'name'), [
    customers,
  ]);

  return isLoading ? (
    <Loader />
  ) : isError ? (
    <Error />
  ) : (
    <div className="w-full shadow p-8 bg-white rounded-lg ">
      <Formik
        initialValues={{
          customer_id: undefined,
          date: '',
          customer_packing_slip: '',
        }}
        onSubmit={(values, actions) => {
          values.received_parts = partList;
          receivingSchema
            .validate(values)
            .then((payload) => {
              // Validation Successful
              createRecOrder(payload, {
                onSuccess: () => {
                  // API Request Successful
                  actions.resetForm();
                  resetPartList();
                  toast.success('Receiving order submitted');
                },
                onError: (err) => {
                  // API Request Failed
                  console.log(err);
                  toast.error('Failed to create receiving order');
                },
              });
            })
            .catch((err) => {
              // Validation Failed
              console.log(err.errors);
              toast.error(err.errors[0]);
            });
          actions.setSubmitting(false);
        }}
      >
        {({ values }) => (
          <Form className="space-y-4">
            <TextInput label="Date" name="date" type="date" data-testid="date" />
            <Dropdown label="Customer" name="customer_id" options={customerOptions} />
            <TextInput
              label="Customer Packing Slip"
              name="customer_packing_slip"
              type="text"
              placeholder="73648264"
              data-testid="packing-slip"
            />
            {values.customer_id !== undefined ? (
              <PartTable customerId={values.customer_id} />
            ) : null}
            <button className="btn btn-blue uppercase font-bold w-full" type="submit">
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ReceivingForm;
