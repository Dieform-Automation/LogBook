import React from 'react';
import Proptypes from 'prop-types';
import useField from '../hooks/useField';

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
    const payload = {
      name: name.fields.value,
      email: email.fields.value,
      phone: phone.fields.value,
      street: street.fields.value,
      city: city.fields.value,
      country: country.fields.value,
      province: province.fields.value,
      postal_code: postalCode.fields.value,
      point_of_contact: contact.fields.value,
    };
    // Validate payload object and then submit
    onSubmit();
    console.log(payload);
  };

  return (
    <form className="p-4 space-y-4" onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="form-label" htmlFor="name">
          Customer Name
        </label>
        <input className="form-input" {...name.fields} name="name" id="name" required />
      </div>
      <div>
        <label className="form-label" htmlFor="contact">
          Point of Contact
        </label>
        <input
          className="form-input"
          {...contact.fields}
          name="contact"
          id="contact"
          required
        />
      </div>
      <div className="flex flex-wrap -mx-3 items-end">
        <div className="w-full md:flex-1 px-3">
          <label className="form-label" htmlFor="phone">
            Phone
          </label>
          <input
            className="form-input"
            {...phone.fields}
            name="phone"
            id="phone"
            required
          />
        </div>
        <div className="w-full md:flex-1 px-3">
          <label className="form-label" htmlFor="email">
            Email
          </label>
          <input
            className="form-input"
            {...email.fields}
            name="email"
            id="email"
            required
          />
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 items-end">
        <div className="w-full md:flex-1 px-3">
          <label className="form-label" htmlFor="street">
            Street
          </label>
          <input
            className="form-input"
            {...street.fields}
            name="street"
            id="street"
            required
          />
        </div>
        <div className="w-full md:flex-1 px-3">
          <label className="form-label" htmlFor="city">
            City
          </label>
          <input className="form-input" {...city.fields} name="city" id="city" required />
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
            required
          />
        </div>
        <div className="w-full md:flex-1 px-3">
          <label className="form-label" htmlFor="country">
            Country
          </label>
          <input
            className="form-input"
            {...country.fields}
            name="country"
            id="country"
            required
          />
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
            required
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
