import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import Questionnaire from './components/Questionnaire/Questionnaire';
import Dashboard from './components/Dashboard/Dashboard';
import Profile from './components/Profile/Profile';
import Recommendations from './components/Recommendations/Recommendations';
import Portfolio from './components/Portfolio/Portfolio';
import Integrations from './components/Integrations/Integrations';
import { Shield, Bell, Settings, BarChart3, Users, Target, CreditCard } from 'lucide-react';
import { fetchInsuranceData } from './data/insuranceDatabase';
import { generateRecommendations } from './utils/riskAnalysis';
import { GlobalProvider } from './context/globalContext';
import config from './config';

const App = () => {
  const [loggedInEmail, setLoggedInEmail] = useState(
    localStorage.getItem('loggedUserEmail') || sessionStorage.getItem('loggedUserEmail')
  );
  const [showResults, setShowResults] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [responses, setResponses] = useState({});
  const [recommendations, setRecommendations] = useState([]);
  const [userPortfolio, setUserPortfolio] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [insuranceDatabase, setInsuranceDatabase] = useState([]);

  const [analysisIA, setAnalysisIA] = useState(null);
  const [recommendationsIA, setRecommendationsIA] = useState([]);
  const [alertsIA, setAlertsIA] = useState([]);
  const [insightsIA, setInsightsIA] = useState([]);

  useEffect(() => {
    fetchInsuranceData()
      .then((data) => {
        setInsuranceDatabase(data);
      })
      .catch((error) => {
        console.error("Error al cargar los datos de seguros:", error);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('loggedUserEmail');
    sessionStorage.removeItem('loggedUserEmail');
    setLoggedInEmail(null);
  };

  if (!loggedInEmail) {
    return (
      <BrowserRouter>
        <Login setLoggedInEmail={(email, rememberMe) => {
          if (rememberMe) {
            localStorage.setItem('loggedUserEmail', email);
          } else {
            sessionStorage.setItem('loggedUserEmail', email);
          }
          setLoggedInEmail(email);
        }} />
      </BrowserRouter>
    );
  }

  if (!showResults) {
    return (
      <Questionnaire
        responses={responses}
        setResponses={setResponses}
        setRecommendations={setRecommendations}
        setUserProfile={setUserProfile}
        setAlerts={setAlerts}
        setShowResults={(value) => {
          setShowResults(value);
          if (value) setActiveTab('recommendations');
        }}
      />
    );
  }

  return (
    <BrowserRouter>
      <GlobalProvider>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* Navigation Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <Shield className="w-8 h-8 text-blue-600 mr-2" />
                  <span className="text-xl font-bold text-gray-900">MiSeguro.ai</span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <Bell className="w-5 h-5" />
                </button>
                <div className="relative group">
                  <button className="p-2 text-gray-400 hover:text-gray-600 focus:outline-none">
                    <Settings className="w-5 h-5" />
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                    <ul className="py-1 text-sm text-gray-700">
                      <li>
                        <button className="w-full text-left px-4 py-2 hover:bg-gray-100">Modificar información personal</button>
                      </li>
                      <li>
                        <button className="w-full text-left px-4 py-2 hover:bg-gray-100">Cambiar clave</button>
                      </li>
                      <li>
                        <button className="w-full text-left px-4 py-2 hover:bg-gray-100">Ayuda</button>
                      </li>
                      <li>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
                        >
                          Cerrar sesión
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Main Tabs */}
          <div className="bg-white rounded-xl shadow-lg mb-6">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {[
                  { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
                  { id: 'profile', label: 'Mi Perfil', icon: Users },
                  { id: 'recommendations', label: 'Recomendaciones', icon: Target },
                  { id: 'portfolio', label: 'Mis Seguros', icon: Shield },
                  { id: 'integrations', label: 'Integraciones', icon: CreditCard }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      console.log(`=== TAB SELECCIONADO: ${tab.id.toUpperCase()} ===`);
                      setActiveTab(tab.id);
                    }}
                    className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === 'dashboard' && (
                <Dashboard
                  userProfile={userProfile}
                  recommendations={recommendations}
                  userPortfolio={userPortfolio}
                  alerts={alerts}
                  responses={responses}
                  analysisIA={analysisIA}
                  alertsIA={alertsIA}
                  insightsIA={insightsIA}
                  recommendationsIA={recommendationsIA}
                />
              )}
              {activeTab === 'profile' && (
                <Profile
                  userProfile={userProfile}
                  responses={responses}
                  setUserProfile={setUserProfile}
                  setResponses={setResponses}
                />
              )}
              {activeTab === 'recommendations' && (
                <Recommendations
                  recommendations={recommendations}
                  userPortfolio={userPortfolio}
                  setUserPortfolio={setUserPortfolio}
                  setRecommendations={setRecommendations}
                  userProfile={userProfile}
                  setUserProfile={setUserProfile}
                  generateRecommendations={generateRecommendations}
                  responses={responses}
                  insuranceDatabase={insuranceDatabase}
                  recommendationsIA={recommendationsIA}
                  setRecommendationsIA={setRecommendationsIA}
                  analysisIA={analysisIA}
                  alertsIA={alertsIA}
                  insightsIA={insightsIA}
                  apiBaseUrl={config.apiBaseUrl}
                />
              )}
              {activeTab === 'portfolio' && (
                <Portfolio
                  userPortfolio={userPortfolio}
                  setUserPortfolio={setUserPortfolio}
                  userProfile={userProfile}
                  setUserProfile={setUserProfile}
                />
              )}
              {activeTab === 'integrations' && (
                <Integrations />
              )}
            </div>
          </div>
        </div>
        </div>
      </GlobalProvider>
    </BrowserRouter>
  );
};

export default App;