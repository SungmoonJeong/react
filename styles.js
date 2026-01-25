import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  main: { flex: 1, backgroundColor: '#ffffff' },
  textWrapper: { fontSize: 24, fontWeight: 'bold', marginTop: 60, marginBottom: 20 },
  
  // 검색창 영역
  pillsWrapper: { 
    flexDirection: 'row', 
    width: 374, 
    height: 60, 
    backgroundColor: '#efeff0', 
    borderRadius: 8, 
    borderWidth: 2, 
    borderColor: '#d1d1d1', 
    alignItems: 'center', 
    paddingHorizontal: 15 
  },
  div: { flex: 1, fontSize: 18, color: '#000' },
  searchBtn: { padding: 5 },

  // 중앙 날씨 카드 (수정 핵심)
  start3: { 
    width: 379, 
    minHeight: 300, 
    backgroundColor: '#efeff0', 
    borderRadius: 8, 
    borderWidth: 2, 
    borderColor: '#d1d1d1', 
    padding: 20, 
    marginVertical: 30,
    alignItems: 'center', // 모든 내부 요소를 가로 중앙으로
    justifyContent: 'center'
  },

// styles.js 내 seoulBox 부분 수정
  seoulBox: { 
  backgroundColor: '#d9d9d9', 
  paddingVertical: 8, 
  paddingHorizontal: 25, 
  borderRadius: 4,
  marginBottom: 15,

  // ★ 왼쪽 끝으로 정렬
  alignSelf: 'flex-start', 
  
  // 너무 벽에 딱 붙으면 보기 안 좋으니 왼쪽 여백을 살짝 줍니다.
  marginLeft: 5 
},
  
// styles.js 수정 부분

// 1. 온도와 이미지를 감싸는 컨테이너
tempAndImage: { 
  flexDirection: 'row', 
  width: '100%', 
  // ★ 중앙 정렬 대신 양 끝으로 벌림
  justifyContent: 'space-between', 
  alignItems: 'center', 
  marginVertical: 10,
  // 양 끝 벽에 너무 붙지 않도록 컨테이너 자체에 여백 추가
  paddingHorizontal: 10 
},

// 2. 온도 숫자 박스 (왼쪽)
frame: { 
  backgroundColor: '#d9d9d9', 
  padding: 15, 
  borderRadius: 8,
  // space-between을 썼으므로 marginRight는 필요 없거나 작게 조절
  marginLeft: 0.0001 
},

// 3. 날씨 이미지 (오른쪽)
weatherIconImage: {
  width: 110, 
  height: 110,
  resizeMode: 'contain',
  // 오른쪽 여백 살짝 추가
  marginRight: 5 
},
  // 하단 메뉴 추천 박스
  rectangleWrapper: { 
    backgroundColor: '#fff', 
    padding: 20, 
    width: '100%', 
    alignItems: 'center', 
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#eee',
    marginTop: 15
  },

  textWrapper3: { fontSize: 22, fontWeight: 'bold' },
  textWrapper4: { fontSize: 18, fontWeight: 'bold', color: '#2d3436', textAlign: 'center', lineHeight: 26 },

  // 하단 버튼
  pills: { 
    backgroundColor: '#4a90e2', 
    width: 374, 
    height: 55, 
    borderRadius: 12, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginTop: 10 
  },
  label: { color: 'white', fontWeight: 'bold', fontSize: 16 }
});