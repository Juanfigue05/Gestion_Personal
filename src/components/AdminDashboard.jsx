// src/components/AdminDashboard.jsx
import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import AdminDashboardHome from './admin/AdminDashboardHome';
import EmployeeManagement from './admin/EmployeeManagement';
import RecruitmentProgress from './admin/RecruitmentProgress';
import PayrollReports from './admin/PayrollReports';
import RecruitmentSchedule from './admin/RecruitmentSchedule';

function AdminDashboard() {
  const location = useLocation();

  return (
    <div>
      {/* Navegación secundaria */}
      <div className="bg-gray-100 border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-8">
            <Link
              to="/admin"
              className={`py-4 px-3 border-b-2 ${
                location.pathname === '/admin' 
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Dashboard
            </Link>
            <Link
              to="/admin/employees"
              className={`py-4 px-3 border-b-2 ${
                location.pathname === '/admin/employees'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Empleados
            </Link>
            <Link
              to="/admin/recruitment"
              className={`py-4 px-3 border-b-2 ${
                location.pathname === '/admin/recruitment'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Reclutamiento
            </Link>
            <Link
              to="/admin/payroll"
              className={`py-4 px-3 border-b-2 ${
                location.pathname === '/admin/payroll'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Nómina
            </Link>
            <Link
              to="/admin/schedule"
              className={`py-4 px-3 border-b-2 ${
                location.pathname === '/admin/schedule'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Agenda
            </Link>
          </div>
        </div>
      </div>

      {/* Contenido */}
      <div className="max-w-7xl mx-auto py-6 px-4">
        <Routes>
          <Route index element={<AdminDashboardHome />} />
          <Route path="employees" element={<EmployeeManagement />} />
          <Route path="recruitment" element={<RecruitmentProgress />} />
          <Route path="payroll" element={<PayrollReports />} />
          <Route path="schedule" element={<RecruitmentSchedule />} />
        </Routes>
      </div>
    </div>
  );
}

export default AdminDashboard;