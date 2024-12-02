// src/components/candidate/Profile.jsx
import React, { useState } from 'react';

function ProfileCandidate() {
  // Estado para los datos del perfil
  const [profileData, setProfileData] = useState({
    personalInfo: {
      name: "Juan David Figueroa",
      position: "Candidato",
      department: "Reclutamiento",
      employeeId: "",
      email: "jdfp2255@gmail.com",
      phone: "3145370182",
      joinDate: "28/11/2024",
    },
    documents: {
      dni: "1004683271",
      socialSecurity: "none",
      bankAccount: "none",
    },
    emergency: {
      contactName: "Leonardo Baquero",
      relationship: "Amigo",
      phone: "3215987586",
    },
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(profileData);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedData(profileData);
  };

  const handleSave = () => {
    setProfileData(editedData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedData(profileData);
  };

  const handleInputChange = (section, field, value) => {
    setEditedData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Mi Perfil</h2>
        {!isEditing ? (
          <button
            onClick={handleEdit}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            Editar Perfil
          </button>
        ) : (
          <div className="space-x-2">
            <button
              onClick={handleCancel}
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
            >
              Guardar Cambios
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {/* Información Personal */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Información Personal</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedData.personalInfo.name}
                  onChange={(e) => handleInputChange('personalInfo', 'name', e.target.value)}
                  className="w-full p-2 border rounded-md"
                />
              ) : (
                <p className="text-gray-900">{profileData.personalInfo.name}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
              {isEditing ? (
                <input
                  type="email"
                  value={editedData.personalInfo.email}
                  onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
                  className="w-full p-2 border rounded-md"
                />
              ) : (
                <p className="text-gray-900">{profileData.personalInfo.email}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
              {isEditing ? (
                <input
                  type="tel"
                  value={editedData.personalInfo.phone}
                  onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
                  className="w-full p-2 border rounded-md"
                />
              ) : (
                <p className="text-gray-900">{profileData.personalInfo.phone}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Nacimiento</label>
              {isEditing ? (
                <input
                  type="date"
                  value={editedData.personalInfo.joinDate}
                  onChange={(e) => handleInputChange('personalInfo', 'joinDate', e.target.value)}
                  className="w-full p-2 border rounded-md"
                />
              ) : (
                <p className="text-gray-900">{profileData.personalInfo.joinDate}</p>
              )}
            </div>
          </div>
        </div>

        {/* Documentación */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Documentación</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">DNI</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedData.documents.dni}
                  onChange={(e) => handleInputChange('documents', 'dni', e.target.value)}
                  className="w-full p-2 border rounded-md"
                />
              ) : (
                <p className="text-gray-900">{profileData.documents.dni}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Seguridad Social</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedData.documents.socialSecurity}
                  onChange={(e) => handleInputChange('documents', 'socialSecurity', e.target.value)}
                  className="w-full p-2 border rounded-md"
                />
              ) : (
                <p className="text-gray-900">{profileData.documents.socialSecurity}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cuenta Bancaria</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedData.documents.bankAccount}
                  onChange={(e) => handleInputChange('documents', 'bankAccount', e.target.value)}
                  className="w-full p-2 border rounded-md"
                />
              ) : (
                <p className="text-gray-900">{profileData.documents.bankAccount}</p>
              )}
            </div>
          </div>
        </div>

        {/* Contacto de Emergencia */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Contacto de Emergencia</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del Contacto</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedData.emergency.contactName}
                  onChange={(e) => handleInputChange('emergency', 'contactName', e.target.value)}
                  className="w-full p-2 border rounded-md"
                />
              ) : (
                <p className="text-gray-900">{profileData.emergency.contactName}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Relación</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedData.emergency.relationship}
                  onChange={(e) => handleInputChange('emergency', 'relationship', e.target.value)}
                  className="w-full p-2 border rounded-md"
                />
              ) : (
                <p className="text-gray-900">{profileData.emergency.relationship}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono de Emergencia</label>
              {isEditing ? (
                <input
                  type="tel"
                  value={editedData.emergency.phone}
                  onChange={(e) => handleInputChange('emergency', 'phone', e.target.value)}
                  className="w-full p-2 border rounded-md"
                />
              ) : (
                <p className="text-gray-900">{profileData.emergency.phone}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileCandidate;