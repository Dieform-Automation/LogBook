/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React from 'react';
import { toast } from 'react-toastify';

import useModal from '../hooks/useModal';
import useCreatePart from '../hooks/useCreatePart';
import useUpdatePart from '../hooks/useUpdatePart';
import useParts from '../hooks/useParts';

import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import PartForm from '../components/PartForm';
import EditPartForm from '../components/EditPartForm';

import Header from '../elements/Header';
import Loader from '../elements/Loader';
import Error from '../elements/Error';
import View from '../elements/View';

import Edit from '../assets/edit.svg';

const Parts = () => {
  const { data: parts, isLoading, isError } = useParts();
  const [createPart] = useCreatePart();
  const [updatePart] = useUpdatePart();
  const [editPart, setEditPart] = React.useState(undefined);

  const columns = React.useMemo(
    () => [
      {
        id: 'name',
        Header: 'Part Name',
        accessor: 'name',
      },
      {
        id: 'number',
        Header: 'Part Number',
        accessor: 'number',
      },
      {
        id: 'purchase_order',
        Header: 'Purchase Order',
        accessor: 'purchase_order',
      },
      {
        id: 'customer',
        Header: 'Customer',
        accessor: 'customer',
      },
      {
        id: 'edit',
        Header: 'Edit',
        Cell: ({ row }) => {
          const part = row.original;
          const onClick = () => {
            setEditPart(part);
            toggleEdit();
          };
          return (
            <Edit
              onClick={onClick}
              className="cursor-pointer text-gray-500 hover:text-blue-500 w-6 h-6"
            />
          );
        },
      },
    ],
    []
  );
  const data = React.useMemo(() => (parts ? parts : []), [parts]);
  const { isShowing: isShowingAdd, toggle: toggleAdd } = useModal();
  const { isShowing: isShowingEdit, toggle: toggleEdit } = useModal();

  const handleSubmitAdd = (payload) => {
    createPart(payload, {
      onSuccess: () => {
        toggleAdd();
        toast.success('Part created');
      },
      onError: (err) => {
        console.log(err);
        toast.error('Failed to create part');
      },
    });
  };

  const handleSubmitEdit = (payload) => {
    updatePart(payload, {
      onSuccess: () => {
        toggleEdit();
        toast.success('Part Updated');
      },
      onError: (err) => {
        console.log(err);
        toast.error('Failed to update part');
      },
    });
    console.log(payload);
  };

  return isLoading ? (
    <Loader />
  ) : isError ? (
    <Error />
  ) : (
    <View>
      <div className="flex justify-between items-center">
        <Header title="Parts" />
        <button className="btn btn-blue" onClick={toggleAdd}>
          Add Part
        </button>
      </div>
      <DataTable columns={columns} data={data} />
      <Modal isShowing={isShowingAdd} hide={toggleAdd} title="Add Part">
        <PartForm onSubmit={handleSubmitAdd} />
      </Modal>
      <Modal isShowing={isShowingEdit} hide={toggleEdit} title="Edit Part">
        <EditPartForm onSubmit={handleSubmitEdit} part={editPart} />
      </Modal>
    </View>
  );
};

export default Parts;
