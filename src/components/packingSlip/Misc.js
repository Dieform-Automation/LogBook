/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  columnSplit: {
    flexDirection: 'row',
    marginTop: '100px',
  },
  section: {
    flexGrow: 1,
  },
  largeText: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
  },
  underlineBottom: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginLeft: '40px',
  },
  name: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
  },
  signature: {
    marginTop: '35px',
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
  },
});

const Misc = () => (
  <View style={styles.columnSplit}>
    <View style={styles.section}>
      <Text style={styles.largeText}> Memo:</Text>
    </View>
    <View style={styles.section}>
      <Text style={styles.name}> Name</Text>
      <View style={styles.underlineBottom} />

      <Text style={styles.signature}> Sign</Text>
      <View style={styles.underlineBottom} />
    </View>
  </View>
);

export default Misc;
