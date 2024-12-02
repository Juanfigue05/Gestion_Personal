// src/components/candidate/ApplicationStatus.jsx
import React, { useState } from 'react';

function ApplicationStatus() {
  const [application] = useState({
    id: "APP-2024-001",
    status: "En Revisión",
    position: "Desarrollador Frontend",
    appliedDate: "2024-02-15",
    lastUpdate: "2024-02-20",
    steps: [
      { name: "Aplicación Recibida", completed: true, date: "2024-02-15" },
      { name: "Revisión de CV", completed: true, date: "2024-02-18" },
      { name: "Entrevista RRHH", completed: false, date: null },
      { name: "Prueba Técnica", completed: false, date: null },
      { name: "Entrevista Final", completed: false, date: null }
    ],
    nextSteps: "Programación de entrevista con RRHH"
  });

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Estado de tu Postulación</h2>
            <p className="text-gray-600">ID: {application.id}</p>
          </div>
          <span className="px-4 py-2 rounded-full bg-yellow-100 text-yellow-800 font-medium">
            {application.status}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-sm text-gray-500">Puesto</p>
            <p className="font-medium">{application.position}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Fecha de Postulación</p>
            <p className="font-medium">{application.appliedDate}</p>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Proceso de Selección</h3>
          <div className="space-y-4">
            {application.steps.map((step, index) => (
              <div key={index} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step.completed ? 'bg-green-500' : 'bg-gray-200'
                }`}>
                  {step.completed ? (
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <span className="text-gray-500">{index + 1}</span>
                  )}
                </div>
                <div className="ml-4 flex-1">
                  <p className="font-medium">{step.name}</p>
                  {step.date && (
                    <p className="text-sm text-gray-500">{step.date}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">Próximos Pasos</h3>
          <p className="text-blue-700">{application.nextSteps}</p>
        </div>
      </div>
    </div>
  );
}

export default ApplicationStatus;