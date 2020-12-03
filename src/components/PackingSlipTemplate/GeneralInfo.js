import React from 'react';
import PropTypes from 'prop-types';
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

const GeneralInfo = ({ shipment }) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.inLineContainer}>
        <Text style={styles.label}>Customer: </Text>
        <Text>{shipment.customer}</Text>
      </View>
      <View style={styles.inLineContainer}>
        <Text style={styles.label}>Packing Slip Number: </Text>
        <Text>{shipment.packing_slip}</Text>
      </View>
      <View style={styles.inLineContainer}>
        <Text style={styles.label}>Shipping: </Text>
        <Text>{shipment.shipping_method}</Text>
      </View>
      <View style={styles.inLineContainer}>
        <Text style={styles.label}>Date of Shipment: </Text>
        <Text>{shipment.date}</Text>
      </View>
    </View>
  );
};

GeneralInfo.propTypes = {
  shipment: PropTypes.object.isRequired,
};

export default GeneralInfo;
