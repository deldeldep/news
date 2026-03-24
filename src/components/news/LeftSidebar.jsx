import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { getLatestArticles, getRecommendedNews } from '../../services/api'; 
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import styles from './LeftSidebar.module.scss';

// 태그 클라우드용 데이터
const topSearches = [
  { text: 'Art & Design', size: '13px', font: 'serif' },
  { text: 'Blog', size: '24px', font: 'serif' },
  { text: 'Business', size: '14px', font: 'sans-serif' },
  { text: 'Culture', size: '15px', font: 'serif' },
  { text: 'Economy', size: '18px', font: 'serif' },
  { text: 'Health', size: '20px', font: 'sans-serif', weight: 'bold' },
  { text: 'Lifestyle', size: '28px', font: 'serif', weight: 'bold' },
  { text: 'Movies', size: '12px', font: 'sans-serif' },
  { text: 'N.Y.', size: '14px', font: 'serif', weight: 'bold' },
  { text: 'Newspaper', size: '16px', font: 'serif' },
  { text: 'Obituaries', size: '13px', font: 'serif' },
  { text: 'Photos', size: '15px', font: 'sans-serif', weight: 'bold' },
  { text: 'Politics', size: '14px', font: 'serif' },
  { text: 'Post', size: '17px', font: 'serif', weight: 'bold' },
];

const LeftSidebar = () => {
  const [latestArticles, setLatestArticles] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [recIndex, setRecIndex] = useState(0);
  
  const navigate = useNavigate(); // 

  useEffect(() => {
    const fetchLatest = async () => {
      const data = await getLatestArticles();
      setLatestArticles(data);
    };

    const fetchRecommended = async () => {
      const data = await getRecommendedNews();
      const validData = data.filter(item => item.urlToImage);
      setRecommended(validData);
    };

    fetchLatest();
    fetchRecommended();
  }, []);

  const nextRecSlide = () => {
    setRecIndex((prev) => (prev === recommended.length - 1 ? 0 : prev + 1));
  };
  const prevRecSlide = () => {
    setRecIndex((prev) => (prev === 0 ? recommended.length - 1 : prev - 1));
  };

  // 👈 태그 클릭 시 실행될 함수
  const handleTagClick = (keyword) => {
    navigate(`/search?q=${keyword}`);
  };

  return (
    <div className={styles.sidebarContainer}>
      
      {/* 1. LATEST ARTICLES */}
      <div className={styles.sectionTitle}>LATEST ARTICLES</div>
      <ul className={styles.latestList}>
        {latestArticles.map((article, index) => (
          <li key={index}>
            <Link to="/article" state={{ article: article }}>
              • {article.title}
            </Link>
          </li>
        ))}
      </ul>

      {/* 2. RECOMMENDED (슬라이드) */}
      {recommended.length > 0 && (
        <div className={styles.recommendedSlide}>
          <div className={styles.sectionTitle}>
            RECOMMENDED
            <div className={styles.arrows}>
              <button onClick={prevRecSlide}><FaChevronLeft /></button>
              <button onClick={nextRecSlide}><FaChevronRight /></button>
            </div>
          </div>
          
          <div className={styles.slideContent}>
            <img 
              src={recommended[recIndex].urlToImage} 
              alt="Recommended" 
            />
            <h4>
              <Link to="/article" state={{ article: recommended[recIndex] }}>
                {recommended[recIndex].title}
              </Link>
            </h4>
          </div>
        </div>
      )}

      {/* 3. ADVERTISING (가상 광고) */}
      <div className={styles.sectionTitle}>ADVERTISING</div>
      <div className={styles.adContainer}>
        <span>ADVERTISING<br/>RECTANGLE</span>
      </div>

      {/* 4. TOP SEARCHES (태그 클라우드) */}
      <div className={styles.sectionTitle}>TOP SEARCHES</div>
      <div className={styles.tagCloud}>
        {topSearches.map((tag, index) => (
          <span 
            key={index}
            onClick={() => handleTagClick(tag.text)}
            style={{ 
              fontSize: tag.size, 
              fontFamily: tag.font === 'serif' ? "'Playfair Display', serif" : "'Source Sans 3', sans-serif",
              fontWeight: tag.weight || 'normal'
            }}
          >
            {tag.text}
          </span>
        ))}
      </div>

    </div>
  );
};

export default LeftSidebar;