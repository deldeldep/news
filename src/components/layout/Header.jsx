import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa'; // 돋보기 아이콘

// 방금 만든 SCSS 모듈을 styles라는 이름으로 가져옵니다.
import styles from './Header.module.scss';

const categories = ['Business', 'Entertainment', 'Health', 'Science', 'Sports', 'Technology'];

const Header = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      navigate(`/search?q=${searchTerm}`);
      setShowSearch(false);
    }
  };

  // 검색 아이콘 클릭 핸들러
  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  return (
    <header className={styles.headerContainer}>
      {/* 1. 로고 영역 */}
      <h1 className={styles.logo}>
        <Link to="/">The Newspaper</Link>
      </h1>

      {/* 2. 네비게이션 영역 */}
      <nav className={styles.nav}>
        <ul className={styles.menuList}>
          <li className={styles.menuItem}>
            <Link to="/">Home</Link>
          </li>
          {categories.map((cat) => (
            <li key={cat} className={styles.menuItem}>
              <Link to={`/category/${cat.toLowerCase()}`}>{cat}</Link>
            </li>
          ))}
        </ul>

        {/* 3. 검색 영역 */}
        <div className={styles.searchContainer}>
          {showSearch && (
            <input 
              type="text"
              className={styles.searchInput}
              placeholder="Search..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleSearch}
              autoFocus
            />
          )}
          <FaSearch onClick={toggleSearch} />
        </div>
      </nav>
    </header>
  );
};

export default Header;