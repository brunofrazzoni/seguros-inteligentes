import React from 'react';
import { AlertTriangle, Shield, Eye, Calculator, Check, Info } from 'lucide-react';

const Recommendations = ({ 
  recommendations, 
  userPortfolio, 
  setUserPortfolio, 
  setRecommendations, 
  userProfile, 
  setUserProfile,
  generateRecommendations, 
  responses,
  insuranceDatabase // ← ADD THIS LINE
}) => {
  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'CRÍTICO': return 'bg-red-100 text-red-800 border-red-200';
      case 'ALTO': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'MEDIO': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityIcon = (priority) => {
    if (priority === 'CRÍTICO') return <AlertTriangle className="w-4 h-4" />;
    if (priority === 'ALTO') return <Shield className="w-4 h-4" />;
    return <Eye className="w-4 h-4" />;
  };

  const handleInsuranceAction = (insurance, action) => {
    if (action === 'interested') {
      if (insurance.quoteLink) {
        window.open(insurance.quoteLink, '_blank');
      } else {
        alert(`Cotizando ${insurance.plan} con ${insurance.provider}`);
      }
    } else if (action === 'have') {
      setUserPortfolio(prev => [...prev, { ...insurance, addedDate: new Date().toLocaleDateString() }]);
      setRecommendations(prev => prev.filter(rec => rec.id !== insurance.id));
      
      // Actualizar perfil
      if (userProfile) {
        setUserProfile(prev => ({
          ...prev,
          currentCoverage: prev.currentCoverage + 1
        }));
      }
    }
  };

  const totalMonthlyCost = recommendations.reduce((total, rec) => total + rec.cost, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">🎯 Recomendaciones Personalizadas</h2>
          <p className="text-gray-600">Resultado del matching IA entre tu perfil y nuestra base de seguros</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-blue-600">${totalMonthlyCost.toLocaleString()}</div>
          <div className="text-sm text-gray-500">CLP/mes si contratas todo</div>
        </div>
      </div>

      {/* Critical Recommendations */}
      {recommendations.filter(r => r.priority === 'CRÍTICO').length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-red-800 mb-4 flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2" />
            🚨 Seguros Críticos (Urgente)
          </h3>
          <div className="space-y-4">
            {recommendations.filter(r => r.priority === 'CRÍTICO').map((rec, index) => (
              <div key={rec.id} className="border-l-4 border-red-500 bg-red-50 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800 border border-red-200 flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" />
                        CRÍTICO
                      </span>
                      <span className="text-xs bg-red-200 text-red-700 px-2 py-1 rounded">
                        Urgencia: {rec.urgencyScore}/10
                      </span>
                    </div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-1">{rec.plan}</h4>
                    <p className="text-sm text-gray-600 mb-2">{rec.provider}</p>
                    <p className="text-gray-700 mb-3">{rec.mainCoverage}</p>
                    {rec.specialConditions && (
                      <p className="text-sm text-gray-600 mb-2">
                        <Info className="w-4 h-4 inline mr-1" />
                        {rec.specialConditions}
                      </p>
                    )}
                    <p className="text-sm text-red-700 font-medium">💡 {rec.reason}</p>
                  </div>
                  <div className="text-right ml-6">
                    <div className="text-2xl font-bold text-gray-900">${rec.cost.toLocaleString()}</div>
                    <div className="text-sm text-gray-500">CLP/mes</div>
                    {rec.maxCoverage && (
                      <div className="text-xs text-gray-400 mt-1">Hasta {rec.maxCoverage}</div>
                    )}
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <a 
                    href={rec.quoteLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1 bg-red-600 text-white px-4 py-3 rounded-lg hover:bg-red-700 transition-colors font-medium text-center"
                  >
                    🚨 Contratar Urgente
                  </a>
                  <button 
                    onClick={() => handleInsuranceAction(rec, 'have')}
                    className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    Ya lo tengo
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* High Priority Recommendations */}
      {recommendations.filter(r => r.priority === 'ALTO').length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-orange-800 mb-4 flex items-center">
            <Shield className="w-5 h-5 mr-2" />
            🟠 Alta Prioridad (Muy Recomendado)
          </h3>
          <div className="space-y-4">
            {recommendations.filter(r => r.priority === 'ALTO').map((rec, index) => (
              <div key={rec.id} className="border border-orange-200 bg-orange-50 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-orange-100 text-orange-800 border border-orange-200 flex items-center gap-1">
                        <Shield className="w-3 h-3" />
                        ALTO
                      </span>
                      {rec.urgencyScore && (
                        <span className="text-xs bg-orange-200 text-orange-700 px-2 py-1 rounded">
                          Urgencia: {rec.urgencyScore}/10
                        </span>
                      )}
                    </div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-1">{rec.plan}</h4>
                    <p className="text-sm text-gray-600 mb-2">{rec.provider}</p>
                    <p className="text-gray-700 mb-3">{rec.mainCoverage}</p>
                    {rec.specialConditions && (
                      <p className="text-sm text-gray-600 mb-2">
                        <Info className="w-4 h-4 inline mr-1" />
                        {rec.specialConditions}
                      </p>
                    )}
                    <p className="text-sm text-orange-700 font-medium">💡 {rec.reason}</p>
                  </div>
                  <div className="text-right ml-6">
                    <div className="text-2xl font-bold text-gray-900">${rec.cost.toLocaleString()}</div>
                    <div className="text-sm text-gray-500">CLP/mes</div>
                    {rec.maxCoverage && (
                      <div className="text-xs text-gray-400 mt-1">Hasta {rec.maxCoverage}</div>
                    )}
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <a 
                    href={rec.quoteLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1 bg-orange-600 text-white px-4 py-3 rounded-lg hover:bg-orange-700 transition-colors font-medium text-center"
                  >
                    Cotizar ahora
                  </a>
                  <button 
                    onClick={() => handleInsuranceAction(rec, 'have')}
                    className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    Ya lo tengo
                  </button>
                  <button className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    Comparar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Medium Priority Recommendations */}
      {recommendations.filter(r => r.priority === 'MEDIO').length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-yellow-800 mb-4 flex items-center">
            <Eye className="w-5 h-5 mr-2" />
            🟡 Prioridad Media (Recomendado)
          </h3>
          <div className="space-y-4">
            {recommendations.filter(r => r.priority === 'MEDIO').map((rec, index) => (
              <div key={rec.id} className="border border-yellow-200 bg-yellow-50 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800 border border-yellow-200">
                        MEDIO
                      </span>
                    </div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-1">{rec.plan}</h4>
                    <p className="text-sm text-gray-600 mb-2">{rec.provider}</p>
                    <p className="text-gray-700 mb-3">{rec.mainCoverage}</p>
                    {rec.specialConditions && (
                      <p className="text-sm text-gray-600 mb-2">
                        <Info className="w-4 h-4 inline mr-1" />
                        {rec.specialConditions}
                      </p>
                    )}
                    <p className="text-sm text-yellow-700 font-medium">💡 {rec.reason}</p>
                  </div>
                  <div className="text-right ml-6">
                    <div className="text-2xl font-bold text-gray-900">${rec.cost.toLocaleString()}</div>
                    <div className="text-sm text-gray-500">CLP/mes</div>
                    {rec.maxCoverage && (
                      <div className="text-xs text-gray-400 mt-1">Hasta {rec.maxCoverage}</div>
                    )}
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <a 
                    href={rec.quoteLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1 bg-yellow-600 text-white px-4 py-3 rounded-lg hover:bg-yellow-700 transition-colors font-medium text-center"
                  >
                    Ver opciones
                  </a>
                  <button 
                    onClick={() => handleInsuranceAction(rec, 'have')}
                    className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    Ya lo tengo
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="text-right mb-6">
        <button
          onClick={() => {
            console.log('=== DEBUG: Botón clickeado ===');
            console.log('responses:', responses);
            console.log('userPortfolio:', userPortfolio);
            console.log('insuranceDatabase:', insuranceDatabase);
            
            if (!responses) {
              console.error('ERROR: responses es undefined');
              alert('Error: No hay respuestas del cuestionario');
              return;
            }
            
            if (!insuranceDatabase) {
              console.error('ERROR: insuranceDatabase es undefined');
              alert('Error: No hay base de datos de seguros');
              return;
            }
            
            try {
              const newRecs = generateRecommendations(responses, insuranceDatabase, userPortfolio);
              console.log('newRecs generadas:', newRecs);
              
              if (newRecs.length === 0) {
                console.log('No se generaron recomendaciones - todas ya están en portfolio');
                alert('No hay nuevas recomendaciones disponibles. Es posible que ya tengas todos los seguros recomendados para tu perfil.');
              } else {
                setRecommendations(newRecs);
                console.log('Recomendaciones actualizadas exitosamente');
              }
            } catch (error) {
              console.error('ERROR en generateRecommendations:', error);
              alert('Error al generar recomendaciones: ' + error.message);
            }
          }}
          className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          🔄 Generar Nuevas Recomendaciones
        </button>
      </div>
      
      {/* Cost Simulator */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Calculator className="w-5 h-5 mr-2" />
          📈 Simulador de Costos
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <div className="text-xl font-bold text-red-600 mb-2">
              ${recommendations.filter(r => r.priority === 'CRÍTICO').reduce((sum, r) => sum + r.cost, 0).toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Solo críticos</div>
            <div className="text-xs text-gray-500 mt-1">Protección mínima esencial</div>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <div className="text-xl font-bold text-orange-600 mb-2">
              ${recommendations.filter(r => ['CRÍTICO', 'ALTO'].includes(r.priority)).reduce((sum, r) => sum + r.cost, 0).toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Críticos + Alta prioridad</div>
            <div className="text-xs text-gray-500 mt-1">Protección recomendada</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-xl font-bold text-blue-600 mb-2">
              ${totalMonthlyCost.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Protección completa</div>
            <div className="text-xs text-gray-500 mt-1">Cobertura total optimizada</div>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-2">💰 Análisis de Inversión</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <span className="font-medium">Costo anual total:</span> 
              <span className="ml-2">${(totalMonthlyCost * 12).toLocaleString()} CLP</span>
            </div>
            <div>
              <span className="font-medium">Promedio por categoría:</span> 
              <span className="ml-2">${Math.round(totalMonthlyCost / recommendations.length).toLocaleString()} CLP/mes</span>
            </div>
          </div>
        </div>
      </div>

      {/* Empty State */}
      {recommendations.length === 0 && (
        <div className="text-center py-12">
          <Shield className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">¡Excelente cobertura!</h3>
          <p className="text-gray-600">No encontramos gaps críticos en tu perfil de seguros actual.</p>
        </div>
      )}
    </div>
  );
};

export default Recommendations;