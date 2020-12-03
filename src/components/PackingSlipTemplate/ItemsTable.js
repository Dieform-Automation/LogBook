import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from '@react-pdf/renderer';

import TableHeader from './TableHeader';
import TableRow from './TableRow';

const styles = StyleSheet.create({
  tableContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 24,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderColor: '#E5E7EB',
  },
});

const ItemsTable = ({ shipment }) => (
  <View style={styles.tableContainer}>
    <TableHeader />
    {shipment.shipped_parts.map((part, i) => (
      <TableRow item={part} key={i} number={i + 1} />
    ))}
  </View>
);

ItemsTable.propTypes = {
  shipment: PropTypes.object.isRequired,
};
export default ItemsTable;
