import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Zap, ArrowRight, User, LogOut } from 'lucide-react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const checkAuth = () => {
    const savedUser = localStorage.getItem('bloggy_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    checkAuth();
    window.addEventListener('auth-change', checkAuth);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('auth-change', checkAuth);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('bloggy_user');
    localStorage.removeItem('bloggy_token');
    setUser(null);
    navigate('/');
  };

  // Close drawer on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        <Link to="/" className="logo">
          <Zap size={22} fill="currentColor" strokeWidth={2.5} />
          <span>BLOGY<span style={{ fontWeight: 300, opacity: 0.6 }}>AI</span></span>
        </Link>
        
        <div className="nav-actions">
          <nav className="nav-desktop">
            <ul className="nav-links">
              <li><Link to="/pipeline">Pipeline</Link></li>
              <li><Link to="/blogs">Archives</Link></li>
              <li><Link to="/audit">Audit Bureau</Link></li>
              <li><Link to="/pricing">Pricing</Link></li>
            </ul>
          </nav>
          
          <div className="desktop-auth-actions">
            {user ? (
              <div className="user-profile-nav">
                <span className="user-name">OPERATIVE: {user.name.split(' ')[0]}</span>
                <button className="logout-icon-btn" onClick={handleLogout} title="Logout">
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <Link to="/auth" className="btn btn-primary desktop-cta">
                Get Started
              </Link>
            )}
          </div>

          <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Bureau Drawer */}
        <div className={`nav-drawer ${isOpen ? 'open' : ''}`}>
          <div className="drawer-overlay" onClick={() => setIsOpen(false)}></div>
          <div className="drawer-content">
            <div className="drawer-header">
              <span className="badge">Executive Navigation</span>
              <button className="close-drawer" onClick={() => setIsOpen(false)}><X size={24} /></button>
            </div>
            
            {user && (
              <div className="drawer-user-info">
                 <User size={24} />
                 <div className="user-details">
                    <span className="u-name">{user.name}</span>
                    <span className="u-email">{user.email}</span>
                 </div>
              </div>
            )}

            <ul className="drawer-links">
              <li>
                <Link to="/">
                  <span className="num">01</span> Front Page <ArrowRight size={20} className="arrow" />
                </Link>
              </li>
              <li>
                <Link to="/pipeline">
                  <span className="num">02</span> The Pipeline <ArrowRight size={20} className="arrow" />
                </Link>
              </li>
              <li>
                <Link to="/blogs">
                  <span className="num">03</span> Archives <ArrowRight size={20} className="arrow" />
                </Link>
              </li>
              <li>
                <Link to="/audit">
                  <span className="num">04</span> Audit Bureau <ArrowRight size={20} className="arrow" />
                </Link>
              </li>
              <li>
                <Link to="/pricing">
                  <span className="num">05</span> Subscription <ArrowRight size={20} className="arrow" />
                </Link>
              </li>
            </ul>
            <div className="drawer-footer">
               {user ? (
                 <button className="btn btn-outline" onClick={handleLogout} style={{ width: '100%', justifyContent: 'center' }}>
                    TERMINATE SESSION <LogOut size={18} />
                 </button>
               ) : (
                 <Link to="/auth" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '1.2rem' }}>
                    START GENERATING <ArrowRight size={18} />
                 </Link>
               )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .navbar {
          border-bottom: 1.5px solid var(--border-ink);
          background-color: var(--bg-paper);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          padding: 1.25rem 0;
          z-index: 2000;
        }

        .navbar.scrolled {
          padding: 0.8rem 0;
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
        }

        .logo {
          font-variation-settings: 'wght' 800;
          font-size: 1.25rem;
          display: flex;
          align-items: center;
          gap: 0.6rem;
          letter-spacing: 1px;
        }

        .logo span {
           font-family: var(--font-sans);
           font-weight: 800;
        }

        .nav-actions {
          display: flex;
          align-items: center;
          gap: 2rem;
        }

        .nav-links {
          display: flex;
          gap: 2rem;
          list-style: none;
        }

        .nav-links a {
          text-decoration: none;
          color: var(--text-main);
          font-weight: 600;
          text-transform: uppercase;
          font-size: 0.75rem;
          letter-spacing: 1.5px;
          opacity: 0.7;
          transition: opacity 0.2s;
        }

        .nav-links a:hover {
          opacity: 1;
        }

        .desktop-auth-actions {
          display: flex;
          align-items: center;
        }

        .user-profile-nav {
          display: flex;
          align-items: center;
          gap: 1rem;
          background: #f5f5f5;
          padding: 0.5rem 1rem;
          border: 1px solid var(--border-ink);
        }

        .user-name {
          font-size: 0.7rem;
          font-weight: 900;
          letter-spacing: 0.5px;
          color: var(--accent-ink);
        }

        .logout-icon-btn {
          background: none;
          border: none;
          cursor: pointer;
          color: var(--text-muted);
          display: flex;
          align-items: center;
          padding: 0.2rem;
          transition: color 0.2s;
        }

        .logout-icon-btn:hover {
          color: #d32f2f;
        }

        .mobile-toggle {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          color: var(--text-main);
          padding: 0.5rem;
        }

        /* Drawer System */
        .nav-drawer {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          visibility: hidden;
          z-index: 3000;
        }

        .nav-drawer.open {
          visibility: visible;
        }

        .drawer-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.2);
          backdrop-filter: blur(4px);
          opacity: 0;
          transition: opacity 0.5s ease;
        }

        .nav-drawer.open .drawer-overlay {
          opacity: 1;
        }

        .drawer-content {
          position: absolute;
          top: 0;
          right: 0;
          width: 100%;
          max-width: 450px;
          height: 100%;
          background: var(--bg-paper);
          transform: translateX(100%);
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          padding: 2rem;
          display: flex;
          flex-direction: column;
          border-left: 2px solid var(--border-ink);
        }

        .nav-drawer.open .drawer-content {
          transform: translateX(0);
        }

        .drawer-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          border-bottom: 1.5px solid var(--border-ink);
          padding-bottom: 1.5rem;
        }

        .drawer-user-info {
           display: flex;
           align-items: center;
           gap: 1rem;
           background: #f9f9f9;
           padding: 1rem;
           margin-bottom: 2rem;
           border: 1px solid #eee;
        }

        .user-details {
           display: flex;
           flex-direction: column;
        }

        .u-name { font-weight: 800; font-size: 0.9rem; }
        .u-email { font-size: 0.75rem; color: var(--text-muted); }

        .close-drawer {
          background: none;
          border: none;
          cursor: pointer;
        }

        .drawer-links {
          list-style: none;
          flex: 1;
        }

        .drawer-links li {
          margin-bottom: 0.5rem;
        }

        .drawer-links a {
          display: flex;
          align-items: center;
          text-decoration: none;
          color: var(--text-main);
          font-family: var(--font-serif);
          font-size: 2.25rem;
          font-weight: 700;
          padding: 1rem 0;
          border-bottom: 1px solid rgba(0,0,0,0.05);
          transition: all 0.3s;
        }

        .drawer-links .num {
          font-family: var(--font-sans);
          font-size: 0.8rem;
          opacity: 0.3;
          margin-right: 1.5rem;
        }

        .drawer-links .arrow {
          margin-left: auto;
          opacity: 0;
          transform: translateX(-10px);
          transition: all 0.3s;
        }

        .drawer-links a:hover {
          padding-left: 1rem;
          color: var(--text-muted);
        }

        .drawer-links a:hover .arrow {
          opacity: 1;
          transform: translateX(0);
        }

        @media (max-width: 992px) {
          .nav-desktop, .desktop-auth-actions { display: none; }
          .mobile-toggle { display: block; }
        }

        @media (max-width: 480px) {
          .drawer-content { max-width: 100%; }
          .drawer-links a { font-size: 1.75rem; }
        }
      `}</style>
    </header>
  );
}
