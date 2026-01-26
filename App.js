import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Alert, TextInput, ScrollView } from 'react-native';
import axios from 'axios';

// 우리가 만든 외부 파일들 가져오기
import { styles } from './styles';
import { recommendMenu } from './recommendation';
import { WeatherCard } from './components/WeatherCard'; // 부품 가져오기

export default function App() {
  const [weather, setWeather] = useState(null);
  const [menu, setMenu] = useState('무엇을 먹을까요?');
  const [city, setCity] = useState('Seoul');
  const [loading, setLoading] = useState(false);

  const WEATHER_API_KEY = '406a56f68c96058d9cef94834bd1ec4f';

// App.js 내의 getWeather 함수 수정
const getWeather = async () => {
  if (!city) return Alert.alert("도시 이름을 입력하세요.");
  setLoading(true);
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric&lang=kr`
    );
    
    setWeather(response.data);
    // 여기서 주의! response.data.weather[0].main은 여전히 'Clear' 같은 영문 그룹명입니다.
    // 우리 로직(recommendation.js)은 이 영문 그룹명을 쓰므로 그대로 두면 됩니다.
    setMenu(recommendMenu(response.data.weather[0].main));
    
  } catch (error) {
    Alert.alert("알림", "도시를 찾을 수 없습니다. (한글/영문 모두 가능)");
  } finally {
    setLoading(false);
  }
};

  useEffect(() => { getWeather(); }, []);

  return (
    <ScrollView style={styles.main} contentContainerStyle={{ alignItems: 'center' }}>
      <Text style={styles.textWrapper}>오늘의 메뉴 추천</Text>

      {/* 검색창 영역 */}
      <View style={styles.pillsWrapper}>
        <TextInput 
          style={styles.div}
          placeholder="도시 이름 입력"
          value={city}
          onChangeText={setCity}
          onSubmitEditing={getWeather}
          returnKeyType="search"
        />
        <TouchableOpacity onPress={getWeather} style={styles.searchBtn}>
          <Text>🔍</Text>
        </TouchableOpacity>
      </View>

      {/* ★ 부품 조립: 복잡한 HTML 코드가 이 한 줄로 대체됩니다! */}
      <WeatherCard loading={loading} weather={weather} menu={menu} />

      {/* 하단 버튼 */}
      <TouchableOpacity style={styles.pills} onPress={getWeather}>
        <Text style={styles.label}>지금 날씨 확인하기</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}