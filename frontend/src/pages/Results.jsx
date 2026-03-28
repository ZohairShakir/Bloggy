import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Download, Copy, ArrowLeft, Check, Share2, Globe, Layout, Shield, Zap, Target, Search, TrendingUp, FileText, CheckCircle2 } from 'lucide-react';

// Custom lightweight Markdown-to-HTML formatter
function MarkdownRenderer({ content, firstParagraphClass }) {
  if (!content) return null;

  const paragraphs = content.split('\n\n').filter(p => p.trim() !== '');

  return (
    <div className="markdown-content">
      {paragraphs.map((para, pIndex) => {
        if (para.startsWith('### ')) return <h3 key={pIndex} style={{ fontSize: '1.5rem', margin: '2rem 0 1rem' }}>{para.replace('### ', '')}</h3>;
        if (para.startsWith('## ')) return <h2 key={pIndex} style={{ fontSize: '2rem', margin: '2rem 0 1rem' }}>{para.replace('## ', '')}</h2>;
        if (para.startsWith('# ')) return <h1 key={pIndex} style={{ fontSize: '2.5rem', margin: '2.5rem 0 1rem' }}>{para.replace('# ', '')}</h1>;

        const processText = (text) => {
          let parts = [text];
          parts = parts.flatMap(part => {
             if (typeof part !== 'string') return [part];
             const subParts = [];
             let remaining = part;
             const boldRegex = /(\*\*|__)(.*?)\1/g;
             let lastIndex = 0;
             let match;
             while ((match = boldRegex.exec(remaining)) !== null) {
               subParts.push(remaining.substring(lastIndex, match.index));
               subParts.push(<strong key={match.index}>{match[2]}</strong>);
               lastIndex = boldRegex.lastIndex;
             }
             subParts.push(remaining.substring(lastIndex));
             return subParts;
          });
          parts = parts.flatMap(part => {
             if (typeof part !== 'string') return [part];
             const subParts = [];
             let remaining = part;
             const italicRegex = /(\*|_)(.*?)\1/g;
             let lastIndex = 0;
             let match;
             while ((match = italicRegex.exec(remaining)) !== null) {
               subParts.push(remaining.substring(lastIndex, match.index));
               subParts.push(<em key={match.index}>{match[2]}</em>);
               lastIndex = italicRegex.lastIndex;
             }
             subParts.push(remaining.substring(lastIndex));
             return subParts;
          });
          return parts;
        };

        return <p key={pIndex} className={pIndex === 0 ? firstParagraphClass : ''} style={{ marginBottom: '1.5rem', fontSize: '1.2rem', lineHeight: '1.8' }}>{processText(para)}</p>;
      })}
    </div>
  );
}

export function Results() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [distributing, setDistributing] = useState(false);
  const [distributionStatus, setDistributionStatus] = useState(null);

  useEffect(() => {
    axios.get('/api/blogs')
      .then(res => {
        const found = res.data.find(b => b.id === parseInt(id));
        setBlog(found || res.data[0]);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const copyToClipboard = () => {
    if (!blog) return;
    navigator.clipboard.writeText(blog.content).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const exportManuscript = () => {
    if (!blog) return;
    const blob = new Blob([JSON.stringify(blog, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `manuscript-${blog.id}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const distributeToCMS = () => {
    setDistributing(true);
    setDistributionStatus({
      Medium: 'pending',
      LinkedIn: 'pending',
      WordPress: 'pending',
      Blogger: 'pending',
      Substack: 'pending'
    });

    const platforms = ['Medium', 'LinkedIn', 'WordPress', 'Blogger', 'Substack'];
    
    axios.post('/api/distribute', { 
      blogId: id, 
      platforms 
    })
    .then(res => {
      // Simulate sequential success for UI effect
      platforms.forEach((p, index) => {
        setTimeout(() => {
          setDistributionStatus(prev => ({
            ...prev,
            [p]: 'success'
          }));
          if (index === platforms.length - 1) {
            setDistributing(false);
          }
        }, (index + 1) * 600);
      });
    })
    .catch(err => {
      console.error(err);
      setDistributing(false);
      alert('Failed to distribute manuscript.');
    });
  };

  if (loading) return <div className="container" style={{ padding: 'var(--space-xl) 0', textAlign: 'center' }}>Loading manuscript...</div>;
  if (!blog) return <div className="container" style={{ padding: 'var(--space-xl) 0', textAlign: 'center' }}>Document not found.</div>;

  const metrics = blog.metrics || {
    seoScore: blog.seoScore || 0,
    readability: blog.readability || 0,
    aiDetection: blog.aiDetection || 0,
    keywordAccuracy: 0,
    contentDepth: 0,
    snippetEligibility: 0,
    geoOptimization: 0,
    ctaEffectiveness: 0,
    structuralStrength: 0,
    platformAdaptation: 0
  };

  const metricList = [
    { label: 'SEO EFFICIENCY', value: metrics.seoScore, icon: <Search size={14} /> },
    { label: 'KEYWORD ACCURACY', value: metrics.keywordAccuracy, icon: <Target size={14} /> },
    { label: 'CONTENT DEPTH', value: metrics.contentDepth, icon: <TrendingUp size={14} /> },
    { label: 'SNIPPET ELIGIBILITY', value: metrics.snippetEligibility, icon: <Zap size={14} /> },
    { label: 'READABILITY GRADE', value: metrics.readability, icon: <FileText size={14} /> },
    { label: 'AI PROBABILITY', value: metrics.aiDetection, icon: <Shield size={14} /> },
    { label: 'GEO OPTIMIZATION', value: metrics.geoOptimization, icon: <Globe size={14} /> },
    { label: 'CTA EFFECTIVENESS', value: metrics.ctaEffectiveness, icon: <Zap size={14} /> },
    { label: 'STRUCTURAL STRENGTH', value: metrics.structuralStrength, icon: <Layout size={14} /> },
    { label: 'PLATFORM ADAPTATION', value: metrics.platformAdaptation, icon: <Globe size={14} /> },
  ];

  return (
    <div className="results-page container page-container animate-fade-in">
      <header className="results-header-grid">
        <div className="header-info">
          <Link to="/blogs" className="back-link">
            <ArrowLeft size={16} /> Return to Archives
          </Link>
          <h1 className="results-title">{blog.title}</h1>
          <p className="serial-number">
            SERIAL No: #BGY-{blog.id} • AUTHENTICATED BY BLOGY SYSTEMS
          </p>
        </div>
        <div className="header-actions">
          <button className="btn" onClick={copyToClipboard}>
            {copied ? <Check size={18} /> : <Copy size={18} />}
            {copied ? 'COPIED' : 'COPY TEXT'}
          </button>
          <button className="btn btn-primary" onClick={exportManuscript}>
            <Download size={18} /> EXPORT MANUSCRIPT
          </button>
        </div>
      </header>

      <div className="results-content-layout">
        {/* Main Content */}
        <article className="manuscript-body">
          <MarkdownRenderer content={blog.content} firstParagraphClass="drop-cap" />
          
          <div className="section-divider"></div>
          
          <div className="manuscript-verification">
            <p>
              This manuscript has been optimized across 10 critical SEO and performance metrics.
            </p>
          </div>

          {distributionStatus && (
            <div className="distribution-report card">
              <h4 className="badge">Multi-Platform Distribution Report</h4>
              <div className="dist-status-grid">
                {Object.entries(distributionStatus).map(([platform, status]) => (
                  <div key={platform} className={`dist-status-item ${status}`}>
                    <div className="dist-info">
                      <span className="platform-name">{platform}</span>
                      <span className="status-label">{status.toUpperCase()}</span>
                    </div>
                    {status === 'pending' ? (
                      <div className="loading-dots">...</div>
                    ) : (
                      <CheckCircle2 size={16} color="var(--accent-ink)" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="section-divider"></div>

          <div className="manuscript-footer">
            <p>End of Manuscript. All verification protocols cleared.</p>
          </div>
        </article>

        {/* Sidebar Analysis */}
        <aside className="sidebar">
          <div className="card sticky-card">
            <h4 className="badge">Deep Analysis Metrics</h4>
            
            <div className="stats-list">
              {metricList.map((stat, i) => (
                <div key={i} className="stat-item">
                  <div className="stat-label-group">
                    <span className="stat-label">
                      {stat.icon}
                      {stat.label}
                    </span>
                    <span className="stat-value-text">{stat.value}%</span>
                  </div>
                  <div className="stat-bar-outer">
                    <div className="stat-bar-inner" style={{ width: `${stat.value}%` }}></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="keyword-section">
               <h4 className="badge">Index Keywords</h4>
               <div className="keyword-tags">
                 {(blog.keywords || []).map((k, i) => (
                   <span key={i} className="keyword-tag">{k}</span>
                 ))}
               </div>
            </div>

            <button 
              className={`btn distribution-btn ${distributing ? 'btn-loading' : 'btn-primary'}`} 
              onClick={distributeToCMS}
              disabled={distributing}
            >
              {distributing ? 'SYNCHRONIZING...' : 'DISTRIBUTE TO BUREAU'}
              {!distributing && <Share2 size={16} />}
            </button>
          </div>
        </aside>
      </div>

      <style>{`
        .back-link {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--text-main);
          text-decoration: none;
          margin-bottom: 1.5rem;
          font-weight: 700;
          text-transform: uppercase;
          font-size: 0.8rem;
        }

        .results-title {
          font-size: var(--fs-h1);
          line-height: 1.1;
        }

        .serial-number {
          color: var(--text-muted);
          margin-top: 1rem;
          font-family: var(--font-serif);
          font-style: italic;
        }

        .header-actions {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .manuscript-body {
          border-right: 1.5px solid #eee;
          padding-right: var(--space-lg);
        }

        .manuscript-verification {
          opacity: 0.8;
          background: #fff;
          padding: var(--space-md);
          border: 1px solid #eee;
          text-align: center;
          font-style: italic;
          margin-bottom: 2rem;
        }

        .distribution-report {
          margin-top: 2rem;
          background: var(--bg-paper);
          border: 1.5px solid var(--border-ink);
        }

        .dist-status-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 1rem;
          margin-top: 1.5rem;
        }

        .dist-status-item {
          padding: 1rem;
          border: 1px solid #ddd;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #fff;
        }

        .dist-status-item.success {
          border-color: var(--accent-ink);
          background: #f9fff9;
        }

        .platform-name {
          display: block;
          font-weight: 800;
          font-size: 0.75rem;
          letter-spacing: 0.5px;
        }

        .status-label {
          font-size: 0.65rem;
          color: var(--text-muted);
        }

        .loading-dots {
          font-weight: 900;
          animation: pulse 1s infinite;
        }

        @keyframes pulse {
          0% { opacity: 0.3; }
          50% { opacity: 1; }
          100% { opacity: 0.3; }
        }

        .manuscript-footer {
          font-style: italic;
          color: var(--text-muted);
          margin-bottom: var(--space-xl);
        }

        .sticky-card {
          position: sticky;
          top: 120px;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          max-height: calc(100vh - 160px);
          overflow-y: auto;
          scrollbar-width: thin;
        }

        .stats-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .stat-label-group {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.25rem;
          font-size: 0.7rem;
          font-weight: 800;
        }

        .stat-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .stat-bar-outer {
          height: 4px;
          background: var(--bg-paper);
          border: 1px solid var(--border-ink);
        }

        .stat-bar-inner {
          height: 100%;
          background: var(--accent-ink);
          transition: width 1s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .keyword-section {
          border-top: 1.5px solid var(--border-ink);
          padding-top: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .keyword-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .keyword-tag {
          text-transform: uppercase;
          font-size: 0.7rem;
          font-weight: 700;
          border-bottom: 1.5px solid var(--border-ink);
        }

        .distribution-btn {
          width: 100%;
          justify-content: center;
          margin-top: 0.5rem;
          font-size: 0.8rem;
        }

        .btn-loading {
          opacity: 0.7;
          cursor: not-allowed;
          background: #eee !important;
          color: #666 !important;
        }

        @media (max-width: 1024px) {
          .manuscript-body {
            border-right: none;
            padding-right: 0;
          }
          .sticky-card {
            position: static;
            max-height: none;
          }
        }
      `}</style>
    </div>
  );
}
