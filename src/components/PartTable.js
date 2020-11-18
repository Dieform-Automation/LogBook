import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Form, Formik } from 'formik';

import useParts from '../hooks/useParts';
import useMapToOptions from '../hooks/useMapToOptions';
import usePartTable from '../hooks/usePartTable';
import Loader from '../elements/Loader';
import Dropdown from '../elements/Dropdown';
import TextInput from '../elements/TextInput';
import Error from '../elements/Error';
import TrashIcon from '../assets/trash.svg';

const PartTable = ({ customerId }) => {
  const { partList, addPart, removePart } = usePartTable();
  const { data: parts, isLoading, isError } = useParts(customerId);
  const isShipping = useRouteMatch('/shipping');

  const partOptions = React.useMemo(() => useMapToOptions(parts, 'id', 'number'), [
    parts,
  ]);

  return isLoading ? (
    <Loader />
  ) : isError ? (
    <Error />
  ) : (
    <>
      <Formik
        initialValues={{ part_id: '', quantity: '', bins: '' }}
        onSubmit={(values, actions) => {
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
          addPart({
            partNumber: partOptions.find((p) => p.value === values.part_id).label,
            ...values,
          });

          actions.resetForm();
        }}
      >
        {() => (
          <Form>
            <div className="flex flex-wrap -mx-3 items-end space-y-4 md:space-y-0">
              <Dropdown
                label="Part Number"
                name="part_id"
                options={partOptions}
                resetOnChange={partList}
                inline
              />
              <TextInput label="Quantity" name="quantity" inline />
              <TextInput label="Number of Bins" name="bins" inline />
              <div className="w-full md:w-auto px-3">
                <button
                  className={`${
                    isShipping ? 'btn-green' : 'btn-blue'
                  } btn uppercase font-bold w-full max-w-screen-md whitespace-no-wrap`}
                  type="submit"
                  data-testid="add-part-btn"
                >
                  Add Part
                </button>
              </div>
            </div>
          </Form>
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
