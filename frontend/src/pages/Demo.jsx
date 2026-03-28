import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Loader2, ArrowRight, Library, Cpu, PenTool, Database } from 'lucide-react';

export function Demo() {
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);
  const navigate = useNavigate();

  const loadingSteps = [
    { title: "Querying Global SERP", icon: <Database size={18} />, desc: "Analyzing search engine result pages for authority markers..." },
    { title: "Architecting Bureau Structure", icon: <Cpu size={18} />, desc: "Synthesizing an optimal information hierarchy..." },
    { title: "AI Manuscript Generation", icon: <PenTool size={18} />, desc: "Applying fine-tuned language models for maximum depth..." },
    { title: "Finalizing Metadata Bureau", icon: <Library size={18} />, desc: "Verifying SEO metrics and structural integrity..." }
  ];

  useEffect(() => {
    let interval;
    if (loading) {
      interval = setInterval(() => {
        setStep((prev) => (prev < loadingSteps.length - 1 ? prev + 1 : prev));
      }, 1500);
    } else {
      setStep(0);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const generateBlog = async () => {
    if (!keyword || keyword.trim().length < 3) {
      alert("Please provide a valid subject for the Bureau.");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post('/api/generate', { keyword });
      setTimeout(() => {
        navigate(`/results/${res.data.id}`);
      }, 6500); // 1.5s per 4 steps ≈ 6s total
    } catch (err) {
      console.error(err);
      setLoading(false);
      alert("The synthesis failed. Please check your API key.");
    }
  };

  return (
    <div className="demo-page container page-container animate-fade-in">
      <div className="demo-content-wrapper">
        <header className="demo-header-section">
          <div className="badge-wrapper">
             <span className="badge">Project Bureau v2.5</span>
          </div>
          <h1 className="demo-title">
             The <span className="text-outline">Laboratory</span> Bureau
          </h1>
          <p className="demo-subtitle">
             Transform simple keywords into high-authority digital manuscripts using our proprietary synthesis protocols.
          </p>
        </header>

        <main className="demo-main-area">
          <div className="glass-card demo-card">
            {loading ? (
              <div className="demo-processing-state animate-fade-in">
                <div className="loader-portal">
                   <div className="portal-ring"></div>
                   <Loader2 size={120} className="portal-icon spin-slow" strokeWidth={0.5} />
                   <Sparkles size={40} className="portal-sparkle pulse" />
                </div>
                
                <div className="step-indicator-list">
                  {loadingSteps.map((s, i) => (
                    <div key={i} className={`step-item ${i <= step ? 'active' : ''} ${i < step ? 'completed' : ''}`}>
                      <div className="step-icon-wrapper">
                        {i < step ? <CheckCircle size={16} /> : s.icon}
                      </div>
                      <div className="step-text">
                        <span className="step-title">{s.title}</span>
                        {i === step && <span className="step-desc animate-slide-up">{s.desc}</span>}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="progress-track">
                   <div className="progress-fill" style={{ width: `${(step + 1) * 25}%` }}></div>
                </div>
              </div>
            ) : (
              <div className="demo-input-hero animate-slide-up">
                <div className="input-field-group">
                  <div className="input-icon-left">
                    <Sparkles size={20} className="sparkle-icon" />
                  </div>
                  <input 
                    type="text" 
                    placeholder="ENTER SUBJECT OR PRIMARY KEYWORD..." 
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && generateBlog()}
                  />
                  <div className="input-indicator">READY</div>
                </div>
                
                <button className="btn btn-primary demo-btn" onClick={generateBlog}>
                  INITIATE PROTOCOL <ArrowRight size={20} />
                </button>
              </div>
            )}
          </div>

          {!loading && (
            <div className="protocol-showcase grid-3 animate-fade-in-up">
              <div className="protocol-card">
                 <Database size={32} />
                 <h3>Deep Indexing</h3>
                 <p>Scouring competitive landscapes for content gaps.</p>
              </div>
              <div className="protocol-card selected">
                 <Cpu size={32} />
                 <h3>AI Archetype</h3>
                 <p>Structuring authoritative hierarchy via neural design.</p>
              </div>
              <div className="protocol-card">
                 <Library size={32} />
                 <h3>SEO Bureau</h3>
                 <p>Optimizing for 10 distinct performance dimensions.</p>
              </div>
            </div>
          )}
        </main>
      </div>

      <style>{`
        .demo-page {
          min-height: 80vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .demo-content-wrapper {
          width: 100%;
          max-width: 1000px;
        }

        .demo-header-section {
          text-align: center;
          margin-bottom: var(--space-xl);
        }

        .badge-wrapper {
          margin-bottom: 1.5rem;
        }

        .demo-title {
          font-size: 5rem;
          font-weight: 900;
          letter-spacing: -2px;
          line-height: 0.9;
          text-transform: uppercase;
        }

        .text-outline {
          -webkit-text-stroke: 1.5px var(--accent-ink);
          color: transparent;
        }

        .demo-subtitle {
          font-size: 1.4rem;
          color: var(--text-muted);
          max-width: 700px;
          margin: 2rem auto 0;
          line-height: 1.5;
          font-family: var(--font-serif);
          font-style: italic;
        }

        .glass-card {
           background: rgba(255, 255, 255, 0.7);
           backdrop-filter: blur(20px);
           border: 1.5px solid var(--border-ink);
           padding: var(--space-xl);
           box-shadow: 0 40px 100px rgba(0,0,0,0.05);
           position: relative;
           overflow: hidden;
        }

        .loader-portal {
           position: relative;
           width: 200px;
           height: 200px;
           margin: 0 auto 3rem;
           display: flex;
           align-items: center;
           justify-content: center;
        }

        .portal-ring {
           position: absolute;
           width: 100%;
           height: 100%;
           border: 1px dashed var(--accent-ink);
           border-radius: 50%;
           animation: spin-slow 10s linear infinite;
        }

        .portal-icon {
           opacity: 0.8;
           color: var(--accent-ink);
        }

        .portal-sparkle {
           position: absolute;
           top: 20%;
           right: 20%;
           color: var(--accent-ink);
        }

        .step-indicator-list {
           display: flex;
           flex-direction: column;
           gap: 1.5rem;
           max-width: 500px;
           margin: 0 auto 3rem;
           text-align: left;
        }

        .step-item {
           display: flex;
           gap: 1.5rem;
           opacity: 0.3;
           transition: all 0.5s ease;
        }

        .step-item.active {
           opacity: 1;
           transform: translateX(10px);
        }

        .step-item.completed {
           opacity: 0.6;
           color: var(--accent-ink);
        }

        .step-icon-wrapper {
           width: 40px;
           height: 40px;
           display: flex;
           align-items: center;
           justify-content: center;
           border: 1px solid var(--border-ink);
           flex-shrink: 0;
        }

        .step-text {
           display: flex;
           flex-direction: column;
        }

        .step-title {
           font-weight: 900;
           text-transform: uppercase;
           letter-spacing: 1px;
           font-size: 0.9rem;
        }

        .step-desc {
           font-family: var(--font-serif);
           font-style: italic;
           color: var(--text-muted);
           font-size: 0.85rem;
           margin-top: 0.25rem;
        }

        .progress-track {
           width: 100%;
           height: 2px;
           background: #eee;
           position: absolute;
           bottom: 0;
           left: 0;
        }

        .progress-fill {
           height: 100%;
           background: var(--accent-ink);
           transition: width 1s ease;
        }

        .demo-input-hero {
           display: flex;
           flex-direction: column;
           gap: 2rem;
           align-items: center;
        }

        .input-field-group {
           width: 100%;
           position: relative;
           display: flex;
           align-items: center;
        }

        .input-field-group input {
           width: 100%;
           height: 80px;
           background: #fff;
           border: 1.5px solid var(--border-ink);
           padding: 0 10rem 0 4rem;
           font-size: 1.5rem;
           font-family: var(--font-serif);
           outline: none;
           transition: all 0.3s ease;
        }

        .input-field-group input:focus {
           border-color: var(--accent-ink);
           box-shadow: 0 0 0 10px rgba(0,0,0,0.02);
        }

        .input-icon-left {
           position: absolute;
           left: 1.5rem;
           color: var(--accent-ink);
        }

        .input-indicator {
           position: absolute;
           right: 1.5rem;
           font-weight: 900;
           font-size: 0.8rem;
           letter-spacing: 1px;
           border: 1px solid var(--border-ink);
           padding: 0.4rem 1rem;
           border-radius: 4px;
        }

        .demo-btn {
           padding: 1.5rem 4rem !important;
           font-size: 1rem !important;
        }

        .protocol-showcase {
           margin-top: 4rem;
           gap: 2rem;
        }

        .protocol-card {
           padding: 2rem;
           border: 1.5px solid #eee;
           transition: all 0.3s ease;
        }

        .protocol-card h3 {
           margin: 1.5rem 0 0.5rem;
           text-transform: uppercase;
           letter-spacing: 1px;
           font-size: 1rem;
        }

        .protocol-card p {
           color: var(--text-muted);
           font-size: 0.9rem;
        }

        .protocol-card:hover {
           border-color: var(--accent-ink);
           transform: translateY(-5px);
        }

        .protocol-card.selected {
           background: var(--bg-paper);
           border-color: var(--border-ink);
        }

        .spin-slow {
           animation: spin 8s linear infinite;
        }

        @keyframes spin {
           from { transform: rotate(0deg); }
           to { transform: rotate(360deg); }
        }

        .pulse {
           animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
           0% { transform: scale(1); opacity: 0.8; }
           50% { transform: scale(1.1); opacity: 1; }
           100% { transform: scale(1); opacity: 0.8; }
        }

        .animate-slide-up {
           animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes slideUp {
           from { opacity: 0; transform: translateY(20px); }
           to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 768px) {
           .demo-title { font-size: 3rem; }
           .input-field-group input { font-size: 1.1rem; padding-right: 2rem; }
           .input-indicator { display: none; }
        }
      `}</style>
    </div>
  );
}

function CheckCircle({ size }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="3" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}
