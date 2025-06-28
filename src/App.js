import React, { useState } from 'react';
import Questionnaire from './components/Questionnaire/Questionnaire';
import Dashboard from './components/Dashboard/Dashboard';
import Profile from './components/Profile/Profile';
import Recommendations from './components/Recommendations/Recommendations';
import Portfolio from './components/Portfolio/Portfolio';
import Integrations from './components/Integrations/Integrations';
import { Shield, Bell, Settings, BarChart3, Users, Target, CreditCard } from 'lucide-react';

const App = () => {
  const [showResults, setShowResults] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [responses, setResponses] = useState({});
  const [recommendations, setRecommendations] = useState([]);
  const [userPortfolio, setUserPortfolio] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const [alerts, setAlerts] = useState([]);

  if (!showResults) {
    return (
      <Questionnaire
        responses={responses}
        setResponses={setResponses}
        setRecommendations={setRecommendations}
        setUserProfile={setUserProfile}
        setAlerts={setAlerts}
        setShowResults={setShowResults}
      />
    );
  }

  return (
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
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Settings className="w-5 h-5" />
              </button>
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
                  onClick={() => setActiveTab(tab.id)}
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
              />
            )}
            {activeTab === 'profile' && (
              <Profile
                userProfile={userProfile}
                responses={responses}
                setUserProfile={setUserProfile}
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
  );
};

export default App;