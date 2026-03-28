import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Pricing() {
  const user = localStorage.getItem('bloggy_user');
  const nextStep = user ? '/demo' : '/auth';
  
  const plans = [
    {
      name: 'Starter Edition',
      price: '1,999',
      symbol: '₹',
      period: '/mo',
      subtext: 'Free Trial Active',
      description: 'Ideal for early-stage startups and individual operatives.',
      features: [
        '15 SEO Manuscripts / mo',
        'Standard Bureau Support',
        'Auto-distribution Protocols',
        'Core Keyword Optimization'
      ],
      highlight: false,
      btn: 'Select Plan'
    },
    {
      name: 'Builder Bureau',
      price: '4,999',
      symbol: '₹',
      period: '/mo',
      badge: 'RECOMMENDED',
      description: 'The preferred choice for professional digital publishers.',
      features: [
        '50 SEO Manuscripts / mo',
        'Advanced Intelligence Audit',
        'Everything in Starter',
        'Priority Dispatch Queue',
        'Performance Analytics'
      ],
      highlight: true,
      btn: 'Select Plan'
    },
    {
      name: 'Scale Archive',
      price: 'Custom',
      symbol: '',
      period: '',
      description: 'Enterprise-grade synthesis for global agencies and teams.',
      features: [
        'Unlimited Manuscripts',
        'Multi-Agent Support',
        'Custom Rule Engine Tuning',
        'Dedicated Onboarding',
        'Global API Access',
        'Priority SLA Support'
      ],
      highlight: false,
      btn: 'Contact Bureau'
    }
  ];

  return (
    <div className="pricing-bureau animate-fade-in">
      <div className="container">
        <header className="pricing-header">
          <div className="badge bureau-badge">ACCESS LEVELS 2026</div>
          <h1 className="pricing-title">Bureau <span className="serif-italic">Subscription</span></h1>
          <p className="pricing-subtitle">Select your authorization tier for high-end synthesis.</p>
        </header>

        <div className="plans-grid">
          {plans.map((plan, i) => (
            <div key={i} className={`card pricing-card ${plan.highlight ? 'featured' : ''}`}>
              {plan.badge && <div className="popular-tag">{plan.badge}</div>}
              
              <div className="card-inner">
                <h3 className="plan-title">{plan.name}</h3>
                
                <div className="price-display">
                  <span className="symbol">{plan.symbol}</span>
                  <span className="value">{plan.price}</span>
                  <span className="period">{plan.period}</span>
                </div>
                
                {plan.subtext && <p className="plan-alert">{plan.subtext}</p>}
                <p className="plan-meta">{plan.description}</p>
                
                <div className="line-divider"></div>

                <ul className="features-stack">
                  {plan.features.map((f, j) => (
                    <li key={j} className="feature-item">
                      <Check size={14} className="check-icon" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <Link 
                  to={plan.btn === 'Contact Bureau' ? 'mailto:bureau@bloggy.ai' : nextStep} 
                  className={`btn bureau-btn ${plan.highlight ? 'btn-primary' : 'btn-outline'}`}
                >
                  {plan.btn.toUpperCase()}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .pricing-bureau {
          padding: 8rem 0;
          background-color: #fdfdfd;
          min-height: 100vh;
        }

        .pricing-header {
          text-align: center;
          margin-bottom: 6rem;
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

        .pricing-title {
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

        .pricing-subtitle {
          font-family: var(--font-serif);
          font-style: italic;
          font-size: 1.2rem;
          color: var(--text-muted);
        }

        .plans-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 2.5rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .pricing-card {
          padding: 3rem 2.5rem;
          border-radius: 0;
          border: 1.5px solid var(--border-ink);
          background: #fff;
          position: relative;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .pricing-card.featured {
          background: #fbfbfb;
          border-width: 2.5px;
          box-shadow: 0 40px 80px rgba(0,0,0,0.06);
        }

        .pricing-card:hover {
          transform: translateY(-8px);
        }

        .popular-tag {
          position: absolute;
          top: -12px;
          left: 50%;
          transform: translateX(-50%);
          background: #000;
          color: #fff;
          font-size: 0.6rem;
          font-weight: 900;
          padding: 0.4rem 1rem;
          letter-spacing: 1.5px;
          z-index: 10;
        }

        .plan-title {
          font-size: 1.5rem;
          font-weight: 900;
          text-transform: uppercase;
          margin-bottom: 2rem;
          color: var(--text-main);
          letter-spacing: -0.5px;
        }

        .price-display {
          display: flex;
          align-items: baseline;
          margin-bottom: 0.5rem;
        }

        .symbol { font-size: 1.5rem; font-weight: 800; opacity: 0.4; }
        .value { font-size: 3.5rem; font-weight: 900; line-height: 1; }
        .period { font-size: 1rem; font-weight: 800; color: var(--text-muted); margin-left: 0.2rem; }

        .plan-alert {
          font-size: 0.75rem;
          font-weight: 900;
          color: var(--accent-ink);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 1.5rem;
        }

        .plan-meta {
          font-family: var(--font-serif);
          font-style: italic;
          color: var(--text-muted);
          font-size: 1.05rem;
          line-height: 1.4;
          margin-bottom: 2.5rem;
          min-height: 3rem;
        }

        .line-divider {
          height: 1.5px;
          background: var(--border-ink);
          width: 50px;
          opacity: 0.1;
          margin-bottom: 2.5rem;
        }

        .features-stack {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
          margin-bottom: 4rem;
          flex: 1;
        }

        .feature-item {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--text-main);
          line-height: 1.4;
        }

        .check-icon {
          color: var(--text-muted);
          margin-top: 2px;
          flex-shrink: 0;
        }

        .bureau-btn {
          width: 100%;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 900;
          letter-spacing: 2px;
          font-size: 0.85rem;
          border-radius: 0;
        }

        @media (max-width: 992px) {
          .pricing-bureau { padding: 4rem 0; }
          .pricing-title { font-size: 3rem; }
        }

        @media (max-width: 480px) {
          .pricing-card { padding: 2.5rem 1.5rem; }
          .value { font-size: 2.8rem; }
        }
      `}</style>
    </div>
  );
}
