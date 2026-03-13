import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  // 1. 전체 레이아웃
  main: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  textWrapper: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 60,
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },

  // 2. 검색창 (TextInput + 돋보기 버튼)
  pillsWrapper: {
    flexDirection: 'row',
    width: '90%',
    alignItems: 'center',
    marginBottom: 20,
    alignSelf: 'center',
  },
  div: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  searchBtn: {
    width: 50,
    height: 50,
    backgroundColor: '#4a90e2',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },

  // 3. 날씨 카드 (WeatherCard 관련)
  start3: {
    width: '90%',
    padding: 25,
    borderRadius: 20,
    backgroundColor: '#4a90e2',
    alignItems: 'center',
    marginBottom: 30,
    alignSelf: 'center',
    // 그림자
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  seoulBox: {
    marginBottom: 5,
  },
  textWrapper3: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  tempAndImage: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  rectangleWrapper: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 15,
  },
  textWrapper4: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
  },

  // 4. 네이버 맛집 리스트 (추가된 부분)
  resContainer: {
    width: '90%',
    alignSelf: 'center',
  },
  resMainTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  resCard: {
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    // 안드로이드 그림자
    elevation: 3,
    // iOS 그림자
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  resTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#00c73c', // 네이버 상징색
  },
  resAddr: {
    fontSize: 13,
    color: '#666',
    marginTop: 6,
    lineHeight: 18,
  },
  resLinkText: {
    fontSize: 12,
    color: '#4a90e2',
    marginTop: 10,
    fontWeight: 'bold',
    textAlign: 'right',
  },

  // 5. 기타 버튼 (필요시 사용)
  pills: {
    width: '90%',
    height: 50,
    backgroundColor: '#eee',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    alignSelf: 'center',
  },
  label: {
    fontSize: 16,
    color: '#333',
  },

  // 기존 styles에 추가
resCardWrapper: {
  width: '100%',
  marginBottom: 12,
},
kakaoShareBtn: {
  backgroundColor: '#FEE500',   // 카카오 공식 노란색
  borderRadius: 8,
  paddingVertical: 10,
  paddingHorizontal: 16,
  alignItems: 'center',
  marginTop: 4,
},
kakaoShareBtnText: {
  color: '#3C1E1E',             // 카카오 공식 텍스트 색
  fontWeight: 'bold',
  fontSize: 14,
},
});