import '../css/Header.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleSearchClick = () => {
    if (!searchQuery) {
      alert('검색어를 입력하세요.'); // 검색어가 비어있을 때 경고창 표시
    } else {
      // 검색어가 입력된 경우 검색 페이지로 이동
      window.location.href = `/search?query=${searchQuery}`;
    }
  };

  return (
    <section className='header'>
      <div className='inner'>
        <Link to='/'>
          <div className="logo">
            JGV
          </div>
          <p>CULTUREPLEX</p>
        </Link>
        <div className='search'>
            <input
              type="text"
              placeholder="영화 제목을 입력하세요"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
              <img onClick={handleSearchClick}src='img/search.png'/>
        </div>
      </div>
    </section>
  );
}

export default Header;