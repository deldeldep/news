import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getFeaturedStories } from '../../services/api';
import styles from './FeaturedStories.module.scss';

const FeaturedStories = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchFeatured = async () => {
      const data = await getFeaturedStories();
      const validData = data.filter(item => item.urlToImage).slice(0, 3);
      setArticles(validData);
    };

    fetchFeatured();
  }, []);

  if (articles.length === 0) return null; 

  return (
    <div className={styles.featuredContainer}>
      <h2 className={styles.sectionTitle}>Featured Stories</h2>
      
      <div className={styles.grid}>
        {articles.map((article, index) => {
          const date = new Date(article.publishedAt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          }).toUpperCase();

          return (
            <div key={index} className={styles.card}>
              <div className={styles.imageWrapper}>
                <Link to="/article" state={{ article: article }}>
                  <img src={article.urlToImage} alt={article.title} />
                </Link>
              </div>
              
              <div className={styles.meta}>
                <span>{date}</span>
                {/* 출처 이름을 카테고리처럼 사용 */}
                <span className={styles.category}>{article.source?.name || 'NEWS'}</span>
              </div>
              
              <h3 className={styles.title}>
                <Link to="/article" state={{ article: article }}>
                  {article.title}
                </Link>
              </h3>
              
              <p className={styles.desc}>
                {article.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FeaturedStories;