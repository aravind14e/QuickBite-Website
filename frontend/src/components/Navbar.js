import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthModal from './AuthModal';
import './Navbar.css';

export default function Navbar({ user, onLogout, cartCount, onCartClick, onAuthClick }) {
  const [showAuth, setShowAuth] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Close mobile menu when clicking outside or resizing window
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuOpen && !event.target.closest('.navbar')) {
        setMobileMenuOpen(false);
      }
      if (showMenu && !event.target.closest('.account-menu-wrapper')) {
        setShowMenu(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth > 768 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    window.addEventListener('resize', handleResize);
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
      window.removeEventListener('resize', handleResize);
    };
  }, [mobileMenuOpen, showMenu]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const toggleMobileMenu = (e) => {
    e.stopPropagation();
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-brand">
          <div className="logo">
            <Link to="/" onClick={() => scrollToSection('home-section')}>
              QuickBite<span className="dot">.</span>
            </Link>
          </div>
          
          {/* Desktop Navigation Links */}
          <ul className="nav-links desktop-nav">
            <li>
              <Link to="/" onClick={() => scrollToSection('home-section')}>Home</Link>
            </li>
            <li>
              <Link to="/" onClick={() => scrollToSection('menu-section')}>Menu</Link>
            </li>
            <li>
              <Link to="/" onClick={() => scrollToSection('app-section')}>App</Link>
            </li>
            <li>
              <Link to="/" onClick={() => scrollToSection('contact-section')}>Contact us</Link>
            </li>
          </ul>

          {/* Desktop Icons */}
          <div className="nav-icons desktop-icons">
            {/* Cart Icon */}
            <span className="icon cart-icon" onClick={onCartClick}>
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              {cartCount > 0 && (
                <span className="cart-badge">{cartCount}</span>
              )}
            </span>

            {/* User Account */}
            {user ? (
              <div className="account-menu-wrapper">
                <button
                  className="account-btn"
                  onClick={() => setShowMenu(!showMenu)}
                >
                  <div className="user-avatar">
                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <span className="user-name">{user.name || 'Account'}</span>
                  <svg className={`dropdown-arrow ${showMenu ? 'open' : ''}`} width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6,9 12,15 18,9"></polyline>
                  </svg>
                </button>
                
                {showMenu && (
                  <div className="account-dropdown">
                    <div className="dropdown-header">
                      <div className="user-avatar large">
                        {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                      </div>
                      <div className="user-info">
                        <strong>{user.name}</strong>
                        <span>{user.email}</span>
                      </div>
                    </div>
                    <div className="dropdown-menu">
                      <button
                        className="dropdown-item"
                        onClick={() => { 
                          setShowMenu(false);
                          navigate('/orders');
                        }}
                      >
                        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M16 4H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"></path>
                          <polyline points="8,2 8,6"></polyline>
                          <polyline points="16,2 16,6"></polyline>
                        </svg>
                        My Orders
                      </button>
                      <button
                        className="dropdown-item logout"
                        onClick={() => { 
                          setShowMenu(false); 
                          onLogout(); 
                          navigate('/');
                        }}
                      >
                        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                          <polyline points="16,17 21,12 16,7"></polyline>
                          <line x1="21" y1="12" x2="9" y2="12"></line>
                        </svg>
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button className="nav-btn signin-btn" onClick={onAuthClick}>
                Login / Signup
              </button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className={`mobile-menu-toggle ${mobileMenuOpen ? 'active' : ''}`}
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && <div className="mobile-overlay" onClick={() => setMobileMenuOpen(false)}></div>}

        {/* Mobile Dropdown Menu */}
        <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
          <div className="mobile-menu-content">
            <ul className="mobile-nav-links">
              <li>
                <Link to="/" onClick={() => scrollToSection('home-section')}>
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9,22 9,12 15,12 15,22"></polyline>
                  </svg>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/" onClick={() => scrollToSection('menu-section')}>
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  Menu
                </Link>
              </li>
              <li>
                <Link to="/" onClick={() => scrollToSection('app-section')}>
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                    <line x1="8" y1="21" x2="16" y2="21"></line>
                    <line x1="12" y1="17" x2="12" y2="21"></line>
                  </svg>
                  App
                </Link>
              </li>
              <li>
                <Link to="/" onClick={() => scrollToSection('contact-section')}>
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                  Contact us
                </Link>
              </li>
            </ul>

            <div className="mobile-menu-actions">
              {/* Mobile Cart */}
              <button className="mobile-cart-btn" onClick={() => { onCartClick(); setMobileMenuOpen(false); }}>
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
                <span>Cart</span>
                {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
              </button>

              {/* Mobile User Actions */}
              {user ? (
                <div className="mobile-user-section">
                  <div className="mobile-user-info">
                    <div className="user-avatar">
                      {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <div className="user-details">
                      <strong>{user.name}</strong>
                      <span>{user.email}</span>
                    </div>
                  </div>
                  <div className="mobile-user-actions">
                    <button
                      className="mobile-action-btn"
                      onClick={() => { 
                        navigate('/orders');
                        setMobileMenuOpen(false);
                      }}
                    >
                      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 4H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"></path>
                        <polyline points="8,2 8,6"></polyline>
                        <polyline points="16,2 16,6"></polyline>
                      </svg>
                      My Orders
                    </button>
                    <button
                      className="mobile-action-btn logout"
                      onClick={() => { 
                        onLogout(); 
                        navigate('/');
                        setMobileMenuOpen(false);
                      }}
                    >
                      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                        <polyline points="16,17 21,12 16,7"></polyline>
                        <line x1="21" y1="12" x2="9" y2="12"></line>
                      </svg>
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <button 
                  className="mobile-signin-btn" 
                  onClick={() => { onAuthClick(); setMobileMenuOpen(false); }}
                >
                  Login / Signup
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
      <AuthModal open={showAuth} onClose={() => setShowAuth(false)} />
    </>
  );
}
