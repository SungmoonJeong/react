import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Alert, TextInput, ScrollView, Linking, Platform, Share } from 'react-native';
import axios from 'axios';

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

const initKakaoSDK = () => {
  if (Platform.OS !== 'web') return;
  if (window.Kakao && !window.Kakao.isInitialized()) {
    window.Kakao.init(API_KEYS.KAKAO_JS_KEY);
    console.log("카카오 SDK 초기화 완료");
  }
};

export default function App() {
  const [city, setCity] = useState('서울'); 
  const [displayName, setDisplayName] = useState('서울');
  const [weather, setWeather] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [menuMessage, setMenuMessage] = useState('무엇을 먹을까요?');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (Platform.OS === 'web') {
      if (!document.getElementById('kakao-sdk')) {
        const script = document.createElement('script');
        script.id = 'kakao-sdk';
        script.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js';
        script.crossOrigin = 'anonymous';
        script.onload = initKakaoSDK;
        document.head.appendChild(script);
      } else {
        initKakaoSDK();
      }
    }
  }, []);

  const shareToKakao = (item) => {
    const restaurantName = item.title.replace(/<[^>]*>?/gm, '');
    const address = item.roadAddress || item.address || '주소 정보 없음';
    const link = item.link || 'https://map.naver.com';
    const foodCategory = item.categoryFood || '맛집';

    // --- 웹(Web) 환경 ---
    if (Platform.OS === 'web') {
      if (!window.Kakao || !window.Kakao.isInitialized()) {
        alert('카카오 SDK가 아직 로드되지 않았습니다. 잠시 후 다시 시도해주세요.');
        return;
      }
      const mapLink = `https://map.naver.com/v5/search/${encodeURIComponent(restaurantName)}`;
      window.Kakao.Share.sendDefault({
        objectType: 'text',
        text: `🍽️ [${foodCategory}] ${restaurantName}\n📍 ${address}\n\n오늘 날씨에 어울리는 ${displayName} 맛집이에요!\n\n🗺️ ${mapLink}`,
         link: {
      mobileWebUrl: mapLink,
      webUrl: mapLink,
    },
  });

    // --- 모바일(Android) 환경 --- ✅ Share.share()만 사용
    } else {
      const mapLink = `https://map.naver.com/v5/search/${encodeURIComponent(restaurantName)}`;
      const shareText = `🍽️ [${foodCategory}] ${restaurantName}\n📍 ${address}\n\n오늘 날씨에 어울리는 ${displayName} 맛집이에요!\n\n🗺️ ${mapLink}`;
      
      Share.share({
        message: shareText,
        // url: mapLink,        // 링크는 별도로
      });
    }
  };

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

      const found = [];
      const proxyUrl = "https://cors-anywhere.herokuapp.com/"; 

      for (let food of searchKeywords) {
        try {
          const naverUrl = `https://openapi.naver.com/v1/search/local.json?query=${encodeURIComponent(city + " " + food + " 맛집")}&display=1`;
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
        {restaurants.length === 0 && !loading && (
          <Text style={{textAlign: 'center', marginTop: 20}}>맛집 정보를 찾을 수 없습니다. 😢</Text>
        )}
        {restaurants.map((item, index) => (
          <View key={index} style={styles.resCardWrapper}>
            <TouchableOpacity 
              style={styles.resCard} 
              onPress={() => item.link && Linking.openURL(item.link)}
            >
              <Text style={styles.resTitle}>
                {`[${item.categoryFood}] ` + item.title.replace(/<[^>]*>?/gm, '')}
              </Text>
              <Text style={styles.resAddr}>{item.roadAddress}</Text>
              <Text style={styles.resLinkText}>상세보기 〉</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.kakaoShareBtn} 
              onPress={() => shareToKakao(item)}
            >
              <Text style={styles.kakaoShareBtnText}>💬 카카오톡 공유</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}