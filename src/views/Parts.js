import React from 'react';
import { toast } from 'react-toastify';

import useModal from '../hooks/useModal';
import useCreatePart from '../hooks/useCreatePart';
import useParts from '../hooks/useParts';

import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import PartForm from '../components/PartForm';

import Header from '../elements/Header';
import Loader from '../elements/Loader';
import Error from '../elements/Error';
import View from '../elements/View';

const parseData = (parts) => {
  if (parts) {
    return parts.map((p) => {
      return {
        data: p,
        customer: p.customer,
        name: p.name,
        number: p.number,
        purchase_order: p.purchase_order,
      };
    });
  } else {
    return [];
  }
};

const Parts = () => {
  const { data: parts, isLoading, isError } = useParts();
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
        toast.success('Part created');
      },
      onError: (err) => {
        console.log(err);
        toast.error('Failed to create part');
      },
    });
  };

  return isLoading ? (
    <Loader />
  ) : isError ? (
    <Error />
  ) : (
    <View>
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
    </View>
  );
};

export default Parts;
