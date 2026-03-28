import { useState, useEffect } from 'react';
import { Fingerprint, Zap, ShieldCheck } from 'lucide-react';

export function GlobalLoader() {
  const [active, setActive] = useState(false);
  const [status, setStatus] = useState('Synchronizing...');

  useEffect(() => {
    const startLoading = () => {
      setActive(true);
      // Change status text every 3 seconds for "cool" effect
      const statuses = [
        "Waking Bureau Core...",
        "Synchronizing Intelligence Layer...",
        "Verifying Operative Credentials...",
        "Calibrating Synthesis Nodes..."
      ];
      let i = 0;
      const interval = setInterval(() => {
        i = (i + 1) % statuses.length;
        setStatus(statuses[i]);
      }, 3000);
      return () => clearInterval(interval);
    };
    
    const stopLoading = () => setActive(false);

    window.addEventListener('bureau-loading:start', startLoading);
    window.addEventListener('bureau-loading:stop', stopLoading);

    return () => {
      window.removeEventListener('bureau-loading:start', startLoading);
      window.removeEventListener('bureau-loading:stop', stopLoading);
    };
  }, []);

  if (!active) return null;

  return (
    <div className="bureau-sync-overlay animate-fade-in">
      <div className="sync-content card glass">
        <div className="sync-visual">
          <div className="ring-outer"></div>
          <div className="ring-inner"></div>
          <div className="icon-core">
            <ShieldCheck size={40} className="glow-icon" />
          </div>
        </div>
        
        <h2 className="sync-title">Bureau <span className="serif-italic">Synchronization</span></h2>
        <p className="sync-status">{status}</p>
        
        <div className="sync-progress">
           <div className="sync-bar"></div>
        </div>
        
        <div className="sync-metadata">
           <div className="meta-item">
              <Zap size={14} />
              <span>PROTO: BGY-RENDER-01</span>
           </div>
           <p className="meta-note">Initializing secure gateway. High-authority verification in progress.</p>
        </div>
      </div>

      <style>{`
        .bureau-sync-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(15px);
          z-index: 10000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }

        .sync-content {
          max-width: 450px;
          width: 100%;
          padding: 3rem;
          text-align: center;
          background: rgba(255, 255, 255, 0.9) !important;
          border: 1.5px solid var(--border-ink);
          box-shadow: 0 50px 100px rgba(0,0,0,0.1);
        }

        .sync-visual {
          width: 120px;
          height: 120px;
          margin: 0 auto 3rem;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .ring-outer {
          position: absolute;
          width: 100%;
          height: 100%;
          border: 1px solid var(--border-ink);
          border-radius: 50%;
          border-top-color: transparent;
          animation: spin 3s linear infinite;
        }

        .ring-inner {
          position: absolute;
          width: 70%;
          height: 70%;
          border: 2px solid var(--accent-ink);
          border-radius: 50%;
          border-bottom-color: transparent;
          animation: spin 1.5s linear reverse infinite;
          opacity: 0.4;
        }

        .icon-core {
           color: var(--text-main);
           z-index: 2;
        }

        .sync-title {
          font-size: 1.8rem;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: -1px;
          margin-bottom: 0.75rem;
        }

        .serif-italic {
           font-family: var(--font-serif);
           font-style: italic;
           font-weight: 400;
           text-transform: lowercase;
           opacity: 0.6;
        }

        .sync-status {
          font-family: var(--font-serif);
          font-style: italic;
          color: var(--text-muted);
          margin-bottom: 2.5rem;
          font-size: 1.1rem;
        }

        .sync-progress {
          width: 100%;
          height: 4px;
          background: #f1f1f1;
          margin-bottom: 3rem;
          position: relative;
          overflow: hidden;
        }

        .sync-bar {
          position: absolute;
          top: 0;
          left: 0;
          width: 30%;
          height: 100%;
          background: #000;
          animation: slide 2s ease-in-out infinite;
        }

        .sync-metadata {
           border-top: 1px solid #eee;
           padding-top: 2rem;
        }

        .meta-item {
           display: flex;
           align-items: center;
           justify-content: center;
           gap: 0.75rem;
           margin-bottom: 0.75rem;
           font-size: 0.75rem;
           font-weight: 800;
           letter-spacing: 1.5px;
           color: var(--text-muted);
           text-transform: uppercase;
        }

        .meta-note {
           font-size: 0.7rem;
           color: var(--text-muted);
           opacity: 0.5;
           max-width: 250px;
           margin: 0 auto;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @keyframes slide {
          0% { left: -30%; }
          100% { left: 100%; }
        }

        @keyframes glow {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.1); opacity: 1; }
        }

        .glow-icon {
          animation: glow 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
