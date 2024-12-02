import React from 'react';

const CandidateCalendar = () => {
  const events = [
    { date: new Date('2024-12-03'), title: 'Prueba psicológica' },
    { date: new Date('2024-12-06'), title: 'Prueba técnica' },
    { date: new Date('2024-12-05'), title: 'Prueba técnica' },
    { date: new Date('2024-12-11'), title: 'Prueba psicológica' },
    { date: new Date('2024-12-13'), title: 'Exámenes médicos' },
    { date: new Date('2024-12-15'), title: 'Envío de Resultados de contratación' },
  ];

  const eventColors = {
    'Prueba técnica': 'bg-blue-100 text-blue-800',
    'Prueba psicológica': 'bg-green-100 text-green-800',
    'Exámenes médicos': 'bg-red-100 text-red-800',
    'Envío de Resultados de contratación': 'bg-purple-100 text-purple-800',
    'Dia libre': 'bg-gray-100 text-gray-800',
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Calendario de Candidato</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="p-2 border text-left">Fecha</th>
              <th className="p-2 border text-left">Evento</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event, index) => (
              <tr key={index}>
                <td className="p-2 border">
                  {event.date.toLocaleDateString('es-ES', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                  })}
                </td>
                <td
                  className={`p-2 border ${eventColors[event.title]}`}
                >
                  {event.title}
                  {event.title !== 'Dia libre' && (
                    <button className="ml-2 px-2 py-1 bg-blue-500 text-white rounded">
                      Ver detalles
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CandidateCalendar;