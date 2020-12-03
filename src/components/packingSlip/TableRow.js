/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
/* eslint-disable no-unused-vars */
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
  },
  itemNo: {
    width: '15%',
    textAlign: 'center',
    borderRightColor: borderColor,
    borderRightWidth: 1,
    marginTop: '5px',
  },
  partNumber: {
    width: '30%',
    borderRightColor: borderColor,
    borderRightWidth: 1,
    textAlign: 'center',
    marginTop: '5px',
  },
  po: {
    width: '25%',
    borderRightColor: borderColor,
    borderRightWidth: 1,
    textAlign: 'center',
    marginTop: '5px',
  },
  qty: {
    width: '15%',
    borderRightColor: borderColor,
    borderRightWidth: 1,
    textAlign: 'center',
    marginTop: '5px',
  },
  bins: {
    width: '15%',
    textAlign: 'center',
    marginTop: '5px',
  },
});

const TableRow = ({ items }) => {
  const rows = items.map((item, key) => (
    <View style={styles.row} key={key}>
      <Text style={styles.itemNo}>{key}</Text>
      <Text style={styles.partNumber}>{item.part_number}</Text>
      <Text style={styles.po}>{item.purchase_order.toString()}</Text>
      <Text style={styles.qty}>{item.quantity.toString()}</Text>
      <Text style={styles.bins}>{item.bins.toString()}</Text>
    </View>
  ));
  return <Fragment>{rows}</Fragment>;
};

export default TableRow;
