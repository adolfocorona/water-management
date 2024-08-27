import React, { useState } from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome'; // Asegúrate de usar los íconos que necesitas

interface ZoneData {
  id: number;
  lat: number;
  lon: number;
  issueType: string;
  maintenanceNeeded: boolean;
}

const { width, height } = Dimensions.get('window');

const initialZones: ZoneData[] = [
  { id: 1, lat: 20.5931, lon: -100.3928, issueType: 'Fugas frecuentes', maintenanceNeeded: true },
  { id: 2, lat: 20.5272, lon: -100.3082, issueType: 'Falta de agua histórica', maintenanceNeeded: false },
  { id: 3, lat: 20.5821, lon: -100.3928, issueType: 'Fugas frecuentes', maintenanceNeeded: true },
  { id: 4, lat: 20.6543, lon: -100.3803, issueType: 'Falta de agua histórica', maintenanceNeeded: false },
];

const MapScreen = () => {
  const [zoneData, setZoneData] = useState<ZoneData[]>(initialZones);

  const renderMarkerIcon = (issueType: string) => {
    if (issueType === 'Fugas frecuentes') return 'wrench'; // Ícono de mantenimiento
    if (issueType === 'Falta de agua histórica') return 'tint'; // Ícono de gota de agua
    return 'exclamation-circle'; // Ícono genérico de advertencia
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
        {zoneData.map((zone) => (
          <Marker
            key={zone.id}
            coordinate={{ latitude: zone.lat, longitude: zone.lon }}
            title={zone.issueType}
            description={zone.maintenanceNeeded ? 'Mantenimiento Preventivo Necesario' : 'No requiere mantenimiento'}
          >
            <Icon 
              name={renderMarkerIcon(zone.issueType)} 
              size={30} 
              color={zone.maintenanceNeeded ? 'red' : 'blue'} 
            />
          </Marker>
        ))}
      </MapView>

      <View style={styles.detailsContainer}>
        <Text style={styles.title}>Zonas Críticas</Text>
        <Button 
          title="Simular Nueva Zona" 
          onPress={() => {
            const newZone = {
              id: zoneData.length + 1,
              lat: 20.6 + Math.random() * 0.1,
              lon: -100.4 + Math.random() * 0.1,
              issueType: Math.random() > 0.5 ? 'Fugas frecuentes' : 'Falta de agua histórica',
              maintenanceNeeded: Math.random() > 0.5,
            };
            setZoneData([...zoneData, newZone]);
          }}
          buttonStyle={styles.button}
          containerStyle={styles.buttonContainer}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: width,
    height: height,
  },
  detailsContainer: {
    position: 'absolute',
    bottom: 30,
    left: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007BFF', // Azul empresarial
  },
  buttonContainer: {
    marginTop: 10,
  },
});

export default MapScreen;
