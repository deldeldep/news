import React from 'react';

const RightSidebar = () => {
  return (
    <div>
       <h3 style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic', borderBottom: '1px solid #ddd', paddingBottom: '10px' }}>
        Daily Feed
      </h3>
      
      {/* 뉴스 아이템 예시 1 */}
      <div style={{ marginBottom: '20px' }}>
        <span style={{ fontSize: '10px', color: '#888', textTransform: 'uppercase' }}>LIFESTYLE</span>
        <h4 style={{ margin: '5px 0', fontSize: '16px' }}>How to be as Productive as a Google Employee</h4>
        <p style={{ fontSize: '13px', color: '#666', lineHeight: '1.4' }}>
          Suspendisse quis orci ut orci pulvinar eleifend. Nulla eu mattis ipsum.
        </p>
      </div>

       {/* 뉴스 아이템 예시 2 */}
       <div style={{ marginBottom: '20px' }}>
        <span style={{ fontSize: '10px', color: '#888', textTransform: 'uppercase' }}>HEALTH</span>
        <h4 style={{ margin: '5px 0', fontSize: '16px' }}>The Most Fascinating Show? The Met Trying to Fix Itself</h4>
      </div>
    </div>
  );
};

export default RightSidebar;