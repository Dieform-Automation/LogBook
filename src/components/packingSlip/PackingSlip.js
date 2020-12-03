/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React from 'react';
import { Page, Document, Image, StyleSheet, View } from '@react-pdf/renderer';
import GeneralInfo from './GeneralInfo';
import Address from './Address';
import ItemsTable from './ItemsTable';
import Misc from './Misc';
import logo from '../../assets/logo.png';

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 11,
    paddingTop: 30,
    paddingLeft: 60,
    paddingRight: 60,
    lineHeight: 1.5,
    flexDirection: 'column',
  },
  logo: {
    height: 66,
    marginRight: 'auto',
  },
  section: {
    flexGrow: 1,
  },
  columnSplit: {
    flexDirection: 'row',
  },
});

const PackingSlip = ({ shipment }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.columnSplit}>
          <View style={styles.section}>
            <Image style={styles.logo} src={logo} />
          </View>
          <View style={styles.section}>
            <Address />
          </View>
        </View>
        <GeneralInfo shipment={shipment} />
        <ItemsTable shipment={shipment} />
        <Misc />
      </Page>
    </Document>
  );
};

export default PackingSlip;
