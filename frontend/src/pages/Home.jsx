import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Target, BarChart3, Globe, Shield, Sparkles } from 'lucide-react';

export function Home() {
  const user = localStorage.getItem('bloggy_user');
  const nextStep = user ? '/demo' : '/auth';

  return (
    <div className="home-page animate-fade-in">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-container flex-stack-mobile">
          <div className="hero-content">
            <div className="badge hero-badge">EDITION 2026 • AI BUREAU</div>
            <h1 className="hero-title">The Future of <span className="gradient-text">Manuscript</span> Authority.</h1>
            <p className="hero-description">
              Transforming raw data into authoritative SEO manuscripts. Professional-grade AI generation for the modern digital era.
            </p>
            <div className="hero-actions">
              <Link to={nextStep} className="btn btn-primary">
                GENERATE MANUSCRIPT <ArrowRight size={20} />
              </Link>
              <Link to="/audit" className="btn">LEGAL AUDIT</Link>
            </div>
          </div>
          <div className="hero-image-wrapper">
             <div className="hero-card card">
                <div className="card-header">
                   <span className="badge">Draft #001</span>
                   <h3>The Intelligence Era</h3>
                </div>
                <div className="card-placeholder">
                   <div className="line line-90"></div>
                   <div className="line line-100"></div>
                   <div className="line line-85"></div>
                   <div className="line line-95"></div>
                   <div className="sparkle-box">
                      <Sparkles size={48} className="icon-subtle" />
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="trust-bar">
        <div className="container trust-container">
          <span className="trust-logo">TIMES BUREAU</span>
          <span className="trust-logo">DIGITAL GAZETTE</span>
          <span className="trust-logo">SEO WORLD</span>
          <span className="trust-logo">DATA POST</span>
        </div>
      </section>

      {/* Features Grid */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
             <h2>Bureau Capabilities</h2>
             <p className="section-subtitle">Precision tools for the high-end digital publisher</p>
          </div>
          
          <div className="grid-stack-mobile features-grid">
            {[
              { icon: <Zap />, title: "Instant Generation", desc: "Produce 3000+ word manuscripts in seconds with full SEO optimization." },
              { icon: <Target />, title: "SEO Precision", desc: "Target high-intent keywords with surgical accuracy using Gemini Pro." },
              { icon: <BarChart3 />, title: "Live Analytics", desc: "Real-time auditing of readability, density, and archival quality." },
              { icon: <Globe />, title: "Global Reach", desc: "Optimized for distribution across all major CMS and archival bureaus." },
              { icon: <Shield />, title: "Audit Ready", desc: "Every document passes through a rigorous AI verification protocol." },
              { icon: <Sparkles />, title: "Analog Notion UI", desc: "A premium interface designed for focus, clarity, and authority." }
            ].map((f, i) => (
              <div key={i} className="card feature-card">
                <div className="feature-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container cta-container">
          <h2 className="cta-title">Ready to Publish?</h2>
          <p className="cta-description">
            Join the elite circle of digital publishers using Blogy AI to dominate the rankings.
          </p>
          <Link to={nextStep} className="btn btn-white">
            START YOUR MANUSCRIPT
          </Link>
        </div>
      </section>
    </div>
  );
}
