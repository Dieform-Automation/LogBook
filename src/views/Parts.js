import React from 'react';

import useModal from '../hooks/useModal';
import DataTable from '../components/DataTable';
import Header from '../components/Header';
import Modal from '../components/Modal';
import PartForm from '../components/PartForm';

const Parts = () => {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Customer',
        accessor: 'customer',
      },
      {
        Header: 'Part Name',
        accessor: 'name',
      },
      {
        Header: 'Part Number',
        accessor: 'number',
      },
      {
        Header: 'Purchase Order',
        accessor: 'purchase_order',
      },
    ],
    []
  );
  const data = React.useMemo(
    () => [
      {
        customer: 'Cool Corp',
        name: 'Left Flange Plate',
        number: '12131',
        purchase_order: '8462',
      },
    ],
    []
  );
  const { isShowing, toggle } = useModal();

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center">
        <Header title="Parts" />
        <button className="btn btn-blue" onClick={toggle}>
          Add Part
        </button>
      </div>
      <Modal isShowing={isShowing} hide={toggle} title="Add Part">
        <PartForm />
      </Modal>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default Parts;
