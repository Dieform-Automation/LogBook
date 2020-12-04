import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import useParts from '../hooks/useParts';
import useMapToOptions from '../hooks/useMapToOptions';
import usePartTable from '../hooks/usePartTable';
import Loader from '../elements/Loader';
import Dropdown from '../elements/Dropdown';
import TextInput from '../elements/TextInput';
import Error from '../elements/Error';
import TrashIcon from '../assets/trash.svg';

const PartTableSchema = Yup.object().shape({
  bins: Yup.string()
    .matches(/^[0-9]*$/, 'Bins must be a number')
    .required('Bins is required'),
  quantity: Yup.string()
    .matches(/^[0-9]*$/, 'Quantity must be a number')
    .required('Quantity is required'),
  part_id: Yup.number().required('Part Number is required'),
});

const PartTable = ({ customerId }) => {
  const { partList, addPart, removePart } = usePartTable();
  const { data: parts, isLoading, isError } = useParts(customerId);
  const isShipping = useRouteMatch('/shipping');

  const partOptions = React.useMemo(() => useMapToOptions(parts, 'id', 'number'), [
    parts,
  ]);

  const handleSubmit = (formValues, resetForm) => {
    PartTableSchema.validate(formValues)
      .then((value) => {
        const part = {
          partNumber: partOptions.find((opt) => opt.value === value.part_id).label,
          part_id: value.part_id,
          quantity: Number(value.quantity),
          bins: Number(value.bins),
        };
        addPart(part);
        resetForm();
      })
      .catch((err) => {
        toast.error(err.errors[0]);
      });
  };

  return isLoading ? (
    <Loader />
  ) : isError ? (
    <Error />
  ) : (
    <>
      <Formik initialValues={{ part_id: undefined, quantity: '', bins: '' }}>
        {({ values, resetForm }) => (
          <div className="flex flex-wrap -mx-3 items-end space-y-4 md:space-y-0">
            <Dropdown
              label="Part Number"
              name="part_id"
              options={partOptions}
              resetOnChange={customerId}
              inline
            />
            <TextInput label="Quantity" name="quantity" inline data-testid="quantity" />
            <TextInput label="Number of Bins" name="bins" inline data-testid="bins" />
            <div className="w-full md:w-auto px-3">
              <button
                className={`${
                  isShipping ? 'btn-green' : 'btn-blue'
                } btn uppercase font-bold w-full whitespace-no-wrap`}
                type="button"
                data-testid="add-part-btn"
                onClick={() => handleSubmit(values, resetForm)}
              >
                Add Part
              </button>
            </div>
          </div>
        )}
      </Formik>
      {/* Part Table */}
      <div className=" overflow-x-auto border border-gray-400 rounded mb-6">
        <table className="min-w-full divide-y divide-gray-400">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                Part Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                Quantity
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                Bins
              </th>
              <th className="py-3 w-6"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {partList.map((part, key) => {
              return (
                <tr key={key}>
                  <td className="px-6 py-3 whitespace-no-wrap">{part.partNumber}</td>
                  <td className="px-6 py-3 whitespace-no-wrap">{part.quantity}</td>
                  <td className="px-6 py-3 whitespace-no-wrap">{part.bins}</td>
                  <td className="px-6 py-3 whitespace-no-wrap">
                    <TrashIcon
                      className="w-6 h-6 cursor-pointer text-red-600"
                      onClick={() => removePart(key)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

PartTable.propTypes = {
  customerId: PropTypes.number,
};
export default PartTable;
