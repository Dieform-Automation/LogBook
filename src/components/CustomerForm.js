import React from 'react';
import Proptypes from 'prop-types';
import { toast } from 'react-toastify';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import TextInput from '../elements/TextInput';

// RegEx for all valid Canadian postal codes
// /^(?=[^DdFfIiOoQqUu\d\s])[A-Za-z]\d(?=[^DdFfIiOoQqUu\d\s])[A-Za-z]\s{0,1}\d(?=[^DdFfIiOoQqUu\d\s])[A-Za-z]\d$/

// Yup validates keys from last to first
const customerSchema = Yup.object().shape({
  postal_code: Yup.string()
    .matches(
      /^[A-Za-z]\d[A-Za-z]\s{0,1}\d[A-Za-z]\d$/,
      'Please enter a valid postal code'
    )
    .required('Postal code is required'),
  country: Yup.string().required('Country is required'),
  province: Yup.string()
    .matches(/^[A-Z]{2}$/, 'Please enter a two letter province abbr.')
    .required('Province is required'),
  city: Yup.string().required('City is required'),
  street: Yup.string().required('Street address is required'),
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email address is required'),
  phone: Yup.string()
    .matches(
      /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4}$/,
      'Please enter a valid phone number'
    )
    .required('Phone number is required'),
  point_of_contact: Yup.string().required('Point of Contact is required'),
  name: Yup.string().required('Customer Name is required'),
});

const CustomerForm = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{
        name: '',
        point_of_contact: '',
        phone: '',
        email: '',
        street: '',
        city: '',
        country: '',
        province: '',
        postal_code: '',
      }}
      onSubmit={(values, actions) => {
        customerSchema
          .validate(values)
          .then((payload) => {
            console.log(payload);
            onSubmit(payload);
          })
          .catch((error) => {
            console.log(error.errors);
            toast.error(error.errors[0]);
          });
        actions.setSubmitting(false);
      }}
    >
      <Form className="p-4 space-y-4">
        <TextInput label="Company" name="name" type="text" placeholder="ACME Inc." />
        <TextInput
          label="Point of Contact"
          name="point_of_contact"
          type="text"
          placeholder="John Smith"
        />
        <div className="flex flex-wrap -mx-3 items-end space-y-4 md:space-y-0">
          <TextInput
            label="Phone"
            name="phone"
            type="text"
            placeholder="2865489937"
            inline
          />
          <TextInput
            label="Email"
            name="email"
            type="email"
            placeholder="john@acme.com"
            inline
          />
        </div>
        <div className="flex flex-wrap -mx-3 items-end space-y-4 md:space-y-0">
          <TextInput
            label="Street"
            name="street"
            type="text"
            placeholder="197 Woodchester Drive"
            inline
          />
          <TextInput label="City" name="city" type="text" placeholder="Ottawa" inline />
        </div>
        <div className="flex flex-wrap -mx-3 items-end space-y-4 md:space-y-0">
          <TextInput
            label="Province"
            name="province"
            type="text"
            placeholder="ON"
            inline
          />
          <TextInput
            label="Country"
            name="country"
            type="text"
            placeholder="Canada"
            inline
          />
          <TextInput
            label="Postal Code"
            name="postal_code"
            type="text"
            placeholder="L5J2T9"
            inline
          />
        </div>
        <button className="btn btn-blue uppercase font-bold w-full" type="submit">
          Submit
        </button>
      </Form>
    </Formik>
  );
};

CustomerForm.propTypes = {
  onSubmit: Proptypes.func,
};

export default CustomerForm;
