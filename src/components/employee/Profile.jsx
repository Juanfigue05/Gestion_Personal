// src/components/employee/Profile.jsx
// src/components/EmployeeDashboard.jsx
import React from 'react';
import { useSelector } from 'react-redux';

function EmployeeDashboard() {
  // Simulamos datos del empleado
  const employeeData = {
    name: "María García",
    position: "Diseñadora",
    department: "Diseño",
    supervisor: "Juan Pérez",
    nextTraining: "Diseño UX Avanzado",
    trainingDate: "2024-03-15",
    lastPayroll: "Febrero 2024",
    pendingRequests: 2
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Panel de Empleado</h2>
      
      {/* Grid de tarjetas informativas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-gray-500 text-sm mb-2">Próxima Capacitación</h3>
          <p className="text-lg font-semibold text-indigo-600">{employeeData.nextTraining}</p>
          <p className="text-sm text-gray-500 mt-1">{employeeData.trainingDate}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-gray-500 text-sm mb-2">Última Nómina</h3>
          <p className="text-lg font-semibold text-green-600">{employeeData.lastPayroll}</p>
          <p className="text-sm text-gray-500 mt-1">Procesada</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-gray-500 text-sm mb-2">Solicitudes Pendientes</h3>
          <p className="text-lg font-semibold text-yellow-600">{employeeData.pendingRequests}</p>
          <p className="text-sm text-gray-500 mt-1">Por revisar</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-gray-500 text-sm mb-2">Departamento</h3>
          <p className="text-lg font-semibold text-blue-600">{employeeData.department}</p>
          <p className="text-sm text-gray-500 mt-1">Supervisor: {employeeData.supervisor}</p>
        </div>
      </div>

      {/* Sección de información personal */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Información Personal</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Nombre Completo</p>
            <p className="text-base font-medium">{employeeData.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Cargo</p>
            <p className="text-base font-medium">{employeeData.position}</p>
          </div>
        </div>
      </div>

      {/* Sección de actividades recientes */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Actividades Recientes</h3>
        <div className="space-y-4">
          <div className="flex items-center border-b pb-4">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
            <div>
              <p className="text-sm font-medium">Capacitación completada: Fundamentos de Diseño</p>
              <p className="text-xs text-gray-500">Hace 2 días</p>
            </div>
          </div>
          <div className="flex items-center border-b pb-4">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
            <div>
              <p className="text-sm font-medium">Solicitud de vacaciones enviada</p>
              <p className="text-xs text-gray-500">Hace 5 días</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
            <div>
              <p className="text-sm font-medium">Evaluación de desempeño programada</p>
              <p className="text-xs text-gray-500">Para el próximo mes</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeDashboard;