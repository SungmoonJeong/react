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
  const foods = foodLists[weatherState] || foodLists.Default;
  const shuffled = [...foods].sort(() => 0.5 - Math.random());
  const selectedFoods = shuffled.slice(0, 3); // 맛집 검색용 3개 키워드
  const mainFood = selectedFoods[0];

  let comment = "";
  switch (weatherState) {
    case 'Rain': comment = `비가 오네요! ${mainFood} 어떠세요? ☔`; break;
    case 'Clear': comment = `맑은 날엔 ${mainFood}이(가) 딱이죠! ☀️`; break;
    case 'Snow': comment = `눈 오는 날, 따끈한 ${mainFood} 추천해요! ❄️`; break;
    case 'Clouds': comment = `흐린 날씨엔 ${mainFood}이(가) 당기네요. ☁️`; break;
    default: comment = `오늘 메뉴는 ${mainFood}, 어떠신가요? 😋`;
  }

  return { comment, searchKeywords: selectedFoods };
};