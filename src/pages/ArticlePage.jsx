import React, { useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import styles from './ArticlePage.module.scss';

const ArticlePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const article = location.state?.article;

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!article) {
      navigate('/');
    }
  }, [article, navigate]);

  if (!article) return null;

  return (
    <div className={styles.pageContainer}>
      {/* 뒤로 가기 버튼 */}
      <Link to={-1} className={styles.backBtn}>&larr; Go Back</Link>

      <h1 className={styles.title}>{article.title}</h1>
      
      <div className={styles.meta}>
        {article.author && <span>By {article.author}</span>}
        <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
      </div>

      {article.urlToImage && (
        <div className={styles.imageWrapper}>
          <img src={article.urlToImage} alt={article.title} />
        </div>
      )}

      <div className={styles.content}>
        {/* NewsAPI의 무료 버전 특성상 요약본(description)이 올 수 있습니다. */}
        <p>{article.content || article.description || "기사의 상세 내용은 제공되지 않습니다. 원문을 확인해 주세요."}</p>
      </div>

      {/* 원문 링크 버튼 */}
      <a 
        href={article.url} 
        target="_blank" 
        rel="noopener noreferrer" 
        className={styles.originalLinkBtn}
      >
        Read Original Article
      </a>
    </div>
  );
};

export default ArticlePage;