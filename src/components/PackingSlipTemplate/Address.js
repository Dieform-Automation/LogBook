import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  address: {
    flexDirection: 'column',
    marginLeft: '200px',
    justifyContent: 'flex-end',
  },
  label: {
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
  },
  regularText: {
    fontSize: 11,
  },
});

const Address = () => (
  <View style={styles.address}>
    <Text style={styles.label}>Dieform Automation</Text>
    <Text style={styles.regularText}>7825 Tranmere Drive</Text>
    <Text style={styles.regularText}>Mississauga, ON L5S1V5</Text>
    <Text style={styles.regularText}>(905) 676-1440</Text>
  </View>
);

export default Address;
