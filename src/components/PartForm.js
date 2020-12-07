import React from 'react';
import PropTypes from 'prop-types';
import { Form, Formik } from 'formik';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import useCustomers from '../hooks/useCustomers';
import usePurchaseOrders from '../hooks/usePurchaseOrders';
import useCreatePO from '../hooks/useCreatePO';
import useMapToOptions from '../hooks/useMapToOptions';

import Dropdown from '../elements/Dropdown';
import CreatableDropdown from '../elements/CreatableDropdown';
import TextInput from '../elements/TextInput';
import Loader from '../elements/Loader';
import Error from '../elements/Error';

const partSchema = Yup.object().shape({
  number: Yup.string().required('Part Number is required'),
  name: Yup.string().required('Part Name is required'),
  purchase_order_id: Yup.number().required('Purchase Order is required'),
  customer_id: Yup.number().required('Customer is required'),
});

const PartForm = ({ onSubmit }) => {
  const { data: customers, isLoading, isError } = useCustomers();
  const { data: purchaseOrders } = usePurchaseOrders();
  const [createPO] = useCreatePO();

  const customerOptions = React.useMemo(() => useMapToOptions(customers, 'id', 'name'), [
    customers,
  ]);

  const purchaseOrderOptions = React.useMemo(
    () => useMapToOptions(purchaseOrders, 'id', 'number'),
    [purchaseOrders]
  );

  return isLoading ? (
    <Loader />
  ) : isError ? (
    <Error />
  ) : (
    <Formik
      initialValues={{
        customer_id: undefined,
        purchase_order_id: undefined,
        number: '',
        name: '',
      }}
      onSubmit={(values, actions) => {
        partSchema
          .validate(values)
          .then((payload) => {
            onSubmit(payload);
          })
          .catch((err) => {
            console.log(err.errors);
            toast.error(err.errors[0]);
          });
        actions.setSubmitting(false);
      }}
    >
      {({ values }) => (
        <Form className="p-4 space-y-4">
          <Dropdown label="Customer" name="customer_id" options={customerOptions} />
          <CreatableDropdown
            isDisabled={values.customer_id === undefined}
            label="Purchase Order"
            name="purchase_order_id"
            noOptionsMessage="Type to create Purchase Order"
            options={purchaseOrderOptions.filter((option) => {
              return option.data.customer_id === values.customer_id;
            })}
            createOption={(option) => {
              return new Promise((resolve, reject) => {
                const payload = {
                  customer_id: values.customer_id,
                  number: Number(option),
                };
                createPO(payload, {
                  onSuccess: (data) => {
                    const newOption = { label: data.number, value: data.id, data: data };
                    resolve(newOption);
                    console.log(data);
                    toast.success(`Created PO`);
                  },
                  onError: (err) => {
                    reject(err);
                    console.error(err);
                    toast.error('Failed to create purchase order');
                  },
                });
              });
            }}
            resetOnChange={values.customer_id}
          />
          <div className="flex flex-wrap -mx-3 items-end space-y-4 md:space-y-0">
            <TextInput
              label="Part Name"
              name="name"
              type="text"
              placeholder="Rear Axle Mount"
              inline
            />
            <TextInput
              label="Part Number"
              name="number"
              type="text"
              placeholder="875-93A"
              inline
            />
          </div>
          <button className="btn btn-blue uppercase font-bold w-full" type="submit">
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

PartForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
export default PartForm;
