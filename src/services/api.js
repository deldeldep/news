import axios from 'axios';

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const BASE_URL = 'https://newsapi.org/v2';

// 기본 설정이 된 axios 인스턴스 생성
const api = axios.create({
  baseURL: BASE_URL,
  params: {
    apiKey: API_KEY, // 모든 요청에 자동으로 API 키 포함
  },
});

// 1. 헤드라인 뉴스 가져오기 (메인 슬라이드용)
export const getTopHeadlines = async (country = 'us', category = 'general') => {
  try {
    const response = await api.get('/top-headlines', {
      params: { country, category },
    });
    return response.data.articles;
  } catch (error) {
    console.error("Error fetching top headlines:", error);
    return [];
  }
};

// 2. 검색 기능 및 전체 뉴스 가져오기
export const searchNews = async (query) => {
  try {
    const response = await api.get('/everything', {
      params: {
        q: query,
        sortBy: 'publishedAt', // 최신순 정렬
      },
    });
    return response.data.articles;
  } catch (error) {
    console.error("Error searching news:", error);
    return [];
  }
};