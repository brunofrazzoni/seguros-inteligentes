import React from 'react';
import { Edit, TrendingUp, Users, MapPin } from 'lucide-react';

const Profile = ({ userProfile, responses, setUserProfile }) => {
  const handleEditProfile = () => {
    // Función para editar el perfil (futuro)
    alert('Funcionalidad de edición próximamente disponible');
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
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="font-medium text-gray-700">Vivienda</div>
            <div className="text-gray-900 capitalize">{responses.housing?.replace('_', ' ')}</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="font-medium text-gray-700">Transporte</div>
            <div className="text-gray-900 capitalize">{responses.transport}</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="font-medium text-gray-700">Trabajo</div>
            <div className="text-gray-900 capitalize">{responses.occupation}</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="font-medium text-gray-700">Mascotas</div>
            <div className="text-gray-900 capitalize">{responses.pets}</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="font-medium text-gray-700">Viajes</div>
            <div className="text-gray-900 capitalize">{responses.travel}</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="font-medium text-gray-700">Salud</div>
            <div className="text-gray-900 capitalize">{responses.health}</div>
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
          <div className="p-4 bg-white bg-opacity-80 rounded-lg">
            <p className="text-gray-800">
              Tu perfil de <strong>{userProfile.lifestyle}</strong> indica un riesgo {userProfile.riskScore >= 7 ? 'elevado' : 'moderado'} 
              que requiere atención en {userProfile.coverageNeeds - userProfile.currentCoverage} áreas de protección.
            </p>
          </div>
          {responses.occupation === 'freelance' && (
            <div className="p-4 bg-white bg-opacity-80 rounded-lg">
              <p className="text-gray-800">
                Como freelancer, tu mayor vulnerabilidad está en la falta de protección social. 
                Prioriza seguro de salud y cesantía.
              </p>
            </div>
          )}
          {responses.transport === 'auto' && (
            <div className="p-4 bg-white bg-opacity-80 rounded-lg">
              <p className="text-gray-800">
                Tu movilidad en auto aumenta significativamente tu exposición a riesgos. 
                Considera cobertura completa más allá del SOAP obligatorio.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
