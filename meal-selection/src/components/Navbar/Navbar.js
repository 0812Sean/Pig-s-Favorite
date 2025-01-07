import React, { useState, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
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
            <NavLink
              to="/breakfast"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              早餐
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/lunch"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              午餐
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dinner"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              晚餐
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/soup"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              汤
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dessert"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              甜品
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/service"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              特殊服务
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/selected-items"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              已选
            </NavLink>
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
