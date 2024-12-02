// src/components/candidate/CandidateApplication.jsx
import React, { useState } from 'react';

function CandidateApplication() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    education: '',
    resumeFile: null,
    coverLetter: ''
  });

  const [submitStatus, setSubmitStatus] = useState({
    submitted: false,
    message: '',
    error: false
  });

  const positions = [
    'Desarrollador Frontend',
    'Desarrollador Backend',
    'Diseñador UX/UI',
    'Analista de RRHH',
    'Gerente de Proyecto'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      resumeFile: e.target.files[0]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar los datos al servidor
    setSubmitStatus({
      submitted: true,
      message: 'Postulación enviada exitosamente. Te contactaremos pronto.',
      error: false
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Formulario de Postulación</h2>

      {submitStatus.submitted ? (
        <div className={`p-4 rounded-lg ${submitStatus.error ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {submitStatus.message}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-lg shadow-md p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nombre</label>
              <input
                type="text"
                name="firstName"
                required
                value={formData.firstName}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Apellido</label>
              <input
                type="text"
                name="lastName"
                required
                value={formData.lastName}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Teléfono</label>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Puesto al que aplica</label>
            <select
              name="position"
              required
              value={formData.position}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">Seleccione un puesto</option>
              {positions.map((pos) => (
                <option key={pos} value={pos}>{pos}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Experiencia Laboral</label>
            <textarea
              name="experience"
              rows="4"
              value={formData.experience}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Describe tu experiencia laboral relevante..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Educación</label>
            <textarea
              name="education"
              rows="3"
              value={formData.education}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Detalla tu formación académica..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">CV (PDF)</label>
            <input
              type="file"
              name="resumeFile"
              accept=".pdf"
              onChange={handleFileChange}
              className="mt-1 block w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Carta de Presentación</label>
            <textarea
              name="coverLetter"
              rows="4"
              value={formData.coverLetter}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Cuéntanos por qué te interesa este puesto..."
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
            >
              Enviar Postulación
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default CandidateApplication;