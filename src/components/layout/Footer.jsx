import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa'; // SNS 아이콘
import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footerContainer}>
      {/* 1. 로고 */}
      <div className={styles.logo}>The Newspaper</div>

      <div className={styles.footerRbx}>
          {/* 2. SNS 아이콘 */}
          <div className={styles.socialIcons}>
            <FaFacebookF />
            <FaTwitter />
            <FaInstagram />
            <FaYoutube />
          </div>
    
          {/* 3. 빠른 링크 */}
          <div className={styles.links}>
            <Link to="/">Home</Link>
            <Link to="#">About Us</Link>
            <Link to="#">Contact</Link>
          </div>
    
          {/* 4. 저작권 정보 */}
          <div className={styles.copyright}>
            <p>&copy; {new Date().getFullYear()} The Newspaper. All rights reserved.</p>
            <p>Designed for Portfolio Purpose.</p>
          </div>
      </div>
    </footer>
  );
};

export default Footer;