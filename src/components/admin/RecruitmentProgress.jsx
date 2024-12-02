// src/components/admin/RecruitmentProgress.jsx
import React, { useState } from 'react';

function RecruitmentProgress() {
  // Estado inicial para los procesos de contratación
  const [recruitmentProcesses, setRecruitmentProcesses] = useState([
    {
      id: 1,
      position: "Desarrollador Frontend",
      department: "IT",
      status: "Entrevista",
      candidates: 5,
      startDate: "2024-01-15",
      priority: "Alta",
      progress: 60,
    },
    {
      id: 2,
      position: "Analista de RRHH",
      department: "Recursos Humanos",
      status: "Evaluación",
      candidates: 3,
      startDate: "2024-02-01",
      priority: "Media",
      progress: 40,
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    position: "",
    department: "",
    status: "Publicado",
    candidates: 0,
    startDate: "",
    priority: "Media",
    progress: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProcess = {
      ...formData,
      id: Date.now(),
    };
    setRecruitmentProcesses([...recruitmentProcesses, newProcess]);
    setShowAddModal(false);
  };

  const getStatusColor = (status) => {
    const colors = {
      'Publicado': 'bg-blue-100 text-blue-800',
      'Evaluación': 'bg-yellow-100 text-yellow-800',
      'Entrevista': 'bg-purple-100 text-purple-800',
      'Finalizado': 'bg-green-100 text-green-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      'Alta': 'text-red-600',
      'Media': 'text-yellow-600',
      'Baja': 'text-green-600'
    };
    return colors[priority] || 'text-gray-600';
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Progreso de Contrataciones</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          + Nuevo Proceso
        </button>
      </div>

      {/* Tarjetas de resumen */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Procesos Activos</h3>
          <p className="text-2xl font-bold">{recruitmentProcesses.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Total Candidatos</h3>
          <p className="text-2xl font-bold">
            {recruitmentProcesses.reduce((acc, curr) => acc + curr.candidates, 0)}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">En Entrevistas</h3>
          <p className="text-2xl font-bold">
            {recruitmentProcesses.filter(p => p.status === 'Entrevista').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Finalizados</h3>
          <p className="text-2xl font-bold">
            {recruitmentProcesses.filter(p => p.status === 'Finalizado').length}
          </p>
        </div>
      </div>

      {/* Tabla de procesos */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Posición</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Departamento</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Candidatos</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Inicio</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Prioridad</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Progreso</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {recruitmentProcesses.map((process) => (
              <tr key={process.id}>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">{process.position}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-500">{process.department}</div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(process.status)}`}>
                    {process.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-500">{process.candidates}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-500">{process.startDate}</div>
                </td>
                <td className="px-6 py-4">
                  <div className={`text-sm font-medium ${getPriorityColor(process.priority)}`}>
                    {process.priority}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full"
                      style={{ width: `${process.progress}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500">{process.progress}%</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal para nuevo proceso */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h3 className="text-lg font-bold mb-4">Nuevo Proceso de Contratación</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Posición</label>
                <input
                  type="text"
                  name="position"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Departamento</label>
                <input
                  type="text"
                  name="department"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Estado</label>
                <select
                  name="status"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  onChange={handleInputChange}
                >
                  <option value="Publicado">Publicado</option>
                  <option value="Evaluación">Evaluación</option>
                  <option value="Entrevista">Entrevista</option>
                  <option value="Finalizado">Finalizado</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Prioridad</label>
                <select
                  name="priority"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  onChange={handleInputChange}
                >
                  <option value="Alta">Alta</option>
                  <option value="Media">Media</option>
                  <option value="Baja">Baja</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Fecha de Inicio</label>
                <input
                  type="date"
                  name="startDate"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  onChange={handleInputChange}
                />
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default RecruitmentProgress;