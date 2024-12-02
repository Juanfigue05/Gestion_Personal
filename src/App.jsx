// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import EmployeeDashboard from './components/EmployeeDashboard';
import CandidateDashboard from './components/CandidateDashboard';
import Navigation from './components/Navigation';
import ProtectedRoute from './components/ProtectedRoute';
import CandidateApplication from './components/candidate/CandidateApplication';
import ApplicationStatus from './components/candidate/ApplicationStatus';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navigation />
          <div className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/apply" element={<CandidateApplication />} />
              <Route path="/application-status" element={<ApplicationStatus />} />
              <Route 
                path="/admin/*" 
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/employee/*"
                element={
                  <ProtectedRoute allowedRoles={['employee']}>
                    <EmployeeDashboard />
                  </ProtectedRoute>
                }/>
              <Route path="/candidate/*"
               element={
               <ProtectedRoute allowedRoles={['candidate']}>
               <CandidateDashboard />
               </ProtectedRoute>
               }/>
            </Routes>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;