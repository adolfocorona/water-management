import React from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import MapView, { Marker } from 'react-native-maps';

interface AnimacionMarkerProps {
  coordinate: { latitude: number; longitude: number };
  weather: 'rainy' | 'dry' | 'cloudy';
}

const AnimacionMarker: React.FC<AnimacionMarkerProps> = ({ coordinate, weather }) => {
  const getWeatherAnimation = (weather: string) => {
    switch (weather) {
      case 'rainy':
        return require('../../assets/components/rain.json');
      case 'dry':
        return require('../../assets/components/drought.json');
      case 'cloudy':
        return require('../../assets/components/cloudy.json');
    }
  };

  return (
    <Marker coordinate={coordinate}>
      <View style={styles.marker}>
        <LottieView
          source={getWeatherAnimation(weather)}
          autoPlay
          loop
          style={styles.animation}
        />
      </View>
    </Marker>
  );
};

const styles = StyleSheet.create({
  marker: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 100,
  },
  animation: {
    width: 100,
    height: 100,
  },
});

export default AnimacionMarker;
