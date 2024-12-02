import React from 'react';

const candidateProgress = {
  totalCapacitaciones: 5,
  enProgreso: 3,
  completadas: 2,
  progreso: 60,
  fechaIngreso: '2024-02-01',
  fechaFin: '2024-03-15',
  instructor: 'Carlos Ruiz',
  tipo: 'Online',
  description: 'Prueba técnica de diseño de interfaces y experiencia de usuario',
  modules: [
    { name: 'Fundamentos de UX', completed: true },
    { name: 'Diseño de Interacción', completed: true },
    { name: 'Prototipado Avanzado', completed: false },
    { name: 'Evaluación de Usabilidad', completed: false }
  ],
  certificate: 'https://certificado.ejemplo.com/123',
  status: 'En Progreso'
};

const CandidateProgress = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Progreso del Candidato</h2>

      {/* Resumen de Progreso */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm text-gray-500">Total Capacitaciones</h3>
          <p className="text-2xl font-bold">{candidateProgress.totalCapacitaciones}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm text-gray-500">En Progreso</h3>
          <p className="text-2xl font-bold text-yellow-600">
            {candidateProgress.enProgreso}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm text-gray-500">Completadas</h3>
          <p className="text-2xl font-bold text-green-600">
            {candidateProgress.completadas}
          </p>
        </div>
      </div>

      {/* Barra de Progreso */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm text-gray-600">Progreso</span>
          <span className="text-sm font-medium text-gray-900">{candidateProgress.progreso}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-indigo-600 rounded-full h-2"
            style={{ width: `${candidateProgress.progreso}%` }}
          ></div>
        </div>
      </div>

      {/* Detalles del Curso */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div>
          <p className="text-sm text-gray-500">Fecha Ingreso</p>
          <p className="text-sm font-medium">{candidateProgress.fechaIngreso}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Fecha Fin</p>
          <p className="text-sm font-medium">{candidateProgress.fechaFin}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Instructor</p>
          <p className="text-sm font-medium">{candidateProgress.instructor}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Tipo</p>
          <p className="text-sm font-medium">{candidateProgress.tipo}</p>
        </div>
      </div>

      {/* Módulos del Curso */}
      {candidateProgress.modules && (
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Módulos</h4>
          <div className="space-y-2">
            {candidateProgress.modules.map((module, index) => (
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
      {candidateProgress.certificate && (
        <div className="mt-4 flex justify-end">
          <a
            href={candidateProgress.certificate}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Ver Certificado
          </a>
          {candidateProgress.progreso < 100 && (
            <button
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 ml-4"
            >
              Continuar Prueba
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default CandidateProgress;