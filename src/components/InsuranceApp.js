import React, { useState } from 'react';
import { ChevronRight, Home, Car, Heart, Briefcase, Plane, Shield, AlertTriangle, Check, TrendingUp, Users, Star, Settings, Bell, Calculator, Eye, Brain, Target, FileText, CreditCard, MapPin, Clock, DollarSign, BarChart3, Zap, Info, Edit, Plus, Trash2 } from 'lucide-react';

const InsuranceApp = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState({});
  const [recommendations, setRecommendations] = useState([]);
  const [userPortfolio, setUserPortfolio] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [userProfile, setUserProfile] = useState(null);
  const [alerts, setAlerts] = useState([]);

  // Base de datos de seguros chilenos
  const insuranceDatabase = [
    { id: 1, provider: "BCI Seguros", type: "SOAP", plan: "SOAP Auto Particular", cost: 5950, coverage: "Muerte, incapacidad total o parcial, gastos médicos", maxCoverage: "UF 300", category: "auto", priority: "CRÍTICO" },
    { id: 2, provider: "Seguros Falabella", type: "Seguro de Mascotas", plan: "Mascota Premium", cost: 11510, coverage: "Consultas veterinarias, emergencias, traslado", maxCoverage: "UF 300 anual", category: "mascotas", priority: "MEDIO" },
    { id: 3, provider: "SURA", type: "Seguro de Viaje", plan: "Viaje Internacional Total", cost: 15000, coverage: "Emergencias médicas, pérdida de equipaje, repatriación", maxCoverage: "USD 30,000", category: "viaje", priority: "ALTO" },
    { id: 4, provider: "HDI Seguros", type: "Seguro de Hogar", plan: "Hogar Básico", cost: 32522, coverage: "Incendio, robo, responsabilidad civil", maxCoverage: "UF 2,000", category: "hogar", priority: "ALTO" },
    { id: 5, provider: "HDI Seguros", type: "Seguro Oncológico", plan: "Oncológico Plus", cost: 47839, coverage: "Diagnóstico, tratamiento, quimioterapia", maxCoverage: "UF 1,000", category: "salud", priority: "CRÍTICO" },
    { id: 6, provider: "Mapfre", type: "Seguro de Salud", plan: "Salud Complementaria Plus", cost: 55000, coverage: "Complemento a isapre, consultas privadas", maxCoverage: "UF 100 anual", category: "salud", priority: "CRÍTICO" },
    { id: 7, provider: "Liberty", type: "Seguro de Responsabilidad Civil", plan: "RC Profesional", cost: 28000, coverage: "Errores y omisiones profesionales", maxCoverage: "UF 500", category: "trabajo", priority: "ALTO" },
    { id: 8, provider: "Banco de Chile", type: "Seguro de Cesantía", plan: "Cesantía Independiente", cost: 18000, coverage: "Renta mensual por desempleo", maxCoverage: "6 meses", category: "trabajo", priority: "ALTO" }
  ];

  const questions = [
    {
      id: 'housing',
      title: '🏡 Vivienda',
      question: '¿Cuál es tu situación de vivienda?',
      icon: Home,
      options: [
        { value: 'casa_propia', label: 'Casa propia' },
        { value: 'depto_propio', label: 'Departamento propio' },
        { value: 'casa_arriendo', label: 'Casa en arriendo' },
        { value: 'depto_arriendo', label: 'Departamento en arriendo' },
        { value: 'compartida', label: 'Residencia compartida' }
      ]
    },
    {
      id: 'transport',
      title: '🚗 Transporte',
      question: '¿Cómo te transportas habitualmente?',
      icon: Car,
      options: [
        { value: 'auto', label: 'Auto propio' },
        { value: 'bicicleta', label: 'Bicicleta' },
        { value: 'transporte_publico', label: 'Transporte público' },
        { value: 'moto', label: 'Moto' },
        { value: 'caminando', label: 'Caminando' }
      ]
    },
    {
      id: 'occupation',
      title: '💼 Trabajo',
      question: '¿Cuál es tu situación laboral?',
      icon: Briefcase,
      options: [
        { value: 'dependiente', label: 'Empleado dependiente' },
        { value: 'freelance', label: 'Freelancer' },
        { value: 'emprendedor', label: 'Emprendedor' },
        { value: 'cesante', label: 'Cesante' },
        { value: 'estudiante', label: 'Estudiante' }
      ]
    },
    {
      id: 'pets',
      title: '🐾 Mascotas',
      question: '¿Tienes mascotas?',
      icon: Heart,
      options: [
        { value: 'perro', label: 'Tengo perro' },
        { value: 'gato', label: 'Tengo gato' },
        { value: 'ambos', label: 'Tengo perro y gato' },
        { value: 'ninguna', label: 'No tengo mascotas' }
      ]
    },
    {
      id: 'travel',
      title: '✈️ Viajes',
      question: '¿Viajas al extranjero?',
      icon: Plane,
      options: [
        { value: 'frecuente', label: 'Más de 2 veces al año' },
        { value: 'ocasional', label: '1-2 veces al año' },
        { value: 'raro', label: 'Muy rara vez' },
        { value: 'nunca', label: 'No viajo' }
      ]
    },
    {
      id: 'health',
      title: '🧬 Salud',
      question: '¿Tienes condiciones de salud preexistentes?',
      icon: Heart,
      options: [
        { value: 'ninguna', label: 'Ninguna condición especial' },
        { value: 'hipertension', label: 'Hipertensión' },
        { value: 'diabetes', label: 'Diabetes' },
        { value: 'cancer_historial', label: 'Historial oncológico' }
      ]
    }
  ];

  // Resto de las funciones las agrego en el siguiente mensaje para evitar que se corte...

  const handleResponse = (questionId, value) => {
    setResponses(prev => ({ ...prev, [questionId]: value }));
  };

  const nextQuestion = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      generateRecommendations();
    }
  };

  const prevQuestion = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const generateRecommendations = () => {
    setLoading(true);
    
    setTimeout(() => {
      // Lógica simplificada por ahora
      const recs = [];
      
      if (responses.transport === 'auto') {
        recs.push({
          ...insuranceDatabase[0],
          reason: "Obligatorio por ley para conductores",
          urgencyScore: 10
        });
      }
      
      setRecommendations(recs);
      setUserProfile({
        lifestyle: "Profesional Urbano",
        riskScore: 6.5,
        tags: ["Conductor"],
        coverageNeeds: 7,
        currentCoverage: 0,
        lastUpdate: new Date().toLocaleDateString()
      });
      setAlerts([]);
      setLoading(false);
      setShowResults(true);
    }, 2000);
  };

  // Componente del cuestionario (por ahora simplificado)
  if (!showResults) {
    const currentQuestion = questions[currentStep];
    const progress = ((currentStep + 1) / questions.length) * 100;

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Descubre tus seguros ideales</h1>
            <p className="text-gray-600 mb-4">Responde estas preguntas para recibir recomendaciones personalizadas</p>
            
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="text-sm text-gray-500 mt-2">
              Pregunta {currentStep + 1} de {questions.length}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <currentQuestion.icon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800">{currentQuestion.title}</h2>
                <p className="text-gray-600">{currentQuestion.question}</p>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              {currentQuestion.options.map(option => (
                <button
                  key={option.value}
                  onClick={() => handleResponse(currentQuestion.id, option.value)}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all hover:border-blue-300 ${
                    responses[currentQuestion.id] === option.value 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {option.label}
                </button>
              ))}
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
                {currentStep === questions.length - 1 ? 'Ver Recomendaciones' : 'Siguiente'}
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="animate-spin w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-6"></div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-3">Analizando tu perfil</h3>
          <p className="text-gray-600">Generando recomendaciones personalizadas...</p>
        </div>
      </div>
    );
  }

  // Placeholder para results (lo completamos después)
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Dashboard de Seguros</h1>
          <p className="text-gray-600">Funcionalidad completa coming soon...</p>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-900">Respuestas del cuestionario:</h3>
            <pre className="text-sm text-blue-800 mt-2">
              {JSON.stringify(responses, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsuranceApp;
