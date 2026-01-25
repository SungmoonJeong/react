import React from 'react';
import { View, Text, ActivityIndicator, Image } from 'react-native';
import { styles } from '../styles';

// 날씨 아이콘 매핑
const weatherImages = {
  Thunderstorm: 'https://cdn-icons-png.flaticon.com/512/1146/1146869.png',
  Drizzle: 'https://cdn-icons-png.flaticon.com/512/3076/3076129.png',
  Rain: 'https://cdn-icons-png.flaticon.com/512/4088/4088981.png',
  Snow: 'https://cdn-icons-png.flaticon.com/512/642/642102.png',
  Atmosphere: 'https://cdn-icons-png.flaticon.com/512/4005/4005901.png',
  Clear: 'https://cdn-icons-png.flaticon.com/512/869/869869.png',
  Clouds: 'https://cdn-icons-png.flaticon.com/512/414/414825.png',
  Default: 'https://cdn-icons-png.flaticon.com/512/704/704351.png'
};

export const WeatherCard = ({ loading, weather, menu }) => {
  // 날씨 상태 파악 및 그룹화
  let status = weather ? weather.weather[0].main : 'Default';
  const atmosphereGroups = ['Mist', 'Smoke', 'Haze', 'Dust', 'Fog', 'Sand', 'Ash', 'Squall', 'Tornado'];
  
  if (atmosphereGroups.includes(status)) {
    status = 'Atmosphere';
  }

  const imageSource = weatherImages[status] || weatherImages.Default;

  return (
    <View style={styles.start3}>
      {loading ? (
        <ActivityIndicator size="large" color="#4a90e2" />
      ) : (
        <>
          {/* 1. 상단 도시 이름 */}
          <View style={styles.seoulBox}>
            <Text style={styles.textWrapper3}>{weather ? weather.name : 'City'}</Text>
          </View>
          
          {/* 2. 중앙 온도와 날씨 아이콘 */}
          <View style={styles.tempAndImage}>
             <View style={styles.frame}>
               <Text style={styles.textWrapper3}>
                 {weather ? `${Math.round(weather.main.temp)}°C` : '--°C'}
               </Text>
             </View>

             {weather && (
               <Image 
                 source={{ uri: imageSource }} 
                 style={styles.weatherIconImage} 
               />
             )}
          </View>

          {/* 3. 하단 음식 추천 문구 */}
          <View style={styles.rectangleWrapper}>
            <Text style={styles.textWrapper4}>{menu}</Text>
          </View>
        </>
      )}
    </View>
  );
};