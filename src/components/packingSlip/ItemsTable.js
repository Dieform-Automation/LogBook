/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React from 'react';
import { View, StyleSheet } from '@react-pdf/renderer';
import TableHeader from './TableHeader';
import TableRow from './TableRow';
import TableBlankSpace from './TableBlankSpace';

const tableRowsCount = 6;

const styles = StyleSheet.create({
  tableContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 24,
    borderWidth: 1,
    borderColor: '#bff0fd',
  },
});

const ItemsTable = ({ shipment }) => (
  <View style={styles.tableContainer}>
    <TableHeader />
    <TableRow items={shipment.shipped_parts} />
    <TableBlankSpace rowsCount={tableRowsCount - shipment.shipped_parts.length} />
  </View>
);

export default ItemsTable;
