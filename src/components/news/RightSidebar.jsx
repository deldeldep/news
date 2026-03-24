import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPopularNews } from '../../services/api'; 
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import styles from './RightSidebar.module.scss';

const RightSidebar = () => {
  const [articles, setArticles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerSlide = 4;

  useEffect(() => {
    const fetchPopular = async () => {
      const data = await getPopularNews('world', 12);
      // 혹시 데이터가 부족할 수 있으니 유효한 데이터만 필터링
      const validData = data.filter(article => article.title && article.title !== '[Removed]');
      setArticles(validData);
    };

    fetchPopular();
  }, []);

  const totalSlides = Math.ceil(articles.length / itemsPerSlide);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const currentArticles = articles.slice(
    currentIndex * itemsPerSlide, 
    (currentIndex + 1) * itemsPerSlide
  );

  return (
    <div className={styles.sidebarContainer}>
      <h3 className={styles.sectionTitle}>
        Daily Feed
      </h3>
      
      {/* 기사 리스트 영역 */}
      <ul className={styles.articleList}>
        {currentArticles.map((article, index) => (
          <li key={index} className={styles.articleItem}>
            {/* NewsAPI에서 제공하는 출처(source)를 카테고리처럼 활용 */}
            <div className={styles.source}>
              IN {article.source?.name || 'GENERAL'}
            </div>
            
            <h4 className={styles.title}>
                <Link to="/article" state={{ article: article }}>
                  {article.title} 
                </Link>
            </h4>
            
            <p className={styles.desc}>
              {article.description}
            </p>
          </li>
        ))}
      </ul>

      {/* 하단 슬라이드 컨트롤 영역 */}
      {articles.length > itemsPerSlide && (
        <div className={styles.pagination}>
          <span className={styles.viewMore}>VIEW MORE POSTS</span>
          <div className={styles.arrows}>
            <button onClick={prevSlide} aria-label="Previous posts">
              <FaChevronLeft />
            </button>
            <button onClick={nextSlide} aria-label="Next posts">
              <FaChevronRight />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RightSidebar;