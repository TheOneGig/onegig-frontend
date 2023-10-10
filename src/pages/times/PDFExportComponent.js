import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    margin: 10,
  },
  header: {
    marginBottom: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
  table: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  row: {
    width: '50%',
    padding: 5,
  },
  cell: {
    borderWidth: 1,
    borderColor: '#000',
    padding: 5,
  },
});

const PDFExportComponent = ({ data }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>Total Hours Worked per Project</Text>
        <View style={styles.table}>
          {data.map((project) => (
            <View key={project.projectId} style={styles.row}>
              <Text style={styles.cell}>{project.name}</Text>
              <Text style={styles.cell}>{project.totalHours}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default PDFExportComponent;
