// src/components/admin/RecruitmentSchedule.jsx
import React, { useState } from 'react';

function RecruitmentSchedule() {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Entrevista Frontend Developer",
      candidateName: "Ana Martínez",
      type: "Entrevista Técnica",
      date: "2024-03-01",
      time: "10:00",
      interviewer: "Carlos López",
      status: "Pendiente",
      position: "Desarrollador Frontend",
      location: "Sala de Reuniones A",
    },
    {
      id: 2,
      title: "Evaluación UX Designer",
      candidateName: "Pedro Sánchez",
      type: "Prueba Técnica",
      date: "2024-03-02",
      time: "14:30",
      interviewer: "María García",
      status: "Confirmado",
      position: "Diseñador UX",
      location: "Sala Virtual",
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    candidateName: '',
    type: '',
    date: '',
    time: '',
    interviewer: '',
    position: '',
    location: '',
    status: 'Pendiente'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const eventToAdd = {
      ...newEvent,
      id: Date.now(),
    };
    setEvents([...events, eventToAdd]);
    setShowAddModal(false);
  };

  const getStatusColor = (status) => {
    const colors = {
      'Pendiente': 'bg-yellow-100 text-yellow-800',
      'Confirmado': 'bg-green-100 text-green-800',
      'Cancelado': 'bg-red-100 text-red-800',
      'Completado': 'bg-blue-100 text-blue-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Agenda de Contratación</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          + Nuevo Evento
        </button>
      </div>

      {/* Resumen de eventos */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Total Eventos</h3>
          <p className="text-2xl font-bold">{events.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Pendientes</h3>
          <p className="text-2xl font-bold text-yellow-600">
            {events.filter(e => e.status === 'Pendiente').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Confirmados</h3>
          <p className="text-2xl font-bold text-green-600">
            {events.filter(e => e.status === 'Confirmado').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Esta Semana</h3>
          <p className="text-2xl font-bold text-blue-600">
            {events.length} {/* Aquí podrías filtrar por fecha actual */}
          </p>
        </div>
      </div>

      {/* Lista de eventos */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="grid gap-4 p-4">
          {events.map((event) => (
            <div key={event.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">{event.title}</h3>
                  <p className="text-sm text-gray-600">{event.candidateName} - {event.position}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(event.status)}`}>
                  {event.status}
                </span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                <div>
                  <p className="text-xs text-gray-500">Fecha</p>
                  <p className="text-sm font-medium">{formatDate(event.date)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Hora</p>
                  <p className="text-sm font-medium">{event.time}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Entrevistador</p>
                  <p className="text-sm font-medium">{event.interviewer}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Ubicación</p>
                  <p className="text-sm font-medium">{event.location}</p>
                </div>
              </div>
              <div className="mt-4 flex justify-end space-x-2">
                <button className="text-sm text-indigo-600 hover:text-indigo-800">Editar</button>
                <button className="text-sm text-red-600 hover:text-red-800">Cancelar</button>
                <button className="text-sm text-green-600 hover:text-green-800">Confirmar</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal para nuevo evento */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h3 className="text-lg font-bold mb-4">Nuevo Evento de Contratación</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Título</label>
                <input
                  type="text"
                  name="title"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Candidato</label>
                <input
                  type="text"
                  name="candidateName"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Tipo de Evento</label>
                <select
                  name="type"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Seleccione un tipo</option>
                  <option value="Entrevista Inicial">Entrevista Inicial</option>
                  <option value="Entrevista Técnica">Entrevista Técnica</option>
                  <option value="Prueba Técnica">Prueba Técnica</option>
                  <option value="Entrevista Final">Entrevista Final</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Fecha</label>
                  <input
                    type="date"
                    name="date"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Hora</label>
                  <input
                    type="time"
                    name="time"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Posición</label>
                <input
                  type="text"
                  name="position"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Ubicación</label>
                <input
                  type="text"
                  name="location"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  onChange={handleInputChange}
                  required
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

export default RecruitmentSchedule;