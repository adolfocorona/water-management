import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Card } from 'react-native-paper';
import { useTheme } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Define los tipos para las rutas
type RootStackParamList = {
  'consumption-map': undefined;
  'alerts': undefined;
  'critical-zones': undefined;
  'settings': undefined;
  'reports': undefined;
};

export default function HomeScreen() {
  const theme = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>(); // Asigna los tipos a useNavigation

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <Image source={require('../../assets/images/queretaro.jpg')} style={styles.logo} />
        <Text style={styles.title}>Gestión Inteligente de Recursos Hídricos</Text>
      </View>

      {/* Mensaje de bienvenida */}
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>
          Bienvenido a la plataforma de gestión avanzada de recursos hídricos del Estado de Querétaro.
        </Text>
        <Text style={styles.summaryText}>
          Optimiza la gestión de agua con datos en tiempo real y análisis predictivos.
        </Text>
      </View>

      {/* Tarjetas informativas */}
      <View style={styles.cardContainer}>
        <Card style={styles.card}>
          <TouchableOpacity onPress={() => navigation.navigate('consumption-map')}>
            <Text style={styles.cardTitle}>Mapa de Consumo</Text>
            <Text style={styles.cardDescription}>
              Visualiza el consumo de agua en tiempo real en todo el estado.
            </Text>
          </TouchableOpacity>
        </Card>

        <Card style={styles.card}>
          <TouchableOpacity onPress={() => navigation.navigate('alerts')}>
            <Text style={styles.cardTitle}>Alertas</Text>
            <Text style={styles.cardDescription}>
              Recibe alertas en tiempo real sobre consumo inusual y problemas.
            </Text>
          </TouchableOpacity>
        </Card>

        <Card style={styles.card}>
          <TouchableOpacity onPress={() => navigation.navigate('critical-zones')}>
            <Text style={styles.cardTitle}>Zonas Críticas</Text>
            <Text style={styles.cardDescription}>
              Identifica zonas con fugas recurrentes o falta de agua.
            </Text>
          </TouchableOpacity>
        </Card>
      </View>

      {/* Botones de acción rápida */}
      <View style={styles.actionContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('settings')}>
          <Text style={styles.buttonText}>Configuraciones</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('reports')}>
          <Text style={styles.buttonText}>Reportes</Text>
        </TouchableOpacity>
      </View>

      {/* Pie de página */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2024 Gobierno del Estado de Querétaro</Text>
        <Text style={styles.footerText}>Contacto: info@queretaro.gob.mx</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logo: {
    width: 200,
    height: 100,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#003366', // Azul oscuro
    textAlign: 'center',
  },
  welcomeContainer: {
    marginBottom: 24,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#003366',
    textAlign: 'center',
  },
  summaryText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginTop: 8,
  },
  cardContainer: {
    flexDirection: 'column',
    marginBottom: 24,
  },
  card: {
    marginVertical: 8,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#003366',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: '#555',
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    marginTop: 24,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
  },
});
