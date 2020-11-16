import React from 'react';
import { Form, Formik } from 'formik';
import useCustomers from '../hooks/useCustomers';
import usePurchaseOrders from '../hooks/usePurchaseOrders';
import Dropdown from './Dropdown';

const mapCustomersToOptions = (customers) => {
  if (customers) {
    return customers.map((c) => ({
      label: c.name,
      value: c.id,
      data: c,
    }));
  }
  return [];
};

const mapPurchaseOrderToOptions = (purchaseOrders) => {
  if (purchaseOrders) {
    return purchaseOrders.map((order) => ({
      label: order.number,
      value: order.id,
      data: order,
    }));
  }
  return [];
};

const PartForm = () => {
  const { data: customers, isLoading } = useCustomers();
  const { data: purchaseOrders } = usePurchaseOrders();

  const customerOptions = React.useMemo(() => mapCustomersToOptions(customers), [
    customers,
  ]);

  const purchaseOrderOptions = React.useMemo(
    () => mapPurchaseOrderToOptions(purchaseOrders),
    [purchaseOrders]
  );

  return isLoading ? (
    <span>Loading...</span>
  ) : (
    <Formik
      initialValues={{
        customer_id: '',
        purchase_order_id: '',
        number: '',
        name: '',
      }}
      onSubmit={(values, actions) => {
        alert(JSON.stringify(values, null, 2));
        actions.setSubmitting(false);
      }}
    >
      {({ values }) => (
        <Form className="p-4 space-y-4">
          <Dropdown label="Customer" name="customer_id" options={customerOptions} />
          <Dropdown
            label="Purchase Order"
            name="purchase_order_id"
            options={purchaseOrderOptions.filter((option) => {
              return option.data.customer_id === values.customer_id;
            })}
            resetOnChange={values.customer_id}
          />

          <button className="btn btn-blue uppercase font-bold w-full" type="submit">
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default PartForm;
