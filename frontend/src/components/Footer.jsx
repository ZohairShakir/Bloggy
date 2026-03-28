import { Link } from 'react-router-dom';
import { Zap, Twitter, Linkedin, Github, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="footer-v2">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="logo">
              <Zap size={22} fill="currentColor" strokeWidth={2.5} />
              <span>BLOGY<span style={{ fontWeight: 300, opacity: 0.6 }}>AI</span></span>
            </Link>
            <p className="footer-description text-serif">
              The AI-powered newspaper engine for modern Indian businesses. Professional voice, automated scale.
            </p>
            <div className="footer-socials">
              <a href="#" aria-label="Twitter"><Twitter size={18} /></a>
              <a href="#" aria-label="LinkedIn"><Linkedin size={18} /></a>
              <a href="#" aria-label="GitHub"><Github size={18} /></a>
            </div>
          </div>
          
          <div className="footer-nav-group">
            <div className="footer-col">
              <h4>Bureau</h4>
              <ul>
                <li><Link to="/pipeline">The Pipeline</Link></li>
                <li><Link to="/blogs">Archives</Link></li>
                <li><Link to="/audit">Audit Bureau</Link></li>
              </ul>
            </div>
            
            <div className="footer-col">
              <h4>Resources</h4>
              <ul>
                <li><Link to="/pricing">Pricing</Link></li>
                <li><Link to="/docs">Documentation</Link></li>
                <li><a href="#">Support</a></li>
              </ul>
            </div>
            
            <div className="footer-col">
              <h4>Legal</h4>
              <ul>
                <li><Link to="/privacy">Privacy Policy</Link></li>
                <li><Link to="/terms">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>© 2026 Blogy AI Engine. A Prachar.AI Initiative.</p>
          <div className="footer-badges">
            <span className="badge">Made in India</span>
            <span className="badge">AI Powered</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

