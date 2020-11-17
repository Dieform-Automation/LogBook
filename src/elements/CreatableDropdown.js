import { useField } from 'formik';
import React from 'react';
import CreatableSelect from 'react-select/creatable';
import PropTypes from 'prop-types';

const CreatableDropdown = ({
  label,
  name,
  options,
  onCreate,
  isDisabled,
  resetOnChange,
}) => {
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
      <CreatableSelect
        value={selectedOption}
        options={options}
        name={field.name}
        isDisabled={isDisabled}
        onChange={(option) => handleChange(option)}
        onCreateOption={(opt) => onCreate(opt)}
      />
      {error && touched ? <p>{error}</p> : null}
    </>
  );
};

CreatableDropdown.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.any,
      value: PropTypes.number,
      data: PropTypes.object,
    })
  ).isRequired,
  onCreate: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool,
  resetOnChange: PropTypes.any,
};

export default CreatableDropdown;
