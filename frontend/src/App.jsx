import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Blogs } from './pages/Blogs';
import { Audit } from './pages/Audit';
import { Demo } from './pages/Demo';
import { Pipeline } from './pages/Pipeline';
import { Pricing } from './pages/Pricing';
import { Results } from './pages/Results';
import { Auth } from './pages/Auth';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/audit" element={<Audit />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="/pipeline" element={<Pipeline />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/results/:id" element={<Results />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
