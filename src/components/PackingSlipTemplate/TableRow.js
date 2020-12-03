import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const borderColor = '#9CA3AF';
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    borderBottomColor: '#E5E7EB',
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

const TableRow = ({ item, number }) => (
  <View style={styles.row}>
    <Text style={styles.itemNo}>{number}</Text>
    <Text style={styles.partNumber}>{item.part_number}</Text>
    <Text style={styles.po}>{item.purchase_order}</Text>
    <Text style={styles.qty}>{item.quantity}</Text>
    <Text style={styles.bins}>{item.bins}</Text>
  </View>
);

TableRow.propTypes = {
  item: PropTypes.object.isRequired,
  number: PropTypes.number.isRequired,
};

export default TableRow;
