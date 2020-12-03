/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React, { Fragment } from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const borderColor = '#90e5fc';
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    borderBottomColor: '#bff0fd',
    borderBottomWidth: 1,
    alignItems: 'center',
    height: 24,
    fontStyle: 'bold',
    color: 'white',
  },
  itemNo: {
    width: '15%',
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
  partNumber: {
    width: '30%',
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
  po: {
    width: '25%',
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
  qty: {
    width: '15%',
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
  bins: {
    width: '15%',
  },
});

const TableBlankSpace = ({ rowsCount }) => {
  const blankRows = Array(rowsCount).fill(0);
  const rows = blankRows.map((x, i) => (
    <View style={styles.row} key={`BR${i}`}>
      <Text style={styles.itemNo}>-</Text>
      <Text style={styles.partNumber}>-</Text>
      <Text style={styles.po}>-</Text>
      <Text style={styles.qty}>-</Text>
      <Text style={styles.bins}>-</Text>
    </View>
  ));
  return <Fragment>{rows}</Fragment>;
};

export default TableBlankSpace;
