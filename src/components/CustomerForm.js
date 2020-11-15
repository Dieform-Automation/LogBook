import React from 'react';
import Proptypes from 'prop-types';
import { toast } from 'react-toastify';
import * as yup from 'yup';

import useField from '../hooks/useField';

// RegEx for all valid Canadian postal codes
// /^(?=[^DdFfIiOoQqUu\d\s])[A-Za-z]\d(?=[^DdFfIiOoQqUu\d\s])[A-Za-z]\s{0,1}\d(?=[^DdFfIiOoQqUu\d\s])[A-Za-z]\d$/

// Yup validates keys from last to first
const customerSchema = yup.object().shape({
  postal_code: yup
    .string()
    .matches(
      /^[A-Za-z]\d[A-Za-z]\s{0,1}\d[A-Za-z]\d$/,
      'Please enter a valid postal code'
    )
    .required('Postal code is required'),
  province: yup
    .string()
    .matches(/^[A-Z]{2}$/, 'Please enter a two letter province abbr.')
    .required('Province is required'),
  country: yup.string().required('Country is required'),
  city: yup.string().required('City is required'),
  street: yup.string().required('Street address is required'),
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Email address is required'),
  phone: yup
    .string()
    .matches(
      /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4}$/,
      'Please enter a valid phone number'
    )
    .required('Phone number is required'),
  point_of_contact: yup.string().required('Point of Contact is required'),
  name: yup.string().required('Customer Name is required'),
});

const CustomerForm = ({ onSubmit }) => {
  const name = useField('text');
  const contact = useField('text');
  const phone = useField('tel');
  const email = useField('email');
  const street = useField('text');
  const city = useField('text');
  const province = useField('text');
  const country = useField('text');
  const postalCode = useField('text');

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      name: name.fields.value,
      point_of_contact: contact.fields.value,
      phone: phone.fields.value,
      email: email.fields.value,
      street: street.fields.value,
      city: city.fields.value,
      country: country.fields.value,
      province: province.fields.value,
      postal_code: postalCode.fields.value,
    };
    customerSchema
      .validate(formData)
      .then((payload) => {
        console.log(payload);
        onSubmit(payload);
      })
      .catch((error) => {
        console.log(error.errors);
        toast.error(error.errors[0]);
      });
  };

  return (
    <form className="p-4 space-y-4" onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="form-label" htmlFor="name">
          Customer Name
        </label>
        <input className="form-input" {...name.fields} name="name" id="name" />
      </div>
      {/* FormInput element */}
      <div>
        <label className="form-label" htmlFor="contact">
          Point of Contact
        </label>
        <input className="form-input" {...contact.fields} name="contact" id="contact" />
      </div>

      {/* InlineWrapper*/}
      <div className="flex flex-wrap -mx-3 items-end">
        {/* Inline FormInput element */}
        <div className="w-full md:flex-1 px-3">
          <label className="form-label" htmlFor="phone">
            Phone
          </label>
          <input className="form-input" {...phone.fields} name="phone" id="phone" />
        </div>
        <div className="w-full md:flex-1 px-3">
          <label className="form-label" htmlFor="email">
            Email
          </label>
          <input className="form-input" {...email.fields} name="email" id="email" />
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 items-end">
        <div className="w-full md:flex-1 px-3">
          <label className="form-label" htmlFor="street">
            Street
          </label>
          <input className="form-input" {...street.fields} name="street" id="street" />
        </div>
        <div className="w-full md:flex-1 px-3">
          <label className="form-label" htmlFor="city">
            City
          </label>
          <input className="form-input" {...city.fields} name="city" id="city" />
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 items-end">
        <div className="w-full md:flex-1 px-3">
          <label className="form-label" htmlFor="province">
            Province
          </label>
          <input
            className="form-input"
            {...province.fields}
            name="province"
            id="province"
          />
        </div>
        <div className="w-full md:flex-1 px-3">
          <label className="form-label" htmlFor="country">
            Country
          </label>
          <input className="form-input" {...country.fields} name="country" id="country" />
        </div>
        <div className="w-full md:flex-1 px-3">
          <label className="form-label" htmlFor="postal-code">
            Postal Code
          </label>
          <input
            className="form-input"
            {...postalCode.fields}
            name="postal-code"
            id="postal-code"
          />
        </div>
      </div>
      <button className="btn btn-blue uppercase font-bold w-full" type="submit">
        Submit
      </button>
    </form>
  );
};

CustomerForm.propTypes = {
  onSubmit: Proptypes.func,
};

export default CustomerForm;
