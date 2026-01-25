// recommendation.js
export const recommendMenu = (weatherState) => {
  switch (weatherState) {
    case 'Thunderstorm': 
      return '천둥번개 치는 날엔 집에서 안전하게 배달 치킨! 🍗';
    case 'Drizzle':
    case 'Rain': 
      return '비 오는 날엔 역시 뜨끈한 칼국수에 파전! ☔';
    case 'Snow': 
      return '펑펑 눈이 오니까 따뜻한 우동 한 그릇! ❄️';
    case 'Clear': 
      return '날씨가 너무 좋네요! 상큼한 샌드위치 어때요? ☀️';
    case 'Clouds': 
      return '구름이 많아 흐린 날엔 묵직한 국밥이 최고! ☁️';
    case 'Atmosphere': // Mist, Fog, Haze 등
      return '안개 낀 몽환적인 날엔 따뜻한 라떼와 베이글! ☕';
    default: 
      return '삼겹살은 어떤 날씨에도 정답입니다. 🥓';
  }
};