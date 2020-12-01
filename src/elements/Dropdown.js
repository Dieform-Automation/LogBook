import React from 'react';
import { useField } from 'formik';
import Select from 'react-select';
import PropTypes from 'prop-types';

const Dropdown = ({ label, name, options, resetOnChange, inline }) => {
  const [selectedOption, setSelectedOption] = React.useState();

  // The second comma is used to skip the second element of the array
  // It is NOT A TYPO
  const [field, , helpers] = useField(name);

  React.useEffect(() => {
    helpers.setValue(undefined);
  }, [resetOnChange]);

  React.useEffect(() => {
    if (field.value === undefined) {
      setSelectedOption(null);
    }
  }, [field]);

  const handleChange = (selectedOption, { action }) => {
    console.log(selectedOption, action);
    switch (action) {
      case 'select-option':
        setSelectedOption(selectedOption);
        helpers.setValue(selectedOption.value);
        helpers.setTouched(true);
        helpers.setError(undefined);
        break;
      case 'clear':
        setSelectedOption(null);
        helpers.setValue(undefined);
        helpers.setError(undefined);
        break;
      default:
        break;
    }
  };

  return (
    <div className={inline ? 'w-full md:flex-1 px-3' : ''}>
      <label className="form-label" id={field.name} htmlFor={field.name}>
        {label}
        <span className="text-red-600 text-lg">*</span>
      </label>
      <Select
        value={selectedOption}
        options={options}
        name={field.name}
        onChange={handleChange}
        isClearable={true}
        aria-labelledby={field.name}
      />
    </div>
  );
};

Dropdown.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.any,
      value: PropTypes.any,
      data: PropTypes.object,
    })
  ).isRequired,
  resetOnChange: PropTypes.any,
  inline: PropTypes.bool,
};

export default Dropdown;
