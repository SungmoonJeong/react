import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { styles } from '../styles';

export const WeatherCard = ({ loading, weather, cityName, menu }) => {
  return (
    <View style={styles.start3}>
      {loading ? <ActivityIndicator size="large" color="#fff" /> : (
        <>
          <View style={styles.seoulBox}>
            <Text style={styles.textWrapper3}>{cityName}</Text>
          </View>
          <View style={styles.tempAndImage}>
            <Text style={styles.textWrapper3}>
              {weather ? `${Math.round(weather.main.temp)}°C` : '--°C'}
            </Text>
          </View>
          <View style={styles.rectangleWrapper}>
            <Text style={styles.textWrapper4}>{menu}</Text>
          </View>
        </>
      )}
    </View>
  );
};