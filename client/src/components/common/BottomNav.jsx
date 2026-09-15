import React from 'react';
import { Home, Search, Bell, User, PlusSquare } from 'lucide-react';
import './BottomNav.css';

const BottomNav = () => {
  return (
    <nav className="mobile-bottom-nav">
      <button className="nav-item">
        <Home size={24} />
        <span>Home</span>
      </button>
      <button className="nav-item">
        <Search size={24} />
        <span>Explore</span>
      </button>
      <button className="nav-item active">
        <div className="plus-icon">
          <PlusSquare size={32} />
        </div>
      </button>
      <button className="nav-item">
        <Bell size={24} />
        <span>Inbox</span>
      </button>
      <button className="nav-item">
        <User size={24} />
        <span>Profile</span>
      </button>
    </nav>
  );
};

export default BottomNav;
