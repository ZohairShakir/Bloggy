import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Mail, Lock, User, ArrowRight, Github, Chrome, ShieldCheck, Fingerprint } from 'lucide-react';

export function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleToggle = () => {
    setIsLogin(!isLogin);
    setError('');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
    
    try {
      const res = await axios.post(endpoint, formData);
      if (isLogin) {
        localStorage.setItem('bloggy_user', JSON.stringify(res.data.user));
        localStorage.setItem('bloggy_token', res.data.token);
        window.dispatchEvent(new Event('auth-change'));
        navigate('/demo');
      } else {
        alert("Agent Registered. Proceed to Access.");
        setIsLogin(true);
      }
    } catch (err) {
      setError(err.response?.data?.error || "Bureau Authentication Failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-laboratory animate-fade-in">
      <div className="auth-aura"></div>
      
      <div className="auth-card-shield">
        <div className="auth-card card glass">
          <header className="auth-card-header">
            <div className="bureau-marker">
              <ShieldCheck size={28} />
              <span>BGY-INTERNAL</span>
            </div>
            <h1 className="auth-title">
              {isLogin ? "Bureau" : "Agent"} <span className="serif-italic">{isLogin ? "Access" : "Registration"}</span>
            </h1>
            <p className="auth-desc">
              {isLogin 
                ? "Enter encrypted credentials to synchronize with the intelligence layer." 
                : "Initialize your operative profile for manuscript synthesis protocols."}
            </p>
          </header>

          {error && <div className="auth-alert animate-shake">{error}</div>}

          <form className="auth-manifest" onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="protocol-input">
                <label>OPERATIVE IDENTIFIER</label>
                <div className="field-group">
                  <User size={18} className="field-icon" />
                  <input 
                    type="text" 
                    name="name" 
                    placeholder="Full Name" 
                    value={formData.name}
                    onChange={handleChange}
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            <div className="protocol-input">
              <label>BUREAU EMAIL ADDRESS</label>
              <div className="field-group">
                <Mail size={18} className="field-icon" />
                <input 
                  type="email" 
                  name="email" 
                  placeholder="agent@bloggy.ai" 
                  value={formData.email}
                  onChange={handleChange}
                  required 
                />
              </div>
            </div>

            <div className="protocol-input">
              <label>SECURITY PASSCODE</label>
              <div className="field-group">
                <Lock size={18} className="field-icon" />
                <input 
                  type="password" 
                  name="password" 
                  placeholder="••••••••" 
                  value={formData.password}
                  onChange={handleChange}
                  required 
                />
              </div>
            </div>

            <div className="manifest-options">
               <button type="button" onClick={handleToggle} className="text-btn">
                  {isLogin ? "No Account? Register" : "Existing Operative? Login"}
               </button>
               {isLogin && <Link to="#" className="text-btn muted">Forgot?</Link>}
            </div>

            <button className="btn btn-primary manifest-btn" disabled={loading}>
              {loading ? (
                <span className="loading-dots">IDENTIFYING</span>
              ) : (
                <>
                  <Fingerprint size={20} />
                  <span>{isLogin ? "AUTHORIZE ACCESS" : "INITIALIZE AGENT"}</span>
                </>
              )}
            </button>
          </form>

          <div className="bureau-footer-note">
             <div className="line-sep"></div>
             <p>© 2026 BLOGGY AI BUREAU • SECURE SYNTHESIS PROTOCOL</p>
          </div>
        </div>
      </div>

      <style>{`
        .auth-laboratory {
          min-height: 90vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          padding: 2rem;
          background: #fbfbfb;
          overflow: hidden;
        }

        .auth-aura {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 800px;
          height: 800px;
          background: radial-gradient(circle, rgba(0,0,0,0.03) 0%, transparent 70%);
          pointer-events: none;
        }

        .auth-card-shield {
          width: 100%;
          max-width: 500px;
          z-index: 10;
        }

        .auth-card {
          padding: var(--space-xl);
          border: 1.5px solid var(--border-ink);
          box-shadow: 0 40px 80px rgba(0,0,0,0.04);
          background: rgba(255, 255, 255, 0.8) !important;
          backdrop-filter: blur(20px);
        }

        .auth-card-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .bureau-marker {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
          font-weight: 800;
          font-size: 0.7rem;
          letter-spacing: 2px;
          color: var(--text-muted);
          text-transform: uppercase;
        }

        .auth-title {
          font-size: 2.8rem;
          font-weight: 900;
          text-transform: uppercase;
          line-height: 1;
          margin-bottom: 1rem;
          color: var(--text-main);
          letter-spacing: -1px;
        }

        .serif-italic {
          font-family: var(--font-serif);
          font-style: italic;
          font-variation-settings: 'wght' 400;
          text-transform: lowercase;
          opacity: 0.6;
        }

        .auth-desc {
          font-family: var(--font-serif);
          font-style: italic;
          color: var(--text-muted);
          font-size: 1.05rem;
          max-width: 320px;
          margin: 0 auto;
          line-height: 1.4;
        }

        .auth-alert {
          background: #000;
          color: #fff;
          padding: 1rem;
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          text-align: center;
          margin-bottom: 2rem;
        }

        .auth-manifest {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .protocol-input {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .protocol-input label {
          font-size: 0.65rem;
          font-weight: 900;
          letter-spacing: 1.5px;
          color: var(--text-muted);
        }

        .field-group {
          position: relative;
          display: flex;
          align-items: center;
        }

        .field-icon {
          position: absolute;
          left: 0;
          opacity: 0.3;
        }

        .field-group input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1.5px solid #eee;
          padding: 0.8rem 0 0.8rem 2.5rem;
          font-size: 1.1rem;
          font-family: var(--font-serif);
          transition: all 0.3s ease;
        }

        .field-group input:focus {
          border-color: var(--border-ink);
          outline: none;
        }

        .manifest-options {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .text-btn {
          background: none;
          border: none;
          font-size: 0.75rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 1px;
          cursor: pointer;
          color: var(--text-main);
          padding: 0;
          transition: opacity 0.2s;
        }

        .text-btn.muted {
          opacity: 0.4;
        }

        .text-btn:hover {
          opacity: 1;
          text-decoration: underline;
        }

        .manifest-btn {
          height: 65px;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1.25rem;
          font-size: 1rem;
          font-weight: 800;
          margin-top: 1rem;
          letter-spacing: 1px;
        }

        .bureau-footer-note {
          margin-top: 4rem;
          text-align: center;
        }

        .line-sep {
          height: 1px;
          width: 40px;
          background: var(--border-ink);
          margin: 0 auto 1.5rem;
          opacity: 0.2;
        }

        .bureau-footer-note p {
          font-size: 0.6rem;
          font-weight: 800;
          letter-spacing: 1px;
          color: var(--text-muted);
          opacity: 0.5;
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }

        .animate-shake {
          animation: shake 0.4s ease-in-out 3;
        }

        .loading-dots:after {
          content: ' .';
          animation: dots 1.5s steps(5, end) infinite;
        }

        @keyframes dots {
          0%, 20% { content: ' .'; }
          40% { content: ' ..'; }
          60% { content: ' ...'; }
          80%, 100% { content: ' '; }
        }

        @media (max-width: 600px) {
          .auth-laboratory { padding: 1rem; }
          .auth-card { padding: 2rem 1.5rem; border: none; box-shadow: none; background: transparent !important; }
          .auth-title { font-size: 2.2rem; }
        }
      `}</style>
    </div>
  );
}
