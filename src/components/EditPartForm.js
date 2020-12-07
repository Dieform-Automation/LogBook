import React from 'react';
import PropTypes from 'prop-types';
import { Form, Formik } from 'formik';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import TextInput from '../elements/TextInput';

const partSchema = Yup.object().shape({
  name: Yup.string().required('Part Name is required'),
});

const EditPartForm = ({ onSubmit, part }) => {
  return (
    <Formik
      initialValues={part}
      onSubmit={(values, actions) => {
        partSchema
          .validate(values)
          .then((payload) => onSubmit(payload))
          .catch((err) => toast.error(err.errors[0]));
        actions.setSubmitting(false);
      }}
    >
      <Form className="p-4 space-y-4">
        <TextInput label="Part Name" name="name" type="text" />
        <button className="btn btn-blue uppercase font-bold w-full" type="submit">
          Submit
        </button>
      </Form>
    </Formik>
  );
};

EditPartForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  part: PropTypes.object,
};

export default EditPartForm;
