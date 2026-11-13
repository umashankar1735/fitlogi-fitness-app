// src/components/Navbar.js
import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';

const links = [
  { to: "/", label: "Home", icon: "🏠" },
  { to: "/exercise", label: "Exercise", icon: "🏋️" },
  { to: "/diet", label: "Diet", icon: "🥗" },
  { to: "/progress", label: "Progress", icon: "📊" },
  { to: "/plans", label: "Plans", icon: "📋" },
  { to: "/goals", label: "Goals", icon: "🎯" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="logo" onClick={() => navigate('/')}>
          <div className="logo-icon">💪</div>
          <span className="brand">FitTrack</span>
        </div>

        <ul className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          {links.map(({ to, label, icon }, index) => (
            <li key={index}>
              <NavLink
                to={to}
                className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="nav-icon">{icon}</span>
                <span className="nav-label">{label}</span>
              </NavLink>
            </li>
          ))}
          <li className="nav-cta">
            <button className="cta-button" onClick={() => {
              setMobileMenuOpen(false);
              navigate('/');
              setTimeout(() => {
                const modal = document.querySelector('.modal-overlay');
                if (modal) modal.click();
              }, 100);
            }}>
              Get Started
            </button>
          </li>
        </ul>

        <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
          <span className={`hamburger ${mobileMenuOpen ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
