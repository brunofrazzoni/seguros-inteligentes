import React, { useState } from 'react';
import { ChevronRight, Home, Car, Heart, Briefcase, Plane } from 'lucide-react';
import { questionnaireData } from '../../data/insuranceDatabase';
import { fetchInsuranceData } from '../../data/insuranceDatabase';
import { generateProfile, generateAlerts, generateRecommendations } from '../../utils/riskAnalysis';

const Questionnaire = ({ 
  responses, 
  setResponses, 
  setRecommendations, 
  setUserProfile, 
  setAlerts, 
  setShowResults 
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const iconMap = {
    '🏡 Vivienda': Home,
    '🚗 Transporte': Car,
    '💼 Trabajo': Briefcase,
    '🐾 Mascotas': Heart,
    '✈️ Viajes': Plane,
    '🧬 Salud': Heart
  };

  const handleResponse = (questionId, value) => {
    setResponses(prev => ({ ...prev, [questionId]: value }));
  };

  const generateResults = () => {
    setLoading(true);

    fetchInsuranceData().then((insuranceDatabase) => {
      const profile = generateProfile(responses);
      const recommendations = generateRecommendations(responses, insuranceDatabase);
      const alerts = generateAlerts(responses, []);

      setUserProfile(profile);
      setRecommendations(recommendations);
      setAlerts(alerts);
      setLoading(false);
      setShowResults(true);
    });
  };

  const nextQuestion = () => {
    if (currentStep < questionnaireData.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      generateResults();
    }
  };

  const prevQuestion = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentQuestion = questionnaireData[currentStep];
  const progress = ((currentStep + 1) / questionnaireData.length) * 100;
  const IconComponent = iconMap[currentQuestion.title] || Home;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center max-w-md">
          <div className="animate-spin w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-6"></div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-3">Analizando tu perfil</h3>
          <p className="text-gray-600 mb-4">Aplicando lógica de underwriting reverso...</p>
          <div className="text-sm text-gray-500 space-y-2">
            <div>✓ Evaluando factores de riesgo</div>
            <div>✓ Identificando gaps de cobertura</div>
            <div>✓ Generando recomendaciones personalizadas</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Descubre tus seguros ideales</h1>
          <p className="text-gray-600 mb-4">Responde estas preguntas para recibir recomendaciones personalizadas basadas en IA</p>
          
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="text-sm text-gray-500 mt-2">
            Pregunta {currentStep + 1} de {questionnaireData.length}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <IconComponent className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-800">{currentQuestion.title}</h2>
              <p className="text-gray-600">{currentQuestion.question}</p>
            </div>
          </div>

          <div className="space-y-3 mb-6">
            {currentQuestion.options.map(option => {
              const isCheckbox = currentQuestion.type === 'checkbox';
              const selected = responses[currentQuestion.id] || (isCheckbox ? [] : '');
              const isSelected = isCheckbox
                ? selected.includes(option.value)
                : selected === option.value;

              const toggleCheckbox = () => {
                let updated = [...selected];
                if (option.value === 'ninguna') {
                  updated = ['ninguna'];
                } else {
                  updated = updated.filter(v => v !== 'ninguna'); // remove "ninguna" if any other is selected
                  if (updated.includes(option.value)) {
                    updated = updated.filter(v => v !== option.value);
                  } else {
                    updated.push(option.value);
                  }
                }
                handleResponse(currentQuestion.id, updated);
              };

              return (
                <button
                  key={option.value}
                  onClick={() => {
                    if (isCheckbox) {
                      toggleCheckbox();
                    } else {
                      handleResponse(currentQuestion.id, option.value);
                    }
                  }}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all hover:border-blue-300 ${
                    isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
            {currentQuestion.id === 'health' && responses['health']?.includes('otros') && (
              <div className="mt-4">
                <label htmlFor="health_otros" className="block text-sm font-medium text-gray-700 mb-1">
                  Especifica tu condición de salud:
                </label>
                <input
                  type="text"
                  id="health_otros"
                  value={responses['health_otros'] || ''}
                  onChange={(e) => handleResponse('health_otros', e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ej: asma, tiroides, etc."
                />
              </div>
            )}
          </div>

          <div className="flex justify-between">
            <button
              onClick={prevQuestion}
              disabled={currentStep === 0}
              className="px-6 py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              Anterior
            </button>
            <button
              onClick={nextQuestion}
              disabled={!responses[currentQuestion.id]}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {currentStep === questionnaireData.length - 1 ? 'Generar Recomendaciones' : 'Siguiente'}
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Questionnaire;