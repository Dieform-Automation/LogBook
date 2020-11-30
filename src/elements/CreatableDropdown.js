import React from 'react';
import CreatableSelect from 'react-select/creatable';
import PropTypes from 'prop-types';
import { useField } from 'formik';

const CreatableDropdown = ({
  label,
  name,
  options,
  createOption,
  isDisabled,
  resetOnChange,
}) => {
  const [selectedOption, setSelectedOption] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);
  const [field, , helpers] = useField(name);

  React.useEffect(() => {
    helpers.setValue(undefined);
    setSelectedOption(null);
  }, [resetOnChange]);

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
      case 'create-option':
        setIsLoading(true);
        createOption(selectedOption.label)
          .then((newOption) => {
            console.log(newOption);
            setSelectedOption(newOption);
            helpers.setValue(newOption.value);
            setIsLoading(false);
          })
          .catch(() => {
            setSelectedOption(null);
            helpers.setValue(undefined);
            setIsLoading(false);
          });
        break;
      default:
        break;
    }
  };

  return (
    <>
      <label className="form-label" id={field.name} htmlFor={field.name}>
        {label}
      </label>
      <CreatableSelect
        value={selectedOption}
        options={options}
        name={field.name}
        isLoading={isLoading}
        isDisabled={isDisabled}
        onChange={handleChange}
        isClearable={true}
        aria-labelledby={field.name}
      />
    </>
  );
};

CreatableDropdown.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.any,
      value: PropTypes.any,
      data: PropTypes.object,
    })
  ).isRequired,
  createOption: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool,
  resetOnChange: PropTypes.any,
};

export default CreatableDropdown;
