import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Search, Calendar, FileText, ArrowRight, Trash2, AlertTriangle } from 'lucide-react';

export function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = () => {
    setLoading(true);
    axios.get('/api/blogs')
      .then(res => {
        setBlogs(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  const deleteBlog = (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (window.confirm("ARE YOU SURE YOU WANT TO PERMANENTLY DE-ARCHIVE THIS MANUSCRIPT?")) {
      axios.delete(`/api/blogs/${id}`)
        .then(() => {
          setBlogs(blogs.filter(b => b.id !== id));
        })
        .catch(err => {
          console.error(err);
          alert("Bureau Error: Failed to purge manuscript.");
        });
    }
  };

  const filteredBlogs = blogs.filter(blog => 
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="blogs-page container page-container animate-fade-in">
      <header className="archive-header-grid">
        <div className="archive-title-group">
          <h1>The <span className="gradient-text">Archive</span></h1>
          <p className="archive-subtitle">A collection of generated intelligence and authenticated manuscripts</p>
        </div>
        <div className="archive-search-group">
          <div className="search-container">
            <Search size={22} style={{ opacity: 0.5 }} />
            <input 
              type="text" 
              placeholder="Search Archives..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>
      </header>

      {loading ? (
        <div className="loading-state">
          <p>Retrieving archived documents from the bureau...</p>
        </div>
      ) : filteredBlogs.length === 0 ? (
        <div className="empty-state">
          <FileText size={64} className="icon-empty" />
          <h2>Archives Empty</h2>
          <p>No AI-generated manuscripts have been filed yet.</p>
          <Link to="/demo" className="btn btn-primary">Create First Manuscript</Link>
        </div>
      ) : (
        <div className="archive-grid">
          {filteredBlogs.map(blog => (
            <div key={blog.id} className="card blog-card animate-fade-in">
              <button 
                className="delete-btn" 
                onClick={(e) => deleteBlog(blog.id, e)}
                title="PURGE MANUSCRIPT"
              >
                <Trash2 size={18} />
              </button>

              <div className="blog-card-header">
                <span className="badge" style={{ backgroundColor: blog.status?.includes('Fallback') ? '#fff0f0' : 'transparent' }}>
                  {(blog.status || 'Draft').toUpperCase()}
                </span>
                <span className="seo-badge">SEO: {blog.seoScore || blog.metrics?.seoScore || 0}%</span>
              </div>
              
              <h3 className="blog-card-title">{blog.title}</h3>
              <p className="blog-card-excerpt">
                {blog.excerpt}
              </p>
              
              <div className="blog-card-footer">
                <div className="blog-meta">
                  <Calendar size={14} /> ID: #BGY-{blog.id}
                </div>
                <Link to={`/results/${blog.id}`} className="btn open-file-btn">
                  OPEN FILE <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      <style>{`
        .archive-title-group { flex: 1; min-width: 300px; }
        .archive-title-group h1 { font-size: var(--fs-h1); text-transform: uppercase; }
        .archive-subtitle { color: var(--text-muted); fontFamily: var(--font-serif); font-style: italic; }
        .archive-search-group { flex: 1; min-width: 300px; display: flex; justifyContent: flex-end; }
        
        .loading-state { text-align: center; padding: var(--space-xl); }
        .loading-state p { font-family: var(--font-serif); font-style: italic; fontSize: 1.4rem; }
        
        .empty-state { text-align: center; padding: var(--space-xl); border: 1.5px dashed var(--border-ink); }
        .icon-empty { marginBottom: 2rem; opacity: 0.2; display: block; margin-left: auto; margin-right: auto; }
        .empty-state h2 { fontSize: var(--fs-h2); marginBottom: 1rem; }
        .empty-state p { color: var(--text-muted); marginBottom: 3rem; fontSize: 1.2rem; }
        
        .blog-card { position: relative; }
        .delete-btn {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: transparent;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 50%;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
        }

        .delete-btn:hover {
          background: #fff0f0;
          color: #d32f2f;
          transform: scale(1.1);
        }

        .seo-badge { font-size: 0.8rem; fontWeight: 800; letter-spacing: 1px; }
        .blog-meta { display: flex; alignItems: center; gap: 0.5rem; color: var(--text-muted); fontSize: 0.75rem; fontWeight: 700; }
        .open-file-btn { padding: 0.5rem 1.2rem; fontSize: 0.8rem; gap: 0.4rem; }

        @media (max-width: 768px) {
           .archive-header-grid { text-align: center; justify-content: center; }
           .archive-search-group { justify-content: center; width: 100%; margin-top: 2rem; }
        }
      `}</style>
    </div>
  );
}
