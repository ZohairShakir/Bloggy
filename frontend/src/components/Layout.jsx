import { Navbar } from './Navbar';
import { Footer } from './Footer';

export function Layout({ children }) {
  return (
    <div className="app-layout">
      <Navbar />
      <main>
        {children}
      </main>
      <Footer />
    </div>
  );
}
