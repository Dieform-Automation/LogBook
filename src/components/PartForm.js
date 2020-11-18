import React from 'react';
import { Form, Formik } from 'formik';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import useCustomers from '../hooks/useCustomers';
import usePurchaseOrders from '../hooks/usePurchaseOrders';
import useCreatePO from '../hooks/useCreatePO';
import useMapToOptions from '../hooks/useMapToOptions';
import Dropdown from '../elements/Dropdown';
import CreatableDropdown from '../elements/CreatableDropdown';
import TextInput from '../elements/TextInput';
import Loader from '../elements/Loader';
import Error from '../elements/Error';

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
        customer_id: '',
        purchase_order_id: '',
        number: '',
        name: '',
      }}
      onSubmit={(values, actions) => {
        onSubmit(values);
        actions.setSubmitting(false);
      }}
    >
      {({ values }) => (
        <Form className="p-4 space-y-4">
          <Dropdown label="Customer" name="customer_id" options={customerOptions} />
          <CreatableDropdown
            isDisabled={values.customer_id === ''}
            label="Purchase Order"
            name="purchase_order_id"
            options={purchaseOrderOptions.filter((option) => {
              return option.data.customer_id === values.customer_id;
            })}
            onCreate={(option) => {
              const payload = {
                customer_id: values.customer_id,
                number: Number(option),
              };
              createPO(payload, {
                onError: (err) => {
                  toast.error('Failed to create purchase order');
                  console.error(err);
                },
              });
            }}
            resetOnChange={values.customer_id}
          />
          <div className="flex flex-wrap -mx-3 items-end">
            <TextInput label="Part Name" name="name" type="text" inline />
            <TextInput label="Part Number" name="number" type="text" inline />
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
  onSubmit: PropTypes.func,
};
export default PartForm;
