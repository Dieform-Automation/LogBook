import React from 'react';
import PropTypes from 'prop-types';
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
    padding: '1in',
    lineHeight: 1.5,
    flexDirection: 'column',
  },
  logo: {
    height: 66,
    marginRight: 'auto',
  },
  columnSplit: {
    flexDirection: 'row',
  },
  shrink: { flexShrink: 1, marginBottom: 50 },
  grow: { flexGrow: 1 },
});

const PackingSlip = ({ shipment }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.columnSplit}>
          <View>
            <Image style={styles.logo} src={logo} />
          </View>
          <View>
            <Address />
          </View>
        </View>
        <View style={styles.grow}>
          <GeneralInfo shipment={shipment} />
          <ItemsTable shipment={shipment} />
        </View>
        <View style={styles.shrink}>
          <Misc />
        </View>
      </Page>
    </Document>
  );
};

PackingSlip.propTypes = {
  shipment: PropTypes.object.isRequired,
};

export default PackingSlip;
