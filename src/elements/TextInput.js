import { useField } from 'formik';
import React from 'react';
import PropTypes from 'prop-types';

const TextInput = ({ label, inline, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div className={inline ? 'w-full md:flex-1 px-3' : ''}>
      <label className="form-label" htmlFor={name}>
        {label}
      </label>
      <input className="form-input" {...field} {...props} />
      {meta.touched && meta.error ? <span>{meta.error}</span> : null}
    </div>
  );
};

TextInput.propTypes = {
  label: PropTypes.string.isRequired,
  inline: PropTypes.bool,
};
export default TextInput;
