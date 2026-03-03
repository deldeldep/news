import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchNews } from '../services/api'; // API 함수 가져오기
import styles from './SearchPage.module.scss';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q'); // URL에서 'q' 값 가져오기

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query) return; // 검색어가 없으면 실행 안 함

      setLoading(true);
      try {
        const data = await searchNews(query);
        setArticles(data);
      } catch (error) {
        console.error("검색 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]); // query가 바뀔 때마다 실행

  // 로딩 중일 때
  if (loading) return <div style={{textAlign:'center', marginTop:'50px'}}>Searching for "{query}"...</div>;

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchHeader}>
        <h2>Search Results for: <span>"{query}"</span></h2>
        <p>Found {articles.length} articles</p>
      </div>

      {articles.length === 0 ? (
        <div className={styles.noResults}>
          <p>검색 결과가 없습니다. 다른 키워드로 검색해 보세요.</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {articles.map((article, index) => (
            <div key={index} className={styles.card}>
              {article.urlToImage && (
                <img src={article.urlToImage} alt={article.title} />
              )}
              <h3>
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                  {article.title}
                </a>
              </h3>
              <p>{article.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;