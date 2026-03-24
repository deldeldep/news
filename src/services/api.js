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

// 👇 [추가] 사이드바용 최신 기사 5개만 가져오는 함수
export const getLatestArticles = async () => {
  try {
    const response = await api.get('/top-headlines', {
      params: {
        country: 'us', // 한국 뉴스
        pageSize: 10,   // 👈 중요! 딱 5개만 가져오라고 주문
      },
    });
    return response.data.articles;
  } catch (error) {
    console.error("Latest articles error:", error);
    return [];
  }
};

export const getPopularNews = async (query = 'world', pageSize = 12) => {
  try {
    const response = await api.get('/everything', {
      params: {
        q: 'query',
        sortBy: 'popularity', 
        pageSize: pageSize,
      },
    });
    return response.data.articles;
  } catch (error) {
    console.error("Popular News error:", error);
    return [];
  }
};

// [추가] 왼쪽 사이드바 추천 기사용 (이미지 있는 기사 위주로)
export const getRecommendedNews = async () => {
  try {
    const response = await api.get('/top-headlines', {
      params: {
        category: 'entertainment', // 엔터테인먼트 카테고리 활용
        country: 'us',
        pageSize: 5,
      },
    });
    return response.data.articles;
  } catch (error) {
    console.error("Recommended News error:", error);
    return [];
  }
};

// ... 기존 코드 ...

// [추가] Featured Stories용 기사 3개 가져오기
export const getFeaturedStories = async () => {
  try {
    const response = await api.get('/top-headlines', {
      params: {
        country: 'us',
        category: 'health', 
        pageSize: 3,
      },
    });
    return response.data.articles;
  } catch (error) {
    console.error("Featured Stories error:", error);
    return [];
  }
};