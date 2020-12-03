/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const borderColor = '#90e5fc';
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomColor: '#bff0fd',
    backgroundColor: '#bff0fd',
    borderBottomWidth: 1,
    alignItems: 'center',
    height: 25,
    textAlign: 'center',
    fontFamily: 'Helvetica-Bold',
    fontStyle: 'bold',
    flexGrow: 1,
  },
  itemNo: {
    width: '15%',
    borderRightColor: borderColor,
    borderRightWidth: 1,
    marginTop: '5px',
  },
  partNumber: {
    width: '30%',
    borderRightColor: borderColor,
    borderRightWidth: 1,
    marginTop: '5px',
  },
  po: {
    width: '25%',
    borderRightColor: borderColor,
    borderRightWidth: 1,
    marginTop: '5px',
  },
  qty: {
    width: '15%',
    borderRightColor: borderColor,
    borderRightWidth: 1,
    marginTop: '5px',
  },
  bins: {
    width: '15%',
    borderRightColor: borderColor,
    borderRightWidth: 1,
    marginTop: '5px',
  },
});

const TableHeader = () => (
  <View style={styles.container}>
    <Text style={styles.itemNo}>Item</Text>
    <Text style={styles.partNumber}>Part Number</Text>
    <Text style={styles.po}>Customer PO</Text>
    <Text style={styles.qty}>Qty</Text>
    <Text style={styles.bins}>Bins/Skids</Text>
  </View>
);

export default TableHeader;
