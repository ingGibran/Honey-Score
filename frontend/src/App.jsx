import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import Hero from './components/Hero';
import Featured from './components/Featured';

import MoviesPage from './components/MoviesPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <Featured />
              </>
            } />
            <Route path="/movies" element={<MoviesPage />} />
            <Route path="/featured" element={<Featured />} />
            {/* Add more routes as needed */}
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;
