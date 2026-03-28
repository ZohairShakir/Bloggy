import { Layers, Database, FileText, Wand2, BarChart } from 'lucide-react';

export function Pipeline() {
  const steps = [
    { title: 'SERP Intelligence', desc: 'Real-time analysis of Top 10 Google results for your keyword.', icon: <Database size={20} /> },
    { title: 'Gap Analysis', desc: 'Identify what competitors missed to create unique content.', icon: <Layers size={20} /> },
    { title: 'SEO Structuring', desc: 'Automatic H1, H2, H3 generation based on ranking factors.', icon: <BarChart size={20} /> },
    { title: 'AI Generation', desc: 'Gemini-powered writing with industry-specific context.', icon: <Wand2 size={20} /> },
    { title: 'Readability Polish', desc: 'Final audit for human-like flow and SEO score optimization.', icon: <FileText size={20} /> },
  ];

  return (
    <div className="pipeline-page container page-container animate-fade-in">
      <header className="section-header-centered">
        <h1 className="pipeline-title">The <span className="gradient-text">Assembly Line</span></h1>
        <p className="pipeline-subtitle">A rigorous protocol for document synthesis</p>
      </header>

      <div className="pipeline-assembly">
        {/* Connection Line */}
        <div className="pipeline-line"></div>

        {steps.map((step, i) => (
          <div key={i} className="pipeline-step animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
             <div className="step-number">
              {i + 1}
            </div>
            <div className="step-content">
              <h3>
                {step.icon} {step.title}
              </h3>
              <p>{step.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="pipeline-actions">
        <button className="btn btn-primary">COMMENCE NEW PIPELINE</button>
      </div>

      <style>{`
        .pipeline-title {
          font-size: clamp(2.5rem, 8vw, 4rem);
          text-transform: uppercase;
        }

        .pipeline-subtitle {
          color: var(--text-muted);
          font-size: 1.2rem;
          font-family: var(--font-serif);
          font-style: italic;
          margin-top: 1rem;
        }

        .step-content h3 {
          font-size: 1.5rem;
          margin-bottom: 0.8rem;
          display: flex;
          align-items: center;
          gap: 0.8rem;
        }

        .step-content p {
          color: var(--text-muted);
          line-height: 1.6;
        }

        .pipeline-actions {
          text-align: center;
          margin-top: 6rem;
        }

        .pipeline-actions .btn {
          padding: 1.25rem 4rem;
        }
      `}</style>
    </div>

  );
}
