import React from 'react';


const LeftSidebar = () => {
  // 임시 더미 데이터
  const articles = [
    "The Ultimate Guide to New York's Favorite Food",
    "Salty Peanut-Pretzel Ice Cream Cake",
    "A Cool Solution for Hot Summer Nights",
    "Full Irish Breakfast In Manhattan",
    "Overcoming Your Fear Of The Kitchen"
  ];

  return (
    <div>
      <h3 style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic', borderBottom: '1px solid #ddd', paddingBottom: '10px' }}>
        Latest Articles
      </h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {articles.map((title, index) => (
          <li key={index} style={{ marginBottom: '15px', fontSize: '14px', color: '#555', cursor: 'pointer' }}>
            • {title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LeftSidebar;