import React, { useState } from 'react';
import { Edit, TrendingUp, Users, MapPin } from 'lucide-react';

const Profile = ({ userProfile, responses, setUserProfile, setResponses }) => {
  const handleEditProfile = () => {
    // Función para editar el perfil (futuro)
    alert('Funcionalidad de edición próximamente disponible');
  };

  // --- Lifestyle edit mode state ---
  const [editMode, setEditMode] = useState(null);
  const [tempResponses, setTempResponses] = useState({ ...responses });

  // Inicializar tempResponses desde responses
  const initializeTempResponses = () => {
    setTempResponses({ ...responses });
  };

  // Abrir modo edición para un campo
  const openEditMode = (field) => {
    setTempResponses({ ...responses });
    setEditMode(field);
  };

  // Cancelar edición
  const cancelEdit = () => {
    setTempResponses({ ...responses });
    setEditMode(null);
  };

  // Helper: checkbox handler for multi-select (array) fields
  const handleCheckboxChange = (field, value, checked) => {
    setTempResponses((prev) => {
      const updated = new Set(prev[field] || []);
      checked ? updated.add(value) : updated.delete(value);
      return { ...prev, [field]: Array.from(updated) };
    });
  };

  // Helper: single-select (dropdown) change
  const handleSelectChange = (field, value) => {
    setTempResponses((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Save edit for a field
  const saveEdit = (field) => {
    const updatedResponses = {
      ...responses,
      [field]: tempResponses[field]
    };

    // 1. Actualizar las responses originales
    setResponses(updatedResponses);

    // 2. Actualizar el perfil
    const updatedProfile = {
      ...userProfile,
      responses: updatedResponses,
      lastUpdate: new Date().toLocaleDateString()
    };

    setUserProfile(updatedProfile);

    // 3. Persistencia opcional
    localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
    localStorage.setItem('userResponses', JSON.stringify(updatedResponses));

    // 4. Cerrar edición
    setEditMode(null);

    console.log('Guardado exitoso:', { field, newValue: tempResponses[field] });
  };

  if (!userProfile) {
    return (
      <div className="text-center py-12">
        <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Perfil no disponible</h3>
        <p className="text-gray-600">Complete el cuestionario primero para generar su perfil.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Mi Perfil de Riesgo</h2>
        <button 
          onClick={handleEditProfile}
          className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          <Edit className="w-4 h-4" />
          <span>Editar respuestas</span>
        </button>
      </div>

      {/* Profile Summary */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">🧩 Perfil Generado por IA</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {userProfile.tags.map((tag, index) => (
            <span key={index} className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
              {tag}
            </span>
          ))}
        </div>
        <p className="text-gray-700 text-lg">{userProfile.lifestyle}</p>
        <div className="mt-4 text-sm text-gray-600">
          <p>Score de riesgo: <span className="font-semibold">{userProfile.riskScore}/10</span></p>
          <p>Última actualización: {userProfile.lastUpdate}</p>
        </div>
      </div>

      {/* Lifestyle Declared */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">🧾 Estilo de Vida Declarado</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Vivienda */}
          <div className="p-4 bg-gray-50 rounded-lg relative">
            <div className="font-medium text-gray-700 flex justify-between">
              <span>Vivienda</span>
              <button
                onClick={() => openEditMode('housing')}
                className="text-gray-500 hover:text-gray-800"
                aria-label="Editar Vivienda"
              >✏️</button>
            </div>
            {editMode === 'housing' ? (
              <div>
                <div className="mt-2">
                  <select
                    className="w-full border border-gray-300 rounded px-2 py-1"
                    value={tempResponses.housing || ''}
                    onChange={e => handleSelectChange('housing', e.target.value)}
                  >
                    <option value="">Seleccione...</option>
                    <option value="casa_propia">Casa Propia</option>
                    <option value="depto_propio">Depto Propio</option>
                    <option value="arriendo">Arriendo</option>
                    <option value="con_familia">Con Familia</option>
                  </select>
                </div>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => saveEdit('housing')}
                    className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
                  >
                    Guardar
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="px-3 py-1 bg-gray-300 text-gray-700 text-sm rounded hover:bg-gray-400"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-gray-900 capitalize">{responses.housing?.replace('_', ' ')}</div>
            )}
          </div>
          {/* Transporte */}
          <div className="p-4 bg-gray-50 rounded-lg relative">
            <div className="font-medium text-gray-700 flex justify-between">
              <span>Transporte</span>
              <button
                onClick={() => openEditMode('transport')}
                className="text-gray-500 hover:text-gray-800"
                aria-label="Editar Transporte"
              >✏️</button>
            </div>
            {editMode === 'transport' ? (
              <div>
                <div className="mt-2">
                  {['auto', 'bicicleta', 'scooter', 'transporte_publico', 'moto', 'caminando'].map(option => (
                    <label key={option} className="block text-sm text-gray-700">
                      <input
                        type="checkbox"
                        value={option}
                        checked={Array.isArray(tempResponses.transport) && tempResponses.transport.includes(option)}
                        onChange={e => handleCheckboxChange('transport', option, e.target.checked)}
                      />
                      {' '}{option.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </label>
                  ))}
                </div>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => saveEdit('transport')}
                    className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
                  >
                    Guardar
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="px-3 py-1 bg-gray-300 text-gray-700 text-sm rounded hover:bg-gray-400"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-gray-900">
                {Array.isArray(responses.transport)
                  ? responses.transport.map((item) => item.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())).join(', ')
                  : responses.transport?.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </div>
            )}
          </div>
          {/* Trabajo */}
          <div className="p-4 bg-gray-50 rounded-lg relative">
            <div className="font-medium text-gray-700 flex justify-between">
              <span>Trabajo</span>
              <button
                onClick={() => openEditMode('occupation')}
                className="text-gray-500 hover:text-gray-800"
                aria-label="Editar Trabajo"
              >✏️</button>
            </div>
            {editMode === 'occupation' ? (
              <div>
                <div className="mt-2">
                  <select
                    className="w-full border border-gray-300 rounded px-2 py-1"
                    value={tempResponses.occupation || ''}
                    onChange={e => handleSelectChange('occupation', e.target.value)}
                  >
                    <option value="">Seleccione...</option>
                    <option value="dependiente">Dependiente</option>
                    <option value="freelance">Freelance</option>
                    <option value="emprendedor">Emprendedor</option>
                    <option value="estudiante">Estudiante</option>
                    <option value="jubilado">Jubilado</option>
                  </select>
                </div>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => saveEdit('occupation')}
                    className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
                  >
                    Guardar
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="px-3 py-1 bg-gray-300 text-gray-700 text-sm rounded hover:bg-gray-400"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-gray-900 capitalize">{responses.occupation}</div>
            )}
          </div>
          {/* Mascotas */}
          <div className="p-4 bg-gray-50 rounded-lg relative">
            <div className="font-medium text-gray-700 flex justify-between">
              <span>Mascotas</span>
              <button
                onClick={() => openEditMode('pets')}
                className="text-gray-500 hover:text-gray-800"
                aria-label="Editar Mascotas"
              >✏️</button>
            </div>
            {editMode === 'pets' ? (
              <div>
                <div className="mt-2">
                  {['perro', 'gato', 'ninguna', 'otro'].map(option => (
                    <label key={option} className="block text-sm text-gray-700">
                      <input
                        type="checkbox"
                        value={option}
                        checked={Array.isArray(tempResponses.pets) && tempResponses.pets.includes(option)}
                        onChange={e => handleCheckboxChange('pets', option, e.target.checked)}
                      />
                      {' '}{option.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </label>
                  ))}
                </div>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => saveEdit('pets')}
                    className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
                  >
                    Guardar
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="px-3 py-1 bg-gray-300 text-gray-700 text-sm rounded hover:bg-gray-400"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-gray-900">
                {Array.isArray(responses.pets)
                  ? responses.pets.map((item) => item.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())).join(', ')
                  : responses.pets?.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </div>
            )}
          </div>
          {/* Viajes */}
          <div className="p-4 bg-gray-50 rounded-lg relative">
            <div className="font-medium text-gray-700 flex justify-between">
              <span>Viajes</span>
              <button
                onClick={() => openEditMode('travel')}
                className="text-gray-500 hover:text-gray-800"
                aria-label="Editar Viajes"
              >✏️</button>
            </div>
            {editMode === 'travel' ? (
              <div>
                <div className="mt-2">
                  <select
                    className="w-full border border-gray-300 rounded px-2 py-1"
                    value={tempResponses.travel || ''}
                    onChange={e => handleSelectChange('travel', e.target.value)}
                  >
                    <option value="">Seleccione...</option>
                    <option value="nunca">Nunca</option>
                    <option value="ocasional">Ocasional</option>
                    <option value="frecuente">Frecuente</option>
                  </select>
                </div>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => saveEdit('travel')}
                    className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
                  >
                    Guardar
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="px-3 py-1 bg-gray-300 text-gray-700 text-sm rounded hover:bg-gray-400"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-gray-900 capitalize">{responses.travel}</div>
            )}
          </div>
          {/* Salud */}
          <div className="p-4 bg-gray-50 rounded-lg relative">
            <div className="font-medium text-gray-700 flex justify-between">
              <span>Salud</span>
              <button
                onClick={() => openEditMode('health')}
                className="text-gray-500 hover:text-gray-800"
                aria-label="Editar Salud"
              >✏️</button>
            </div>
            {editMode === 'health' ? (
              <div>
                <div className="mt-2">
                  {['hipertension', 'diabetes', 'cancer_historial', 'ninguna', 'otros'].map(option => (
                    <label key={option} className="block text-sm text-gray-700">
                      <input
                        type="checkbox"
                        value={option}
                        checked={Array.isArray(tempResponses.health) && tempResponses.health.includes(option)}
                        onChange={e => handleCheckboxChange('health', option, e.target.checked)}
                      />
                      {' '}{option.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </label>
                  ))}
                </div>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => saveEdit('health')}
                    className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
                  >
                    Guardar
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="px-3 py-1 bg-gray-300 text-gray-700 text-sm rounded hover:bg-gray-400"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-gray-900">
                {Array.isArray(responses.health)
                  ? responses.health.map((item) => item.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())).join(', ')
                  : responses.health?.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Risk Analysis */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">📊 Análisis de Riesgo Dinámico</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600 mb-2">
              {['casa_propia', 'depto_propio'].includes(responses.housing) ? 'Bajo' : 'Medio'}
            </div>
            <div className="text-sm text-gray-600">Riesgo Hogar</div>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600 mb-2">
              {responses.transport === 'auto' ? 'Alto' : 'Bajo'}
            </div>
            <div className="text-sm text-gray-600">Riesgo Movilidad</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600 mb-2">
              {['freelance', 'emprendedor'].includes(responses.occupation) ? 'Alto' : 'Medio'}
            </div>
            <div className="text-sm text-gray-600">Riesgo Laboral</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600 mb-2">{userProfile.riskScore}/10</div>
            <div className="text-sm text-gray-600">Score General</div>
          </div>
        </div>
      </div>

      {/* Coverage Overview */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">🎯 Resumen de Cobertura</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <span className="font-medium text-gray-700">Necesidades identificadas</span>
            <span className="text-2xl font-bold text-gray-900">{userProfile.coverageNeeds}</span>
          </div>
          <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
            <span className="font-medium text-gray-700">Coberturas actuales</span>
            <span className="text-2xl font-bold text-green-600">{userProfile.currentCoverage}</span>
          </div>
          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
            <span className="font-medium text-gray-700">Gaps por cubrir</span>
            <span className="text-2xl font-bold text-blue-600">{userProfile.coverageNeeds - userProfile.currentCoverage}</span>
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">💡 Insights Personalizados</h3>
        <div className="space-y-3">
          {userProfile.insightsIA && userProfile.insightsIA.length > 0 ? (
            userProfile.insightsIA.map((insight, index) => (
              <div key={index} className="p-4 bg-white bg-opacity-80 rounded-lg">
                <p className="text-gray-800">{insight}</p>
              </div>
            ))
          ) : (
            <div className="p-4 bg-white bg-opacity-80 rounded-lg">
              <p className="text-gray-800">
                Tu perfil de <strong>{userProfile.lifestyle}</strong> indica un riesgo {userProfile.riskScore >= 7 ? 'elevado' : 'moderado'} 
                que requiere atención en {userProfile.coverageNeeds - userProfile.currentCoverage} áreas de protección.
              </p>
            </div>
          )}
        </div>
      </div>
      {/* Raw Responses */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">📋 Respuestas Originales</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          {Object.entries(responses).map(([key, value]) => (
            <div key={key} className="p-4 bg-gray-50 rounded-lg">
              <div className="font-medium text-gray-700">
                {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </div>
              <div className="text-gray-900">
                {Array.isArray(value)
                  ? value.map((item) =>
                      item.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
                    ).join(', ')
                  : value?.toString().replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
