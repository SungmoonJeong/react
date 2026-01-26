// recommendation.js

// 1. 날씨별 음식 리스트 정의
const foodLists = {
  Rain: "부대찌개,아구찜,해물탕,칼국수,수제비,짬뽕,우동,치킨,국밥,김치부침개,두부김치,파전".split(','),
  Thunderstorm: "치킨,피자,매운족발,떡볶이,햄버거".split(','),
  Drizzle: "쌀국수,샤브샤브,돈까스,잔치국수".split(','),
  Snow: "우동,라면,어묵탕,호떡,붕어빵".split(','),
  Clear: "냉면,밀면,초밥,샌드위치,파스타,비빔밥,삼겹살".split(','),
  Clouds: "부대찌개,순대국,김치찌개,소고기무국".split(','),
  Atmosphere: "베이글,커피,샌드위치,죽".split(','),
  Default: "삼겹살,돼지갈비,스테이크".split(',')
};

export const recommendMenu = (weatherState) => {
  // 해당 날씨의 리스트를 가져오고, 없으면 Default 리스트 사용
  const foods = foodLists[weatherState] || foodLists.Default;
  
  // 리스트에서 무작위로 하나 추출
  const randomIndex = Math.floor(Math.random() * foods.length);
  const selectedFood = foods[randomIndex];

  // 3. 상황별 문구 조합
  switch (weatherState) {
    case 'Rain':
      return `비가 오네요! ${selectedFood} 어떠세요? ☔`;
    case 'Clear':
      return `맑은 날엔 ${selectedFood}이(가) 딱이죠! ☀️`;
    case 'Snow':
      return `눈 오는 날, 따끈한 ${selectedFood} 추천해요! ❄️`;
    case 'Thunderstorm':
      return `번개 치는 날엔 안전하게 ${selectedFood} 배달! ⚡`;
    case 'Clouds':
      return `흐린 날씨엔 ${selectedFood}이(가) 당기네요. ☁️`;
    default:
      return `오늘 메뉴는 ${selectedFood}, 어떠신가요? 😋`;
  }
};