import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';

interface ReportData {
  id: number;
  title: string;
  summary: string;
  date: string;
}

const initialReports: ReportData[] = [
  { id: 1, title: 'Informe de Consumo - Julio 2024', summary: 'Consumo total del mes de julio en las zonas industriales y residenciales.', date: '2024-08-01' },
  { id: 2, title: 'Informe de Alertas - Primer Semestre', summary: 'Análisis de alertas generadas por posibles fugas y consumos inusuales.', date: '2024-07-15' },
  { id: 3, title: 'Informe Anual de Mantenimiento', summary: 'Mantenimiento preventivo realizado en zonas críticas.', date: '2024-06-30' },
];

const ReportsScreen = () => {
  const [reports, setReports] = useState<ReportData[]>(initialReports);

  const handleGenerateNewReport = () => {
    const newReport: ReportData = {
      id: reports.length + 1,
      title: `Nuevo Informe - ${new Date().toLocaleDateString()}`,
      summary: 'Resumen de nuevas actividades y eventos recientes.',
      date: new Date().toLocaleDateString(),
    };
    setReports([...reports, newReport]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Informes Generados</Text>

      {reports.map((report) => (
        <View key={report.id} style={styles.reportItem}>
          <Text style={styles.reportTitle}>{report.title}</Text>
          <Text style={styles.reportDate}>Fecha: {report.date}</Text>
          <Text style={styles.reportSummary}>{report.summary}</Text>
        </View>
      ))}

      <Button
        title="Generar Nuevo Informe"
        buttonStyle={styles.button}
        containerStyle={styles.buttonContainer}
        onPress={handleGenerateNewReport}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  reportItem: {
    backgroundColor: '#f2f2f2',
    padding: 15,
    marginBottom: 20,
    borderRadius: 10,
  },
  reportTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  reportDate: {
    fontSize: 14,
    marginBottom: 10,
    color: '#888',
  },
  reportSummary: {
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  buttonContainer: {
    marginTop: 20,
    alignSelf: 'center',
  },
});

export default ReportsScreen;
