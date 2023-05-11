import React from 'react';
import { Document, Page, Text, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
  },
  content: {
    fontSize: 14,
    lineHeight: 1.5,
    textAlign: 'justify',
  },
});

const PdfDocument = ({ content }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.content}>{content}</Text>
      </Page>
    </Document>
  );
};

export default PdfDocument;
