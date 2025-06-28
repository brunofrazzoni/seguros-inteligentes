import React from 'react';
import { AlertTriangle, DollarSign, TrendingUp, Brain, Check, Shield, BarChart3 } from 'lucide-react';

const Dashboard = ({ userProfile, recommendations, userPortfolio, alerts, responses }) => {
  const getProtectionLevel = () => {
    if (!userProfile) return { level: 'Bajo', color: 'red', percentage: 0 };
    
    const percentage = Math.round((userProfile.currentCoverage / userProfile.coverageNeeds) * 100);
    
    if (percentage >= 80) return { level: 'Excelente', color: 'green', percentage };
    if (percentage >= 60) return { level: 'Bueno', color: 'blue', percentage };
    if (percentage >= 40) return { level: 'Regular', color: 'yellow', percentage };
    return { level: 'Bajo', color: 'red', percentage };
  };

  const getAlertColor = (priority) => {
    switch(priority) {
      case 'critical': return 'bg-red-50 border-red-200 text-red-800';
      case 'high': return 'bg-orange-50 border-orange-200 text-orange-800';
      case 'medium': return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      default: return 'bg-blue-50 border-blue-200 text-blue-800';
    }
  };

  const protectionLevel = getProtectionLevel();
  const portfolioCost = userPortfolio.reduce((total, ins) => total + ins.cost, 0);

  return (
    <div className="space-y-6">
      {/* Protection Status */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Estado de Protección</h2>
            <p className="text-gray-600">Última actualización: {userProfile?.lastUpdate}</p>
          </div>
          <div className="text-right">
            <div className={`text-3xl font-bold ${
              protectionLevel.color === 'green' ? 'text-green-600' : 
              protectionLevel.color === 'blue' ? 'text-blue-600' : 
              protectionLevel.color === 'yellow' ? 'text-yellow-600' : 'text-red-600'
            }`}>
              {protectionLevel.percentage}%
            </div>
            <div className="text-sm text-gray-500">{protectionLevel.level}</div>
          </div>
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
          <span>{userProfile?.currentCoverage} de {userProfile?.coverageNeeds} necesidades cubiertas</span>
          <span>{userProfile?.lifestyle}</span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className={`h-3 rounded-full ${
              protectionLevel.color === 'green' ? 'bg-green-500' : 
              protectionLevel.color === 'blue' ? 'bg-blue-500' : 
              protectionLevel.color === 'yellow' ? 'bg-yellow-500' : 'bg-red-500'
            }`}
            style={{ width: `${protectionLevel.percentage}%` }}
          ></div>
        </div>
      </div>

      {/* Alerts */}
      {alerts.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">⚠️ Alertas y Oportunidades</h3>
          <div className="space-y-3">
            {alerts.map(alert => (
              <div key={alert.id} className={`p-4 rounded-lg border ${getAlertColor(alert.priority)}`}>
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium mb-1">{alert.title}</h4>
                    <p className="text-sm opacity-80">{alert.description}</p>
                  </div>
                  <button className="ml-4 px-4 py-2 bg-white bg-opacity-80 rounded-lg text-sm font-medium hover:bg-opacity-100 transition-colors">
                    {alert.action}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center">
            <AlertTriangle className="w-8 h-8 text-red-600 mr-3" />
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {recommendations.filter(r => r.priority === 'CRÍTICO').length}
              </div>
              <div className="text-sm text-gray-500">Críticos</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center">
            <DollarSign className="w-8 h-8 text-green-600 mr-3" />
            <div>
              <div className="text-2xl font-bold text-gray-900">${portfolioCost.toLocaleString()}</div>
              <div className="text-sm text-gray-500">Gasto actual/mes</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center">
            <TrendingUp className="w-8 h-8 text-blue-600 mr-3" />
            <div>
              <div className="text-2xl font-bold text-gray-900">{userProfile?.riskScore}/10</div>
              <div className="text-sm text-gray-500">Score de riesgo</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center">
            <Brain className="w-8 h-8 text-purple-600 mr-3" />
            <div>
              <div className="text-2xl font-bold text-gray-900">{recommendations.length}</div>
              <div className="text-sm text-gray-500">Recomendaciones IA</div>
            </div>
          </div>
        </div>
      </div>

      {/* IA Tips */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">🧠 Tips IA Personalizados</h3>
        <div className="space-y-3">
          <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
            <p className="text-gray-800">
              Como {responses.occupation === 'freelance' ? 'freelancer' : responses.occupation}, 
              te recomendamos priorizar seguro de salud y RC profesional para proteger tus ingresos.
            </p>
          </div>
          {responses.transport === 'auto' && (
            <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-400">
              <p className="text-gray-800">
                💡 Dato: El 89% de conductores en Chile solo tiene SOAP. 
                Considera un seguro automotriz completo para mayor protección.
              </p>
            </div>
          )}
          {responses.pets !== 'ninguna' && (
            <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-400">
              <p className="text-gray-800">
                🐾 Con mascotas, los gastos veterinarios pueden superar los $500.000 anuales. 
                Un seguro de mascotas puede ahorrarte hasta 70% en emergencias.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;