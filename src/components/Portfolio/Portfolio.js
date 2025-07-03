
import React from 'react';
import { Shield, Plus, Check, Clock, Trash2, TrendingUp, DollarSign, Calendar, Search } from 'lucide-react';

const Portfolio = ({ userPortfolio, setUserPortfolio, userProfile, setUserProfile }) => {
  const removeFromPortfolio = (insuranceId) => {
    setUserPortfolio(prev => prev.filter(ins => ins.id !== insuranceId));
    if (userProfile) {
      setUserProfile(prev => ({
        ...prev,
        currentCoverage: Math.max(0, prev.currentCoverage - 1)
      }));
    }
  };

  const handleAddInsurance = () => {
    alert('Funcionalidad para agregar seguros manualmente próximamente disponible');
  };

  const handleFindBetterPrice = (insurance) => {
    alert(`Buscando mejores precios para ${insurance.plan}...`);
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'CRÍTICO': return 'bg-red-100 text-red-800 border-red-200';
      case 'ALTO': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'MEDIO': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const portfolioCost = userPortfolio.reduce((total, ins) => total + ins.cost, 0);
  const getProtectionPercentage = () => {
    if (!userProfile) return 0;
    return Math.round((userProfile.currentCoverage / userProfile.coverageNeeds) * 100);
  };

  // Mostrar insights personalizados
  const insightsIA = userProfile?.insightsIA || [];

  return (
    <div>
      {insightsIA.length > 0 && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded">
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">🔍 Insights de Optimización</h3>
          <ul className="list-disc pl-5 text-yellow-700 space-y-1">
            {insightsIA.map((insight, index) => (
              <li key={index}>{insight}</li>
            ))}
          </ul>
        </div>
      )}
      <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">💼 Mi Cartera de Seguros</h2>
          <p className="text-gray-600">Repositorio personal de seguros contratados y marcados</p>
        </div>
        <button 
          onClick={handleAddInsurance}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Agregar seguro</span>
        </button>
      </div>

      {userPortfolio.length > 0 ? (
        <div className="space-y-6">
          {/* Portfolio Summary */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">📊 Resumen de tu Cartera</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Shield className="w-8 h-8 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-green-600 mb-1">{userPortfolio.length}</div>
                <div className="text-sm text-gray-600">Seguros activos</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <DollarSign className="w-8 h-8 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-blue-600 mb-1">${portfolioCost.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Costo total/mes</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Calendar className="w-8 h-8 text-purple-600" />
                </div>
                <div className="text-2xl font-bold text-purple-600 mb-1">${(portfolioCost * 12).toLocaleString()}</div>
                <div className="text-sm text-gray-600">Costo anual</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <TrendingUp className="w-8 h-8 text-orange-600" />
                </div>
                <div className="text-2xl font-bold text-orange-600 mb-1">{getProtectionPercentage()}%</div>
                <div className="text-sm text-gray-600">Cobertura</div>
              </div>
            </div>
          </div>

          {/* Cost Analysis */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">💰 Análisis de Costos</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">Gasto mensual promedio</div>
                <div className="text-xl font-bold text-blue-600">
                  ${Math.round(portfolioCost / userPortfolio.length).toLocaleString()}
                </div>
                <div className="text-xs text-gray-500">por seguro</div>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">Ahorro potencial anual</div>
                <div className="text-xl font-bold text-green-600">
                  ${(portfolioCost * 12 * 0.15).toLocaleString()}
                </div>
                <div className="text-xs text-gray-500">optimizando precios</div>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">Última revisión</div>
                <div className="text-xl font-bold text-purple-600">
                  {userProfile?.lastUpdate || 'Hoy'}
                </div>
                <div className="text-xs text-gray-500">fecha de actualización</div>
              </div>
            </div>
          </div>

          {/* Insurance Cards */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">🛡️ Tus Seguros Activos</h3>
              <div className="flex items-center space-x-2">
                <Search className="w-4 h-4 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Buscar seguros..." 
                  className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
                />
              </div>
            </div>
            
            {userPortfolio.map(insurance => (
              <div key={insurance.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(insurance.priority)}`}>
                        {insurance.priority}
                      </span>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Agregado: {insurance.addedDate}
                      </span>
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                        {insurance.category}
                      </span>
                    </div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-1">{insurance.plan}</h4>
                    <p className="text-sm text-gray-600 mb-2">{insurance.provider}</p>
                    <p className="text-gray-700 mb-2">{insurance.mainCoverage}</p>
                    {insurance.specialConditions && (
                      <p className="text-sm text-gray-500 mb-2">
                        📋 {insurance.specialConditions}
                      </p>
                    )}
                  </div>
                  <div className="text-right ml-6">
                    <div className="text-2xl font-bold text-green-600">${insurance.cost.toLocaleString()}</div>
                    <div className="text-sm text-gray-500">CLP/mes</div>
                    {insurance.maxCoverage && (
                      <div className="text-xs text-gray-400 mt-1">Hasta {insurance.maxCoverage}</div>
                    )}
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="flex-1 bg-green-100 text-green-800 px-4 py-2 rounded-lg font-medium text-center">
                    <Check className="w-4 h-4 inline mr-2" />
                    Activo en tu cartera
                  </div>
                  <button 
                    onClick={() => handleFindBetterPrice(insurance)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Buscar mejor precio
                  </button>
                  <button 
                    onClick={() => removeFromPortfolio(insurance.id)}
                    className="px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-colors flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Remover
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Recommendations for Optimization */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">💡 Oportunidades de Optimización</h3>
            <div className="space-y-3">
              <div className="p-4 bg-white bg-opacity-80 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">Revisión anual programada</h4>
                    <p className="text-sm text-gray-600">Te recordaremos revisar tus seguros para encontrar mejores ofertas</p>
                  </div>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
                    Configurar
                  </button>
                </div>
              </div>
              <div className="p-4 bg-white bg-opacity-80 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">Bundle de seguros</h4>
                    <p className="text-sm text-gray-600">Podrías ahorrar hasta $8.500/mes agrupando seguros con una sola aseguradora</p>
                  </div>
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700">
                    Explorar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <Shield className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Tu cartera está vacía</h3>
          <p className="text-gray-600 mb-6">
            Marca los seguros que ya tienes desde las recomendaciones o agrégalos manualmente.
          </p>
        <div className="flex justify-center gap-4">
            <button 
              onClick={() => window.location.reload()} 
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Ver recomendaciones
            </button>
            <button 
              onClick={handleAddInsurance}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Agregar manualmente
            </button>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default Portfolio;