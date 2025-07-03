import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { analyzeUserProfile } from '../../utils/aiAgent';
import config from '../../config';
import { AlertTriangle, DollarSign, TrendingUp, Brain, Check, Shield, BarChart3 } from 'lucide-react';

const Dashboard = ({ userProfile, recommendations, userPortfolio, alerts, responses }) => {
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [analysisLoading, setAnalysisLoading] = useState(false);

  const hasRunAnalysis = useRef(false);

  const runAIAnalysis = async () => {
    setAnalysisLoading(true);
    let availableInsurance = [];
    try {
      availableInsurance = await fetch(`${config.BACKEND_URL}/api/insurance-database`).then(res => res.json());
    } catch (err) {
      console.error('Error al cargar la base de datos de seguros:', err);
      availableInsurance = [];
    }

    const analysisInput = {
      userProfile,
      currentPortfolio: userPortfolio,
      profileChanges: {}, // A futuro: detectar diferencias contra el perfil anterior
      availableInsurance
    };

    try {
      const analysis = await analyzeUserProfile(analysisInput);
      setAiAnalysis(analysis);
    } catch (error) {
      console.error('Error al obtener análisis IA:', error);
    } finally {
      setAnalysisLoading(false);
    }
  };

  useEffect(() => {
    if (
      userProfile &&
      typeof userProfile === 'object' &&
      userPortfolio &&
      Array.isArray(userPortfolio)
    ) {
      if (!aiAnalysis) {
        hasRunAnalysis.current = false;
      }
    }
  }, [userProfile, userPortfolio, aiAnalysis]);

  useEffect(() => {
    if (
      userProfile &&
      typeof userProfile === 'object' &&
      userPortfolio &&
      Array.isArray(userPortfolio) &&
      !aiAnalysis &&
      !hasRunAnalysis.current
    ) {
      hasRunAnalysis.current = true;
      runAIAnalysis();
    }
  }, [userProfile, userPortfolio, aiAnalysis]);
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

      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6">
        {analysisLoading && (
          <div className="bg-white border border-gray-300 rounded-xl p-6 text-center text-gray-500 italic">
            Generando recomendaciones con IA...<br />
            <span className="text-xs text-gray-400">(esto puede tomar ~10-15 segundos)</span>
          </div>
        )}

        {!analysisLoading && !aiAnalysis && (
          <div className="text-center">
            <button 
              onClick={runAIAnalysis}
              className="px-4 py-2 bg-purple-600 text-white rounded text-sm hover:bg-purple-700"
            >
              🚀 Generar recomendaciones con IA
            </button>
          </div>
        )}

        {!analysisLoading && aiAnalysis && (
          <>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">🤖 Análisis IA en Tiempo Real</h3>
              <button 
                onClick={runAIAnalysis}
                disabled={analysisLoading}
                className="px-3 py-1 bg-purple-600 text-white rounded text-sm hover:bg-purple-700"
              >
                {analysisLoading ? '🔄 Analizando...' : '🔄 Re-analizar'}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div className="text-center p-3 bg-white bg-opacity-80 rounded-lg">
                <div className="text-xl font-bold text-purple-600">{aiAnalysis.analysis.portfolioScore}/10</div>
                <div className="text-xs text-gray-600">Score Portfolio</div>
              </div>
              <div className="text-center p-3 bg-white bg-opacity-80 rounded-lg">
                <div className="text-xl font-bold text-green-600">${aiAnalysis.analysis.monthlySavings.toLocaleString()}</div>
                <div className="text-xs text-gray-600">Ahorro potencial/mes</div>
              </div>
              <div className="text-center p-3 bg-white bg-opacity-80 rounded-lg">
                <div className="text-xl font-bold text-orange-600">{aiAnalysis.analysis.coverageGaps.length}</div>
                <div className="text-xs text-gray-600">Gaps detectados</div>
              </div>
              <div className="text-center p-3 bg-white bg-opacity-80 rounded-lg">
                <div className="text-xl font-bold text-blue-600">{aiAnalysis.recommendations.length}</div>
                <div className="text-xs text-gray-600">Optimizaciones IA</div>
              </div>
            </div>

            {aiAnalysis.recommendations.length > 0 && (
              <div className="p-4 bg-white bg-opacity-90 rounded-lg border-l-4 border-purple-400">
                <h4 className="font-medium text-purple-900 mb-2">💡 Recomendación Principal IA</h4>
                <p className="text-sm text-gray-800 mb-2">
                  {aiAnalysis.recommendations
                    .filter(r => r.priority === 'CRÍTICO')
                    .sort((a, b) => b.urgencyScore - a.urgencyScore)[0]?.action}
                </p>
                <p className="text-xs text-purple-700">
                  {aiAnalysis.recommendations
                    .filter(r => r.priority === 'CRÍTICO')
                    .sort((a, b) => b.urgencyScore - a.urgencyScore)[0]?.reasoning}
                </p>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                    {aiAnalysis.recommendations
                      .filter(r => r.priority === 'CRÍTICO')
                      .sort((a, b) => b.urgencyScore - a.urgencyScore)[0]?.priority}
                  </span>
                  <button className="px-3 py-1 bg-purple-600 text-white rounded text-xs hover:bg-purple-700">
                    Ver detalles
                  </button>
                </div>
              </div>
            )}

            {(responses.occupation || responses.transport || responses.pets) && (
              <div className="bg-white border border-gray-200 rounded-xl p-6 mt-4">
                <h4 className="font-semibold text-gray-900 mb-3">💡 Recomendaciones según tu perfil</h4>
                <div className="space-y-3 text-sm text-gray-800">
                  {responses.occupation && (
                    <p>Como {responses.occupation === 'freelance' ? 'freelancer' : responses.occupation}, te recomendamos priorizar seguro de salud y RC profesional para proteger tus ingresos.</p>
                  )}
                  {responses.transport === 'auto' && (
                    <p>💡 Dato: El 89% de conductores en Chile solo tiene SOAP. Considera un seguro automotriz completo para mayor protección.</p>
                  )}
                  {responses.pets !== 'ninguna' && (
                    <p>🐾 Con mascotas, los gastos veterinarios pueden superar los $500.000 anuales. Un seguro de mascotas puede ahorrarte hasta 70% en emergencias.</p>
                  )}
                </div>
              </div>
            )}

            {/* Gaps de cobertura y alertas IA */}
            {aiAnalysis.analysis.coverageGaps.length > 0 && (
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-6 rounded-lg">
                <h4 className="text-yellow-900 font-semibold mb-2">🔍 Gaps de Cobertura Detectados</h4>
                <ul className="list-disc list-inside text-sm text-yellow-800 space-y-1">
                  {aiAnalysis.analysis.coverageGaps.map((gap, index) => (
                    <li key={index}>{gap}</li>
                  ))}
                </ul>
              </div>
            )}

            {aiAnalysis.alerts && aiAnalysis.alerts.length > 0 && (
              <div className="bg-orange-50 border-l-4 border-orange-400 p-4 mt-6 rounded-lg">
                <h4 className="text-orange-900 font-semibold mb-2">🚨 Alertas Inteligencia Artificial</h4>
                <ul className="space-y-2 text-sm text-orange-800">
                  {aiAnalysis.alerts.map((alert, index) => (
                    <li key={index}>
                      <div className="font-medium">{alert.title}</div>
                      <div className="text-xs opacity-80">{alert.description}</div>
                      <div className="text-xs italic mt-1 text-orange-600">➡ {alert.action}</div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;