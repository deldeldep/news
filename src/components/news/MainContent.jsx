import React, { useEffect, useState } from 'react';
import { getTopHeadlines } from '../../services/api'; // API 함수 가져오기
import NewsSlider from './NewsSlider'; // 슬라이더 컴포넌트 가져오기

const MainContent = () => {
  const [articles, setArticles] = useState([]); // 기사 데이터를 저장할 상태
  const [loading, setLoading] = useState(true); // 로딩 상태

  useEffect(() => {
    // API 호출 함수
    const fetchNews = async () => {
      try {
        // 한국('kr') 뉴스 가져오기 (원하면 'us'로 변경 가능)
        const data = await getTopHeadlines('us'); 
        setArticles(data);
      } catch (error) {
        console.error("뉴스를 불러오는데 실패했습니다.", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) return <p>Loading news...</p>;

  // 첫 5개는 슬라이더용, 나머지는 리스트용으로 분리
  const sliderArticles = articles.slice(0, 5);
  const listArticles = articles.slice(5, 10);

  return (
    <div>
      <h2 style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic', fontSize: '28px', marginBottom: '20px', borderBottom: '2px solid #000', paddingBottom: '10px' }}>
        Breaking News
      </h2>
      
      {/* 1. 슬라이더 컴포넌트 사용 */}
      <NewsSlider articles={sliderArticles} />

      {/* 2. 나머지 기사 리스트 */}
      <div className="article-list">
        {listArticles.map((article, index) => (
          <div key={index} style={{ marginBottom: '30px', borderBottom: '1px solid #eee', paddingBottom: '20px' }}>
            <span style={{ fontSize: '11px', color: '#888' }}>
              {new Date(article.publishedAt).toLocaleDateString()}
            </span>
            <h3 style={{ fontSize: '26px', margin: '5px 0', fontFamily: 'Playfair Display, serif' }}>
              {article.title}
            </h3>
            <p style={{ fontSize: '17px', color: '#444', lineHeight: '1.6' }}>
              {article.description}
            </p>
            <a href={article.url} target="_blank" rel="noopener noreferrer" style={{fontSize: '12px', fontWeight: 'bold', color: '#000', textDecoration:'none'}}>
              READ MORE &rarr;
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainContent;