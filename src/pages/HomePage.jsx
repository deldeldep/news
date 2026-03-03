import React from 'react';
import styles from './HomePage.module.scss'; // 2단계에서 만든 스타일 import

// 컴포넌트 import
import LeftSidebar from '../components/news/LeftSidebar';
import MainContent from '../components/news/MainContent';
import RightSidebar from '../components/news/RightSidebar';

const HomePage = () => {
  return (
    <div className={styles.container}>
      {/* 왼쪽: 최신 기사 목록 */}
      <aside className={styles.leftColumn}>
        <LeftSidebar />
      </aside>

      {/* 중앙: 메인 뉴스 및 슬라이더 */}
      <main className={styles.mainColumn}>
        <MainContent />
      </main>

      {/* 오른쪽: 데일리 피드 */}
      <aside className={styles.rightColumn}>
        <RightSidebar />
      </aside>
    </div>
  );
};

export default HomePage;