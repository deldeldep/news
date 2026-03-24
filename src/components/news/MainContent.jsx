import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getTopHeadlines } from '../../services/api';
import NewsSlider from './NewsSlider';
import FeaturedStories from './FeaturedStories'; 

const MainContent = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
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

  const sliderArticles = articles.slice(0, 5);
  const listArticles = articles.slice(5, 10);

  return (
    <div>
      <h2 style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic', fontSize: '28px', marginBottom: '20px', borderBottom: '2px solid #000', paddingBottom: '10px' }}>
        Breaking News
      </h2>
      
      <NewsSlider articles={sliderArticles} />

      <div className="article-list">
        {listArticles.map((article, index) => (
          <div key={index} style={{ marginBottom: '30px', borderBottom: '1px solid #eee', paddingBottom: '20px' }}>
            <span style={{ fontSize: '11px', color: '#888' }}>
              {new Date(article.publishedAt).toLocaleDateString()}
            </span>
            <h3 style={{ fontSize: '22px', margin: '10px 0', fontFamily: 'Playfair Display, serif' }}>
              {article.title}
            </h3>
            <p style={{ fontSize: '15px', color: '#444', lineHeight: '1.6' }}>
              {article.description}
            </p>
            <Link 
              to="/article" 
              state={{ article: article }} 
              style={{fontSize: '13px', fontWeight: 'bold', color: '#000', textDecoration:'none'}}
            >
              READ MORE &rarr;
            </Link>
          </div>
        ))}
      </div>
      <FeaturedStories />
      
    </div>
  );
};

export default MainContent;