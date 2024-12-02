import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import CandidateCalendar from './candidate/CandidateCalendar';
import ProfileCandidate from './candidate/ProfileCandidate';
import CandidateProgress from './candidate/CandidateProgress';

function CandidateDashboard() {
  const location = useLocation();
  const [data] = useState({
    totalCandidatos: 50,
    vacantesTrabajo: 12,
    candidatosFase1: 25,
    candidatosFase2: 8,
  });

  useEffect(() => {
    console.log(data);
  }, [data]);

  // Comprehensive route check
  const shouldHideSummaryCards = 
    location.pathname.endsWith('/calendar') || 
    location.pathname.endsWith('/perfil') || 
    location.pathname.endsWith('/progreso');

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Panel de Candidatos</h1>
        <p className="mt-2 text-gray-600">Información de candidatos y procesos de selección</p>
      </div>

      {!shouldHideSummaryCards && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-800">Total Candidatos</h3>
            <p className="text-3xl font-bold text-indigo-600 mt-2">{data.totalCandidatos}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-800">Vacantes de trabajo</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">{data.vacantesTrabajo}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-800">Candidatos en Fase 1</h3>
            <p className="text-3xl font-bold text-yellow-600 mt-2">{data.candidatosFase1}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-800">Candidatos en Fase 2</h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">{data.candidatosFase2}</p>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow">
        <Routes>
          <Route index element={
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Bienvenido al Panel de Candidatos</h2>
              <p className="text-gray-600">Seleccione una opción del menú para comenzar.</p>
            </div>
          } />
          <Route path="calendar" element={<CandidateCalendar />} />
          <Route path="perfil" element={<ProfileCandidate />} />
          <Route path="progreso" element={<CandidateProgress />} />
        </Routes>
      </div>
    </div>
  );
}

export default CandidateDashboard;