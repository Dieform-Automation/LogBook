import React from 'react';
import { useField } from 'formik';
import Select from 'react-select';
import PropTypes from 'prop-types';

const Dropdown = ({ label, name, options, resetOnChange }) => {
  const [selectedOption, setSelectedOption] = React.useState();
  const [field, meta, helpers] = useField(name);
  const { touched, error } = meta;

  React.useEffect(() => {
    helpers.setValue('');
    setSelectedOption(null);
  }, [resetOnChange]);

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    helpers.setValue(selectedOption.value);
    helpers.setTouched(true);
    helpers.setError(undefined);
  };

  return (
    <>
      <label className="form-label" htmlFor={field.name}>
        {label}
      </label>
      <Select
        value={selectedOption}
        options={options}
        name={field.name}
        onChange={(option) => handleChange(option)}
      />
      {error && touched ? <p>{error}</p> : null}
    </>
  );
};

Dropdown.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.number,
    data: PropTypes.object,
  }).isRequired,
  resetOnChange: PropTypes.any,
};

export default Dropdown;
