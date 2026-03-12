import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Alert, TextInput, ScrollView, Linking } from 'react-native';
import axios from 'axios';

import { Platform } from 'react-native';
import { styles } from './styles';
import { recommendMenu } from './recommendation';
import { WeatherCard } from './components/WeatherCard';
import { API_KEYS } from './config';

const cityMap = {
  "서울": "Seoul",
  "부산": "Busan",
  "광주": "Gwangju",
  "대구": "Daegu",
  "인천": "Incheon",
  "대전": "Daejeon",
  "울산": "Ulsan",
  "제주": "Jeju",
  "수원": "Suwon",
  "성남": "Seongnam",
  "고양": "Goyang",
  "용인": "Yongin",
};

export default function App() {
  const [city, setCity] = useState('서울'); 
  const [displayName, setDisplayName] = useState('서울');
  const [weather, setWeather] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [menuMessage, setMenuMessage] = useState('무엇을 먹을까요?');
  const [loading, setLoading] = useState(false);

const fetchAllData = async () => {
  if (!city.trim()) return Alert.alert("지역을 입력하세요.");
  setLoading(true);
  
  const cityParts = city.split(' '); 
  const mainCity = cityParts[0]; 
  
  const englishCity = cityMap[mainCity] || mainCity;

  try {
    let wRes;
    try {

      wRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(englishCity)}&appid=${API_KEYS.WEATHER}&units=metric&lang=kr`
      );
    } catch (err) {
      console.log("세부 지역 날씨 찾기 실패, 서울로 대체");
      wRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=Seoul&appid=${API_KEYS.WEATHER}&units=metric&lang=kr`
      );
    }

    const currentData = wRes.data;
    setWeather(currentData); 
    setDisplayName(city); 
    
    const weatherStatus = currentData.weather[0]?.main || 'Clear';

    const { comment, searchKeywords } = recommendMenu(weatherStatus);
    setMenuMessage(comment);

    // const found = [];
    // // 웹에서의 보안 문제(CORS)를 해결하기 위한 프록시 서버 주소
    // const proxyUrl = "https://cors-anywhere.herokuapp.com/";
    // for (let food of searchKeywords) {
    //   try {
    //     // 실제 요청할 네이버 API 주소

    //     const naverUrl = `https://openapi.naver.com/v1/search/local.json?query=${encodeURIComponent(city + " " + food + " 맛집")}&display=1`;
    //     const nRes = await axios.get(proxyUrl + naverUrl, {
    //       headers: {
    //         'X-Naver-Client-Id': API_KEYS.NAVER_ID,
    //         'X-Naver-Client-Secret': API_KEYS.NAVER_SECRET
    //       }
    //     });
    //     if (nRes.data.items?.length > 0) {
    //       // 식당 데이터에 'categoryFood'를 추가해서 나중에 카톡 공유나 화면 표시 때 사용
    //       found.push({
    //         ...nRes.data.items[0],
    //         categoryFood: food
    //       });
    //     }
    //   } catch (nErr) {
    //     console.log(food + " 검색 실패 (CORS 데모 페이지 승인이 필요할 수 있습니다)");
    //   }
    // }
    // setRestaurants(found);

    const found = [];
    // 웹 브라우저일 때만 사용할 프록시 주소
    const proxyUrl = "https://cors-anywhere.herokuapp.com/"; 

    for (let food of searchKeywords) {
      try {
        const naverUrl = `https://openapi.naver.com/v1/search/local.json?query=${encodeURIComponent(city + " " + food + " 맛집")}&display=1`;

        // ★ 핵심: 웹(web)이면 프록시를 붙이고, 아니면(android/ios) 주소만 사용합니다.
        const finalUrl = Platform.OS === 'web' ? proxyUrl + naverUrl : naverUrl;

        const nRes = await axios.get(finalUrl, { 
          headers: { 
            'X-Naver-Client-Id': API_KEYS.NAVER_ID, 
            'X-Naver-Client-Secret': API_KEYS.NAVER_SECRET 
          } 
        });
        
        if (nRes.data.items?.length > 0) {
          found.push({ 
            ...nRes.data.items[0], 
            categoryFood: food 
          });
        }
      } catch (nErr) { 
        // 로그를 좀 더 상세하게 찍어서 원인을 파악하기 쉽게 합니다.
        console.log(`${food} 검색 실패:`, Platform.OS === 'web' ? "CORS 승인 확인 필요" : "네이버 설정 확인 필요"); 
      }
    }
    setRestaurants(found);

  } catch (error) {
    console.error("에러:", error);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => { fetchAllData(); }, []);

  return (
    <ScrollView style={styles.main} contentContainerStyle={{ alignItems: 'center', paddingBottom: 50 }}>
      <Text style={styles.textWrapper}>오늘의 메뉴 추천</Text>

      <View style={styles.pillsWrapper}>
        <TextInput 
          style={styles.div} 
          value={city} 
          onChangeText={setCity} 
          onSubmitEditing={fetchAllData}
          placeholder="도시 이름을 입력하세요 (예: 서울, 부산)" 
        />
        <TouchableOpacity onPress={fetchAllData} style={styles.searchBtn}>
          <Text style={{color: '#fff', fontSize: 20}}>🔍</Text>
        </TouchableOpacity>
      </View>

      <WeatherCard loading={loading} weather={weather} cityName={displayName} menu={menuMessage} />

      <View style={styles.resContainer}>
        <Text style={styles.resMainTitle}>📍 {displayName} 주변 맛집 리스트</Text>
        {restaurants.length === 0 && !loading && <Text style={{textAlign: 'center', marginTop: 20}}>맛집 정보를 찾을 수 없습니다. 😢</Text>}
        {restaurants.map((item, index) => (
          <TouchableOpacity key={index} style={styles.resCard} onPress={() => item.link && Linking.openURL(item.link)}>
            <Text style={styles.resTitle}>{`[${item.categoryFood}] ` + item.title.replace(/<[^>]*>?/gm, '')}</Text>
            <Text style={styles.resAddr}>{item.roadAddress}</Text>
            <Text style={styles.resLinkText}>상세보기 〉</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}
