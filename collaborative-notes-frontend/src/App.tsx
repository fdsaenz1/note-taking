// src/App.tsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Dashboard from './pages/Dashboard';
import { useAuth } from './hooks/useAuth';
import ProtectedRoute from './components/ProtectedRoute';

const App: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
