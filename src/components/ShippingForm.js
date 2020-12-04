import React, { useState } from 'react';
import { Form, Formik } from 'formik';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import useCustomers from '../hooks/useCustomers';
import useMapToOptions from '../hooks/useMapToOptions';
import usePartTable from '../hooks/usePartTable';
import useCreateShipment from '../hooks/useCreateShipment';
import useModal from '../hooks/useModal';

import PartTable from './PartTable';
import ShipmentConfirmation from './ShipmentConfirmation';
import Modal from './Modal';

import Loader from '../elements/Loader';
import TextInput from '../elements/TextInput';
import Dropdown from '../elements/Dropdown';
import Error from '../elements/Error';

const shippingOptions = [
  {
    label: 'Pickup',
    value: 'Pickup',
  },
  {
    label: 'Drop Off',
    value: 'Drop Off',
  },
];

const shipmentSchema = Yup.object().shape({
  shipped_parts: Yup.array().min(1, 'At least one part is required').required(),
  shipping_method: Yup.string().required('Shipping Method is required'),
  customer_id: Yup.number().required('Customer is required'),
  date: Yup.string().required('Date is required'),
});

const ShippingForm = () => {
  const { partList, resetPartList } = usePartTable();
  const { isShowing, toggle } = useModal();
  const [shipment, setShipment] = useState({});
  const { data: customers, isLoading, isError } = useCustomers();
  const [createShipment] = useCreateShipment();
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
          shipping_method: undefined,
        }}
        onSubmit={(values, actions) => {
          values.shipped_parts = partList;
          shipmentSchema
            .validate(values)
            .then((payload) => {
              // Validation Successful
              createShipment(payload, {
                onSuccess: (data) => {
                  // API Request Successful
                  actions.resetForm();
                  resetPartList();
                  setShipment(data);
                  toggle();
                },
                onError: (err) => {
                  // API Request Failed
                  console.log(err);
                  toast.error('Failed to create shipment');
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
            <TextInput label="Date" name="date" type="date" />
            <Dropdown label="Customer" name="customer_id" options={customerOptions} />
            <Dropdown
              label="Shipping Method"
              name="shipping_method"
              options={shippingOptions}
            />
            {values.customer_id !== undefined ? (
              <PartTable customerId={values.customer_id} />
            ) : null}
            <button className="btn btn-green uppercase font-bold w-full" type="submit">
              Submit
            </button>
          </Form>
        )}
      </Formik>
      <Modal isShowing={isShowing} hide={toggle} title="Shipment Created">
        <ShipmentConfirmation shipment={shipment} />
      </Modal>
    </div>
  );
};

export default ShippingForm;
