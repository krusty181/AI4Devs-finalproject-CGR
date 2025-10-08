import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Components  
import ErrorBoundary from './components/Common/ErrorBoundary.tsx';

// Pages
import HomePage from './pages/HomePage.tsx';
import AvailabilityPage from './pages/AvailabilityPage.tsx';
import AccommodationDetailPage from './pages/AccommodationDetailPage.tsx';
import ContactPage from './pages/ContactPage.tsx';
import NotFoundPage from './pages/NotFoundPage.tsx';

// Styles
import './styles/shared.css';

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <div className="app">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/availability" element={<AvailabilityPage />} />
          <Route path="/accommodation/:id" element={<AccommodationDetailPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </ErrorBoundary>
  )
}

export default App