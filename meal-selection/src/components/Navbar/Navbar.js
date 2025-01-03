import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);
  const navigate = useNavigate();

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (onSearch) {
      onSearch(query);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsMuted(!isMuted);
    }
  };

  return (
    <nav className="navbar">
      <div className="logo" onClick={() => navigate('/')}>
        <img src="/images/0301.jpeg" alt="Logo" />
      </div>

      <div className="navbar-center">
        <ul className="navbar-list">
          <li>
            <Link to="/breakfast">早餐</Link>
          </li>
          <li>
            <Link to="/lunch">午餐</Link>
          </li>
          <li>
            <Link to="/dinner">晚餐</Link>
          </li>
          <li>
            <Link to="/soup">汤</Link>
          </li>
          <li>
            <Link to="/dessert">甜品</Link>
          </li>
          <li>
            <Link to="/service">特殊服务</Link>
          </li>
          <li>
            <Link to="/selected-items">已选</Link>
          </li>
        </ul>
        <div className="search-bar">
          <input
            type="text"
            placeholder="搜索当前页面的食物..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="audio-control" onClick={toggleMute}>
        <img
          src={isMuted ? '/images/volume1.jpeg' : '/images/mute1.jpeg'}
          alt="Audio Control"
        />
      </div>

      <audio ref={audioRef} src="/images/猪猪侠.mp3" autoPlay loop />
    </nav>
  );
};

export default Navbar;
