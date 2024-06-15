import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClientProvider } from 'react-query';
import AddThread from './pages/AddThreadPage';
import DetailPage from './pages/DetailPage';
import Homepage from './pages/Homepage';
import Login from './pages/LoginPage';
import NotFound from './components/NotFoundThread';
import Register from './pages/RegisterPage';
import Authentication from './components/Authentication';
import { queryClient } from './App';

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="add" element={<Authentication />} />(Component={AddThread})} />} />
          <Route path="thread/:id" element={<Authentication />} />(Component={DetailPage})} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}
