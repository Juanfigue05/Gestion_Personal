// src/components/EmployeeDashboard.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Training from './employee/Training';
import PayrollInfo from './employee/PayrollInfo';
import Profile from './employee/Profile';

function EmployeeDashboard() {
  return (
    <div>
      <Routes>
        <Route index element={<Profile />} />
        <Route path="training" element={<Training />} />
        <Route path="payroll" element={<PayrollInfo />} />
      </Routes>
    </div>
  );
}

export default EmployeeDashboard;