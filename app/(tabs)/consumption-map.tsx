import React, { useState } from 'react';
import { View, Dimensions, StyleSheet, Text } from 'react-native';
import MapView, { Circle, Marker } from 'react-native-maps';
import { Button } from 'react-native-elements';
import AnimacionMarker from '../../assets/components/AnimationMarker'; // Importa el componente

interface WaterData {
  id: number;
  lat: number;
  lon: number;
  consumptionLevel: number; // Ahora en metros cúbicos
  areaType: string;
}

const { width, height } = Dimensions.get('window');

// Datos iniciales con consumo en metros cúbicos por mes y tipo de clima
const waterDataInitial: WaterData[] = [
  { id: 1, lat: 20.5931, lon: -100.3928, consumptionLevel: 4000, areaType: 'industrial'},
  { id: 2, lat: 20.5272, lon: -100.3083, consumptionLevel: 2500, areaType: 'residential'},
  { id: 3, lat: 20.5821, lon: -100.3928, consumptionLevel: 5000, areaType: 'commercial'},
  { id: 4, lat: 20.5821, lon: -100.3728, consumptionLevel: 3500, areaType: 'rural'},
  { id: 5, lat: 20.6221, lon: -100.3928, consumptionLevel: 3000, areaType: 'residential'},
];

// Asegúrate de que `weather` sea uno de los valores permitidos
const presaData: Array<{ id: number; lat: number; lon: number; weather: 'dry' | 'rainy' | 'cloudy' }> = [
  { id: 1, lat: 20.6477, lon: -100.2988, weather: 'rainy' }, // Presa El Batán
  { id: 2, lat: 20.4717, lon: -99.9415, weather: 'dry' },    // Presa Jalpan
  { id: 3, lat: 20.5944, lon: -100.2181, weather: 'cloudy' }, // Presa Zimapán
  // Agrega más presas según sea necesario
];

const MapScreen = () => {
  const [waterData, setWaterData] = useState<WaterData[]>(waterDataInitial);

  // Simula más datos para zonas pequeñas
  const actualizarDatos = () => {
    setWaterData([
      ...waterData,
      { id: 6, lat: 20.6031, lon: -100.3828, consumptionLevel: 4300, areaType: 'industrial'},
      { id: 7, lat: 20.5131, lon: -100.3128, consumptionLevel: 2400, areaType: 'residential'},
      { id: 8, lat: 20.6331, lon: -100.3528, consumptionLevel: 3700, areaType: 'commercial'},
    ]);
  };

  const renderCircleColor = (level: number) => {
    if (level > 4000) return 'rgba(255, 0, 0, 0.2)'; // Rojo con más transparencia
    if (level > 2500) return 'rgba(255, 165, 0, 0.2)'; // Naranja con más transparencia
    return 'rgba(0, 128, 0, 0.2)'; // Verde con más transparencia
  };

  const getCircleRadius = (consumption: number) => consumption / 5; // Reducido el radio

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
        {waterData.map((data) => (
          <React.Fragment key={data.id}>
            <Circle
              center={{ latitude: data.lat, longitude: data.lon }}
              radius={getCircleRadius(data.consumptionLevel)}
              strokeColor={renderCircleColor(data.consumptionLevel)}
              fillColor={renderCircleColor(data.consumptionLevel)}
            />
            <Marker
              coordinate={{ latitude: data.lat, longitude: data.lon }}
              title={`Consumo: ${data.consumptionLevel} m³`}
              description={`Área: ${data.areaType}`}
            />
          </React.Fragment>
        ))}

        {/* Renderiza los marcadores de clima en las presas */}
        {presaData.map((presa) => (
          <AnimacionMarker
            key={presa.id}
            coordinate={{ latitude: presa.lat, longitude: presa.lon }}
            weather={presa.weather}
          />
        ))}
      </MapView>

      <View style={styles.legendContainer}>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: 'rgba(255, 0, 0, 0.3)' }]} />
          <Text style={styles.legendText}>Alto consumo ( + 4000 m³)</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: 'rgba(255, 165, 0, 0.3)' }]} />
          <Text style={styles.legendText}>Consumo medio (2500 - 4000 m³)</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: 'rgba(0, 128, 0, 0.3)' }]} />
          <Text style={styles.legendText}>Bajo consumo ( - 2500 m³)</Text>
        </View>
      </View>

      <Button 
        title="Actualizar Datos" 
        onPress={actualizarDatos} 
        buttonStyle={styles.button}
        containerStyle={styles.buttonContainer} 
      />
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
  button: {
    backgroundColor: '#007BFF', // Color azul empresarial
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 30,
    right: 20,
  },
  legendContainer: {
    position: 'absolute',
    top: 40,
    left: 10,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    zIndex: 1,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  legendColor: {
    width: 20,
    height: 20,
    borderRadius: 5,
    marginRight: 10,
  },
  legendText: {
    fontSize: 14,
  },
});

export default MapScreen;
