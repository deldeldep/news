import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTopHeadlines } from '../services/api'; // API 함수
import styles from './CategoryPage.module.scss';

const CategoryPage = () => {
  // URL에서 category 파라미터 추출 (예: 'technology')
  const { category } = useParams();
  
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryNews = async () => {
      setLoading(true);
      try {
        // API 호출: 한국 뉴스 + 해당 카테고리
        const data = await getTopHeadlines('us', category);
        setArticles(data);
      } catch (error) {
        console.error("카테고리 뉴스 로딩 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    // 카테고리가 바뀔 때마다 실행
    fetchCategoryNews();
  }, [category]);

  if (loading) return <div style={{textAlign: 'center', padding: '50px'}}>Loading {category}...</div>;

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.title}>{category} News</h1>
      
      <div className={styles.grid}>
        {articles.map((article, index) => (
          <article key={index} className={styles.card}>
            {/* 이미지 영역 */}
            <div className={styles.imageWrapper}>
              {article.urlToImage && (
                <img src={article.urlToImage} alt={article.title} />
              )}
            </div>

            {/* 텍스트 영역 */}
            <div className={styles.date}>
              {new Date(article.publishedAt).toLocaleDateString()}
            </div>
            
            <h3>
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                {article.title}
              </a>
            </h3>
            
            <p>{article.description}</p>
          </article>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;