// src/components/admin/AdminDashboardHome.jsx
import React from 'react';

function AdminDashboardHome() {
  // Datos de ejemplo para el dashboard
  const dashboardData = {
    employees: {
      total: 150,
      active: 142,
      onLeave: 5,
      new: 3
    },
    recruitment: {
      openPositions: 8,
      activeProcesses: 12,
      pendingInterviews: 5,
      completedHires: 15
    },
    training: {
      activeCourses: 6,
      enrolledEmployees: 45,
      completedThisMonth: 28,
      upcomingCourses: 4
    },
    payroll: {
      processed: 142,
      pending: 0,
      totalAmount: 450000,
      bonusesThisMonth: 25000
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Panel de Control</h2>

      {/* Resumen General */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-500 text-sm">Total Empleados</h3>
          <p className="text-2xl font-bold text-indigo-600">{dashboardData.employees.total}</p>
          <div className="mt-2 text-sm">
            <span className="text-green-600">{dashboardData.employees.active} activos</span>
            <span className="text-gray-500 mx-1">•</span>
            <span className="text-yellow-600">{dashboardData.employees.onLeave} ausentes</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-500 text-sm">Procesos Activos</h3>
          <p className="text-2xl font-bold text-blue-600">{dashboardData.recruitment.activeProcesses}</p>
          <div className="mt-2 text-sm">
            <span>{dashboardData.recruitment.openPositions} posiciones abiertas</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-500 text-sm">Capacitaciones</h3>
          <p className="text-2xl font-bold text-green-600">{dashboardData.training.activeCourses}</p>
          <div className="mt-2 text-sm">
            <span>{dashboardData.training.enrolledEmployees} empleados inscritos</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-500 text-sm">Nómina Mensual</h3>
          <p className="text-2xl font-bold text-purple-600">${dashboardData.payroll.totalAmount.toLocaleString()}</p>
          <div className="mt-2 text-sm">
            <span>{dashboardData.payroll.processed} nóminas procesadas</span>
          </div>
        </div>
      </div>

      {/* Actividad Reciente */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Actividad Reciente</h3>
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
              <div>
                <p className="text-sm font-medium">Nuevo empleado registrado</p>
                <p className="text-xs text-gray-500">Hace 2 horas</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
              <div>
                <p className="text-sm font-medium">Proceso de contratación finalizado</p>
                <p className="text-xs text-gray-500">Hace 4 horas</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
              <div>
                <p className="text-sm font-medium">Nueva solicitud de vacaciones</p>
                <p className="text-xs text-gray-500">Hace 6 horas</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Tareas Pendientes</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input type="checkbox" className="h-4 w-4 text-indigo-600 rounded border-gray-300" />
                <span className="ml-3 text-sm">Revisar solicitudes de contratación (3)</span>
              </div>
              <span className="text-xs text-red-600">Urgente</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input type="checkbox" className="h-4 w-4 text-indigo-600 rounded border-gray-300" />
                <span className="ml-3 text-sm">Aprobar reportes de gastos (5)</span>
              </div>
              <span className="text-xs text-yellow-600">Medio</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input type="checkbox" className="h-4 w-4 text-indigo-600 rounded border-gray-300" />
                <span className="ml-3 text-sm">Programar entrevistas (2)</span>
              </div>
              <span className="text-xs text-blue-600">Normal</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboardHome;