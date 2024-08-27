import React, { useState, useEffect } from 'react';
import { View, Alert, Dimensions, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome'; // Importa la librería de íconos

interface AlertData {
  id: number;
  lat: number;
  lon: number;
  message: string;
  severity: string;
  lastReading: number;
  affectedUsers: number;
  resolved: boolean;
}

const { width, height } = Dimensions.get('window');

const initialAlerts: AlertData[] = [
  { id: 1, lat: 20.5931, lon: -100.3928, message: 'Posible fuga', severity: 'high', lastReading: 120, affectedUsers: 50, resolved: false },
  { id: 2, lat: 20.5272, lon: -100.3082, message: 'Mayor consumo de lo usual', severity: 'medium', lastReading: 95, affectedUsers: 30, resolved: false },
  { id: 3, lat: 20.5821, lon: -100.3928, message: 'Consumo ligeramente alto', severity: 'low', lastReading: 85, affectedUsers: 15, resolved: false },
];

const MapScreen = () => {
  const [alertData, setAlertData] = useState<AlertData[]>(initialAlerts);
  const [alertCount, setAlertCount] = useState<number>(0); // Contador para el número de alertas generadas
  const [selectedAlert, setSelectedAlert] = useState<AlertData | null>(null);

  // Función para renderizar el ícono de acuerdo a la gravedad
  const renderAlertIcon = (severity: string) => {
    switch (severity) {
      case 'high':
        return <Icon name="exclamation-triangle" size={30} color="red" />;
      case 'medium':
        return <Icon name="exclamation-triangle" size={30} color="orange" />;
      case 'low':
        return <Icon name="exclamation-triangle" size={30} color="green" />;
      default:
        return <Icon name="exclamation-triangle" size={30} color="blue" />; // Por defecto
    }
  };

  // Función para simular una nueva alerta
  const simulateNewAlert = () => {
    if (alertCount < 3) { // Verificar si el contador es menor a 3
      const newAlert: AlertData = {
        id: alertData.length + 1,
        lat: 20.6 + Math.random() * 0.1,
        lon: -100.4 + Math.random() * 0.1,
        message: 'Posible fuga',
        severity: 'high',
        lastReading: Math.floor(Math.random() * 150),
        affectedUsers: Math.floor(Math.random() * 100),
        resolved: false,
      };
      setAlertData([...alertData, newAlert]);
      setAlertCount(alertCount + 1); // Aumentar el contador

      Alert.alert('Nueva Alerta', 'Se ha detectado un consumo inusual.', [{ text: 'OK' }]);
    }
  };

  // UseEffect para generar una nueva alerta cada 10 segundos, hasta que se hayan generado 3 alertas
  useEffect(() => {
    if (alertCount < 3) {
      const interval = setInterval(() => {
        simulateNewAlert();
      }, 10000); // Cada 10 segundos

      return () => clearInterval(interval); // Limpia el intervalo cuando el componente se desmonte
    }
  }, [alertCount, alertData]);

  // Función para manejar el clic en el marcador
  const handleMarkerPress = (alert: AlertData) => {
    setSelectedAlert(alert);
  };

  // UseEffect para mostrar los detalles de la alerta seleccionada
  useEffect(() => {
    if (selectedAlert) {
      Alert.alert(
        'Detalles de la Alerta',
        `Zona: ${selectedAlert.message}\nÚltima lectura: ${selectedAlert.lastReading} m³\nUsuarios afectados: ${selectedAlert.affectedUsers}\nGravedad: ${selectedAlert.severity === 'high' ? 'Alta' : selectedAlert.severity === 'medium' ? 'Media' : 'Baja'}`,
        [
          { text: 'Cerrar', onPress: () => setSelectedAlert(null) },
          { text: 'Resolver', onPress: () => resolveAlert(selectedAlert.id) }
        ]
      );
    }
  }, [selectedAlert]);

  // Función para resolver una alerta
  const resolveAlert = (alertId: number) => {
    setAlertData(alertData.map(alert => alert.id === alertId ? { ...alert, resolved: true } : alert));
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 20.5931,
          longitude: -100.3928,
          latitudeDelta: 0.09,
          longitudeDelta: 0.04,
        }}
      >
        {alertData.map((alert) => (
          <Marker
            key={alert.id}
            coordinate={{ latitude: alert.lat, longitude: alert.lon }}
            onPress={() => handleMarkerPress(alert)}
          >
            {renderAlertIcon(alert.severity)}
          </Marker>
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%', // Ancho completo de la pantalla
        height: '100%', // Altura completa de la pantalla
    },
});

export default MapScreen;
