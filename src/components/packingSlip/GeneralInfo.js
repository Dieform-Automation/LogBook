/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 25,
  },
  inLineContainer: {
    flexDirection: 'row',
  },
  label: {
    fontFamily: 'Helvetica-Bold',
  },
});

const GeneralInfo = ({ shipment: shipment }) => (
  <View style={styles.headerContainer}>
    <View style={styles.inLineContainer}>
      <Text style={styles.label}>Customer: </Text>
      <Text>{shipment.customer}</Text>
    </View>
    <View style={styles.inLineContainer}>
      <Text style={styles.label}>Packing slip no: </Text>
      <Text>{shipment.packing_slip}</Text>
    </View>
    <View style={styles.inLineContainer}>
      <Text style={styles.label}>Shipping: </Text>
      <Text>{shipment.shipping_method}</Text>
    </View>
    <View style={styles.inLineContainer}>
      <Text style={styles.label}>Date of shipment: </Text>
      <Text>{shipment.date}</Text>
    </View>
  </View>
);

export default GeneralInfo;
