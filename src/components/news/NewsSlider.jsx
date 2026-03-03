import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import styles from './NewsSlider.module.scss';

const NewsSlider = ({ articles }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // 데이터가 없으면 로딩 중 표시
  if (!articles || articles.length === 0) {
    return <div className={styles.sliderContainer} style={{display:'flex', alignItems:'center', justifyContent:'center', color:'white'}}>Loading...</div>;
  }

  // 다음 슬라이드
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === articles.length - 1 ? 0 : prev + 1));
  };

  // 이전 슬라이드
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? articles.length - 1 : prev - 1));
  };

  // 현재 보여줄 기사
  const currentArticle = articles[currentIndex];

  return (
    <div className={styles.sliderContainer}>
      <div className={styles.slide}>
        {/* 이미지가 없으면 기본 이미지(placeholder) 사용 */}
        <img 
          src={currentArticle.urlToImage || 'https://via.placeholder.com/800x450?text=No+Image'} 
          alt={currentArticle.title} 
        />
        
        <div className={styles.content}>
          <span>Latest News</span>
          <h2>{currentArticle.title}</h2>
          <p>{currentArticle.description}</p>
        </div>
      </div>

      <button className={`${styles.button} ${styles.prev}`} onClick={prevSlide}>
        <FaChevronLeft />
      </button>
      <button className={`${styles.button} ${styles.next}`} onClick={nextSlide}>
        <FaChevronRight />
      </button>
    </div>
  );
};

export default NewsSlider;