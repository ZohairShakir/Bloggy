import { useState } from 'react';
import axios from 'axios';
import { AlertCircle, CheckCircle2, ArrowRight, Target, Search, TrendingUp, Zap, Shield, Globe, Layout, FileText, Activity } from 'lucide-react';

export function Audit() {
  const [content, setContent] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const runAudit = async () => {
    if (!content || content.trim().length < 20) {
      alert("Please provide at least 20 characters of content for the Bureau to analyze.");
      return;
    }
    
    setLoading(true);
    setResults(null);
    setError(null);
    
    try {
      const res = await axios.post('/api/audit', { content });
      setResults(res.data);
    } catch (err) {
      console.error(err);
      setError("Bureau Connection Interrupted: Failed to verify manuscript integrity.");
    } finally {
      setLoading(false);
    }
  };

  const metricConfig = [
    { key: 'seoScore', label: 'SEO Efficiency', icon: <Search size={20} /> },
    { key: 'keywordAccuracy', label: 'Keyword Accuracy', icon: <Target size={20} /> },
    { key: 'contentDepth', label: 'Content Depth', icon: <TrendingUp size={20} /> },
    { key: 'snippetEligibility', label: 'Snippet Eligibility', icon: <Zap size={20} /> },
    { key: 'readability', label: 'Readability Grade', icon: <FileText size={20} /> },
    { key: 'aiDetection', label: 'AI Probability', icon: <Shield size={20} /> },
    { key: 'geoOptimization', label: 'GEO Readiness', icon: <Globe size={20} /> },
    { key: 'ctaEffectiveness', label: 'CTA Effectiveness', icon: <Activity size={20} /> },
    { key: 'structuralStrength', label: 'Structural Strength', icon: <Layout size={20} /> },
    { key: 'platformAdaptation', label: 'Platform Adaptation', icon: <Globe size={20} /> },
  ];

  return (
    <div className="audit-laboratory animate-fade-in">
      <div className="container">
        <header className="audit-header">
           <div className="badge bureau-badge">SECURITY LEVEL 04</div>
           <h1 className="audit-title">Audit <span className="serif-italic">Bureau</span></h1>
           <p className="audit-subtitle">Scientific inquiry into manuscript authority and SEO integrity.</p>
        </header>

        <div className="audit-terminal-section">
          <div className="audit-terminal glass">
            <div className="terminal-header">
               <span className="dot"></span>
               <span className="terminal-label">MANUSCRIPT INPUT TERMINAL</span>
            </div>
            <textarea 
              placeholder="Paste your content here for a 10-dimensional analysis..." 
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="terminal-input"
            />
            <div className="terminal-footer">
               <div className="char-count">{content.length} characters detected</div>
               <button className="btn btn-primary audit-btn" onClick={runAudit} disabled={loading}>
                 {loading ? 'ANALYZING...' : 'EXECUTE VERIFICATION'}
                 {!loading && <ArrowRight size={18} />}
               </button>
            </div>
          </div>
          {error && <div className="audit-error-bar animate-shake">{error}</div>}
        </div>

        {loading && (
          <div className="audit-protocol-loader animate-fade-in">
             <div className="loader-ring"></div>
             <h3>SYNTHESIZING REPORT</h3>
             <p>Our AI agents are verifying 10 critical dimensions of authority...</p>
          </div>
        )}

        {results && results.metrics && (
          <div className="audit-report animate-slide-up">
            <div className="results-grid">
              {metricConfig.map((m) => (
                <div key={m.key} className="metric-box">
                  <div className="metric-top">
                     <div className="metric-icon">{m.icon}</div>
                     <span className="metric-label">{m.label.toUpperCase()}</span>
                  </div>
                  <div className="metric-score-row">
                     <span className="score-num">{results.metrics[m.key]}</span>
                     <span className="score-pct">%</span>
                  </div>
                  <div className="mini-progress">
                    <div className="mini-bar" style={{ width: `${results.metrics[m.key]}%` }}></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="audit-feedback-grid">
               <div className="feedback-column card">
                  <h3 className="feedback-title concerns">
                    <AlertCircle size={22} /> IDENTIFIED CONCERNS
                  </h3>
                  <div className="feedback-list">
                    {(results.issues || []).map((issue, i) => (
                      <div key={i} className="feedback-item">
                        {issue}
                      </div>
                    ))}
                  </div>
               </div>
               
               <div className="feedback-column card">
                  <h3 className="feedback-title directives">
                    <CheckCircle2 size={22} /> STRATEGIC DIRECTIVES
                  </h3>
                  <div className="feedback-list">
                    {(results.suggestions || []).map((sug, i) => (
                      <div key={i} className="feedback-item suggestion">
                        "{sug}"
                      </div>
                    ))}
                  </div>
               </div>
            </div>

            <div className="audit-report-footer">
               <div className="archival-stamp">
                  <p>REPORT #BGY-AUD-{Math.floor(Math.random() * 10000)}</p>
                  <p>VERIFIED BY BLOGGY AI BUREAU CORE</p>
               </div>
               <button className="btn btn-outline" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                  NEW INQUIRY
               </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .audit-laboratory {
          padding-bottom: 8rem;
          background: #fdfdfd;
          min-height: 100vh;
        }

        .audit-header {
          text-align: center;
          margin-bottom: 5rem;
          padding-top: 5rem;
        }

        .bureau-badge {
          display: inline-block;
          margin-bottom: 1.5rem;
          background: #000;
          color: #fff;
          font-weight: 900;
          letter-spacing: 2px;
          padding: 0.4rem 1.2rem;
          font-size: 0.65rem;
        }

        .audit-title {
          font-size: clamp(2.5rem, 8vw, 4.5rem);
          font-weight: 900;
          text-transform: uppercase;
          line-height: 0.9;
          margin-bottom: 1.5rem;
        }

        .serif-italic {
          font-family: var(--font-serif);
          font-style: italic;
          font-weight: 400;
          text-transform: lowercase;
          opacity: 0.5;
        }

        .audit-subtitle {
          font-family: var(--font-serif);
          font-style: italic;
          font-size: 1.2rem;
          color: var(--text-muted);
        }

        .audit-terminal-section {
          max-width: 900px;
          margin: 0 auto 5rem;
        }

        .audit-terminal {
          background: #fff;
          border: 1.5px solid var(--border-ink);
          padding: 2rem;
          transition: all 0.3s ease;
        }

        .terminal-header {
           display: flex;
           align-items: center;
           gap: 1rem;
           margin-bottom: 1.5rem;
           padding-bottom: 1rem;
           border-bottom: 1px solid #eee;
        }

        .terminal-header .dot {
           width: 8px;
           height: 8px;
           background: var(--accent-ink);
           border-radius: 50%;
        }

        .terminal-label {
           font-size: 0.7rem;
           font-weight: 900;
           letter-spacing: 1px;
           color: var(--text-muted);
        }

        .terminal-input {
          width: 100%;
          min-height: 250px;
          border: none;
          background: transparent;
          font-size: 1.15rem;
          font-family: var(--font-serif);
          line-height: 1.6;
          outline: none;
          resize: vertical;
          color: var(--text-main);
          margin-bottom: 2rem;
        }

        .terminal-footer {
           display: flex;
           justify-content: space-between;
           align-items: center;
           border-top: 1px solid #eee;
           padding-top: 1.5rem;
        }

        .char-count {
           font-size: 0.75rem;
           font-weight: 600;
           color: var(--text-muted);
           text-transform: uppercase;
        }

        .audit-btn {
           padding: 1.2rem 3rem;
           border-radius: 0;
           font-weight: 900;
           letter-spacing: 1px;
        }

        .audit-error-bar {
           margin-top: 1rem;
           background: #000;
           color: #fff;
           padding: 1rem;
           font-size: 0.8rem;
           font-weight: 800;
           text-align: center;
           text-transform: uppercase;
        }

        .audit-protocol-loader {
           text-align: center;
           margin: 5rem 0;
           color: var(--text-muted);
        }

        .loader-ring {
           width: 40px;
           height: 40px;
           border: 2px solid #eee;
           border-top-color: #000;
           border-radius: 50%;
           margin: 0 auto 2rem;
           animation: spin 1s linear infinite;
        }

        @keyframes spin {
           to { transform: rotate(360deg); }
        }

        .audit-report {
           max-width: 1200px;
           margin: 0 auto;
        }

        .results-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
          margin-bottom: 5rem;
        }

        .metric-box {
           background: #fff;
           border: 1px solid #eee;
           padding: 2rem;
           transition: all 0.3s ease;
        }

        .metric-box:hover {
           border-color: var(--border-ink);
           transform: translateY(-5px);
        }

        .metric-top {
           display: flex;
           align-items: center;
           gap: 0.75rem;
           margin-bottom: 1.5rem;
        }

        .metric-icon { color: var(--text-muted); }
        .metric-label { font-size: 0.65rem; font-weight: 900; letter-spacing: 1px; }

        .metric-score-row {
           display: flex;
           align-items: baseline;
           margin-bottom: 1.5rem;
        }

        .score-num { font-size: 2.8rem; font-weight: 900; }
        .score-pct { font-size: 1.2rem; font-weight: 800; opacity: 0.4; }

        .mini-progress {
           width: 100%;
           height: 3px;
           background: #eee;
        }

        .mini-bar {
           height: 100%;
           background: #000;
        }

        .audit-feedback-grid {
           display: grid;
           grid-template-columns: 1fr 1fr;
           gap: 2rem;
           margin-bottom: 5rem;
        }

        .feedback-column {
           padding: 3rem;
           border-radius: 0;
           transition: all 0.3s ease;
        }

        .feedback-column:hover {
           box-shadow: 0 40px 80px rgba(0,0,0,0.05);
        }

        .feedback-title {
           display: flex;
           align-items: center;
           gap: 1rem;
           font-size: 1.2rem;
           font-weight: 900;
           margin-bottom: 2.5rem;
           text-transform: uppercase;
           letter-spacing: 1px;
        }

        .concerns { color: #d32f2f; }
        .directives { color: var(--accent-ink); }

        .feedback-list {
           display: flex;
           flex-direction: column;
           gap: 1.5rem;
        }

        .feedback-item {
           font-size: 1.05rem;
           line-height: 1.5;
           padding-left: 1.5rem;
           border-left: 1.5px solid #eee;
           font-weight: 500;
        }

        .feedback-item.suggestion {
           font-family: var(--font-serif);
           font-style: italic;
           color: var(--text-muted);
        }

        .audit-report-footer {
           display: flex;
           justify-content: space-between;
           align-items: center;
           border-top: 1.5px solid var(--border-ink);
           padding-top: 3rem;
           margin-top: 2rem;
        }

        .archival-stamp p {
           font-size: 0.7rem;
           font-weight: 900;
           letter-spacing: 1.5px;
           color: var(--text-muted);
           margin: 0;
           opacity: 0.5;
        }

        @media (max-width: 900px) {
           .audit-feedback-grid { grid-template-columns: 1fr; }
           .audit-title { font-size: 3rem; }
           .metric-box { padding: 1.5rem; }
        }
      `}</style>
    </div>
  );
}
