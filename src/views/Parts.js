import React from 'react';

import useModal from '../hooks/useModal';
import DataTable from '../components/DataTable';
import Header from '../components/Header';
import Modal from '../components/Modal';
import PartForm from '../components/PartForm';
import useCreatePart from '../hooks/useCreatePart';
import useParts from '../hooks/useParts';

const parseData = (parts) => {
  if (parts) {
    return parts.map((p) => {
      return {
        ...p,
        customer: p.customer_id,
        name: p.name,
        number: p.number,
        purchase_order: p.purchase_order_id,
      };
    });
  } else {
    return [];
  }
};

const Parts = () => {
  const { data: parts, isLoading } = useParts();
  const [createPart] = useCreatePart();

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
  const data = React.useMemo(() => parseData(parts), [parts]);
  const { isShowing, toggle } = useModal();

  const handleSubmit = (payload) => {
    createPart(payload, {
      onSuccess: () => {
        toggle();
      },
      onError: (err) => {
        console.log(err);
        alert(err.message);
      },
    });
  };

  return isLoading ? (
    <span>Loading...</span>
  ) : (
    <div className="container mx-auto">
      <div className="flex justify-between items-center">
        <Header title="Parts" />
        <button className="btn btn-blue" onClick={toggle}>
          Add Part
        </button>
      </div>
      <Modal isShowing={isShowing} hide={toggle} title="Add Part">
        <PartForm onSubmit={handleSubmit} />
      </Modal>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default Parts;
