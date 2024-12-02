// src/components/employee/Training.jsx
import React, { useState } from 'react';

function Training() {
  // Estado para las capacitaciones
  const [trainings] = useState([
    {
      id: 1,
      title: "Diseño UX/UI Avanzado",
      status: "En Progreso",
      progress: 60,
      startDate: "2024-02-01",
      endDate: "2024-03-15",
      instructor: "Carlos Ruiz",
      type: "Online",
      description: "Curso avanzado de diseño de interfaces y experiencia de usuario",
      modules: [
        { name: "Fundamentos de UX", completed: true },
        { name: "Diseño de Interacción", completed: true },
        { name: "Prototipado Avanzado", completed: false },
        { name: "Evaluación de Usabilidad", completed: false }
      ]
    },
    {
      id: 2,
      title: "Gestión del Tiempo",
      status: "Completado",
      progress: 100,
      startDate: "2024-01-10",
      endDate: "2024-01-30",
      instructor: "Ana López",
      type: "Presencial",
      description: "Técnicas y herramientas para la gestión eficiente del tiempo",
      certificate: "https://certificado.ejemplo.com/123"
    }
  ]);

  // Estado para filtrar capacitaciones
  const [filter, setFilter] = useState('all'); // 'all', 'active', 'completed'

  const getStatusColor = (status) => {
    switch (status) {
      case 'En Progreso':
        return 'bg-yellow-100 text-yellow-800';
      case 'Completado':
        return 'bg-green-100 text-green-800';
      case 'Pendiente':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  const filteredTrainings = trainings.filter(training => {
    if (filter === 'active') return training.status === 'En Progreso';
    if (filter === 'completed') return training.status === 'Completado';
    return true;
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Mis Capacitaciones</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-md ${filter === 'all' ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}
          >
            Todas
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`px-4 py-2 rounded-md ${filter === 'active' ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}
          >
            En Progreso
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-4 py-2 rounded-md ${filter === 'completed' ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}
          >
            Completadas
          </button>
        </div>
      </div>

      {/* Resumen de Progreso */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm text-gray-500">Total Capacitaciones</h3>
          <p className="text-2xl font-bold">{trainings.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm text-gray-500">En Progreso</h3>
          <p className="text-2xl font-bold text-yellow-600">
            {trainings.filter(t => t.status === 'En Progreso').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm text-gray-500">Completadas</h3>
          <p className="text-2xl font-bold text-green-600">
            {trainings.filter(t => t.status === 'Completado').length}
          </p>
        </div>
      </div>

      {/* Lista de Capacitaciones */}
      <div className="space-y-6">
        {filteredTrainings.map((training) => (
          <div key={training.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{training.title}</h3>
                <p className="text-sm text-gray-500">{training.description}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(training.status)}`}>
                {training.status}
              </span>
            </div>

            {/* Barra de Progreso */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-600">Progreso</span>
                <span className="text-sm font-medium text-gray-900">{training.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-indigo-600 rounded-full h-2"
                  style={{ width: `${training.progress}%` }}
                ></div>
              </div>
            </div>

            {/* Detalles del Curso */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-500">Instructor</p>
                <p className="text-sm font-medium">{training.instructor}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Tipo</p>
                <p className="text-sm font-medium">{training.type}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Fecha Inicio</p>
                <p className="text-sm font-medium">{training.startDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Fecha Fin</p>
                <p className="text-sm font-medium">{training.endDate}</p>
              </div>
            </div>

            {/* Módulos del Curso */}
            {training.modules && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Módulos</h4>
                <div className="space-y-2">
                  {training.modules.map((module, index) => (
                    <div key={index} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={module.completed}
                        readOnly
                        className="h-4 w-4 text-indigo-600 rounded border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-600">{module.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Certificado */}
            {training.certificate && (
              <div className="mt-4 flex justify-end">
                
                  href={training.certificate}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                <a>
                  Ver Certificado
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Training;