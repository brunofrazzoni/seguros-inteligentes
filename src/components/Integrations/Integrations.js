import React, { useState } from 'react';
import { CreditCard, Heart, Briefcase, Zap, Check, Settings, Plus, AlertTriangle } from 'lucide-react';

const Integrations = () => {
  const [connectedServices, setConnectedServices] = useState(['falabella']);

  const handleConnect = (serviceId) => {
    if (connectedServices.includes(serviceId)) {
      setConnectedServices(prev => prev.filter(id => id !== serviceId));
    } else {
      setConnectedServices(prev => [...prev, serviceId]);
      // Simular proceso de conexión
      setTimeout(() => {
        alert(`¡Conectado exitosamente con ${serviceId}!`);
      }, 1000);
    }
  };

  const bankingServices = [
    { 
      id: 'bci', 
      name: 'BCI', 
      description: 'Escanea seguros incluidos en tu cuenta y descubre ofertas preferenciales',
      benefits: ['Seguros incluidos', 'Ofertas exclusivas', 'Descuentos por ser cliente'],
      status: 'available'
    },
    { 
      id: 'banco-chile', 
      name: 'Banco de Chile', 
      description: 'Revisa beneficios y seguros asociados a tus productos bancarios',
      benefits: ['Seguros de tarjetas', 'Seguros hipotecarios', 'Beneficios premium'],
      status: 'available'
    },
    { 
      id: 'banco-estado', 
      name: 'Banco Estado', 
      description: 'Accede a seguros estatales y beneficios gubernamentales',
      benefits: ['Seguros subsidiados', 'Programas sociales', 'Tarifas preferenciales'],
      status: 'available'
    },
    { 
      id: 'falabella', 
      name: 'Banco Falabella', 
      description: 'Conectado - Última sincronización: Hoy a las 14:30',
      benefits: ['CMR Puntos', 'Seguros incluidos', 'Ofertas exclusivas'],
      status: 'connected'
    }
  ];

  const healthServices = [
    {
      id: 'banmedica',
      name: 'Banmédica',
      description: 'Sincroniza tu plan de salud actual y descubre coberturas complementarias',
      benefits: ['Plan actual', 'Coberturas adicionales', 'Red de prestadores'],
      status: 'available'
    },
    {
      id: 'colmena',
      name: 'Colmena Golden Cross',
      description: 'Integra tu isapre para optimizar coberturas de salud',
      benefits: ['Historial médico', 'Planes complementarios', 'Descuentos familiares'],
      status: 'available'
    },
    {
      id: 'consalud',
      name: 'Consalud',
      description: 'Conecta tu plan de salud para análisis integral',
      benefits: ['Cobertura actual', 'Gaps identificados', 'Recomendaciones personalizadas'],
      status: 'available'
    }
  ];

  const employerServices = [
    {
      id: 'mi-empresa',
      name: 'Mi Empresa',
      description: 'Conecta con RRHH para ver seguros corporativos incluidos',
      benefits: ['Seguros grupales', 'Beneficios adicionales', 'Descuentos empresa'],
      status: 'configurable'
    }
  ];

  const futureIntegrations = [
    {
      id: 'clave-unica',
      name: 'ClaveÚnica',
      description: 'Login gubernamental para seguros estatales y beneficios públicos',
      icon: '🏛️',
      eta: 'Q2 2024'
    },
    {
      id: 'ocr-polizas',
      name: 'OCR Pólizas',
      description: 'Sube fotos de tus pólizas para análisis automático con IA',
      icon: '📸',
      eta: 'Q3 2024'
    },
    {
      id: 'open-banking',
      name: 'Open Banking',
      description: 'Conexión segura con todos los bancos chilenos',
      icon: '🔗',
      eta: 'Q4 2024'
    },
    {
      id: 'api-aseguradoras',
      name: 'APIs Aseguradoras',
      description: 'Cotización y contratación directa con todas las aseguradoras',
      icon: '⚡',
      eta: '2025'
    }
  ];

  const getStatusDisplay = (status, serviceId) => {
    const isConnected = connectedServices.includes(serviceId);
    
    if (isConnected || status === 'connected') {
      return (
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 flex items-center gap-1">
          <Check className="w-3 h-3" />
          Conectado
        </span>
      );
    }
    
    return (
      <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
        Disponible
      </span>
    );
  };

  const getButtonText = (status, serviceId) => {
    const isConnected = connectedServices.includes(serviceId);
    
    if (isConnected || status === 'connected') {
      return status === 'connected' ? 'Configurar' : 'Desconectar';
    }
    
    if (status === 'configurable') {
      return 'Configurar';
    }
    
    return 'Conectar';
  };

  const getButtonStyle = (status, serviceId) => {
    const isConnected = connectedServices.includes(serviceId);
    
    if (isConnected || status === 'connected') {
      return status === 'connected' 
        ? 'bg-green-100 text-green-800 hover:bg-green-200' 
        : 'bg-red-100 text-red-800 hover:bg-red-200';
    }
    
    return 'bg-blue-600 text-white hover:bg-blue-700';
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">🔗 Integraciones</h2>
        <p className="text-gray-600">Conecta con bancos, isapres y empleadores para descubrir seguros existentes y ofertas exclusivas</p>
      </div>

      {/* Connection Status Overview */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">📊 Estado de Conexiones</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-white bg-opacity-80 rounded-lg">
            <div className="text-2xl font-bold text-green-600 mb-1">{connectedServices.length}</div>
            <div className="text-sm text-gray-600">Servicios conectados</div>
          </div>
          <div className="text-center p-4 bg-white bg-opacity-80 rounded-lg">
            <div className="text-2xl font-bold text-blue-600 mb-1">
              {bankingServices.length + healthServices.length - connectedServices.length}
            </div>
            <div className="text-sm text-gray-600">Disponibles para conectar</div>
          </div>
          <div className="text-center p-4 bg-white bg-opacity-80 rounded-lg">
            <div className="text-2xl font-bold text-purple-600 mb-1">{futureIntegrations.length}</div>
            <div className="text-sm text-gray-600">Próximamente</div>
          </div>
          <div className="text-center p-4 bg-white bg-opacity-80 rounded-lg">
            <div className="text-2xl font-bold text-orange-600 mb-1">15%</div>
            <div className="text-sm text-gray-600">Ahorro promedio</div>
          </div>
        </div>
      </div>

      {/* Banking Integrations */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <CreditCard className="w-5 h-5 mr-2" />
          🏦 Conexiones Bancarias
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {bankingServices.map(bank => (
            <div key={bank.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-900">{bank.name}</h4>
                {getStatusDisplay(bank.status, bank.id)}
              </div>
              <p className="text-sm text-gray-600 mb-3">{bank.description}</p>
              
              <div className="mb-4">
                <h5 className="text-xs font-medium text-gray-700 mb-2">Beneficios incluidos:</h5>
                <div className="flex flex-wrap gap-1">
                  {bank.benefits.map((benefit, index) => (
                    <span key={index} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
                      {benefit}
                    </span>
                  ))}
                </div>
              </div>
              
              <button 
                onClick={() => handleConnect(bank.id)}
                className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-colors ${getButtonStyle(bank.status, bank.id)}`}
              >
                {getButtonText(bank.status, bank.id)}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Health Insurance */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Heart className="w-5 h-5 mr-2" />
          🏥 Isapres y Salud
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {healthServices.map(health => (
            <div key={health.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-900">{health.name}</h4>
                {getStatusDisplay(health.status, health.id)}
              </div>
              <p className="text-sm text-gray-600 mb-3">{health.description}</p>
              
              <div className="mb-4">
                <h5 className="text-xs font-medium text-gray-700 mb-2">Datos que sincroniza:</h5>
                <div className="flex flex-wrap gap-1">
                  {health.benefits.map((benefit, index) => (
                    <span key={index} className="text-xs bg-pink-50 text-pink-700 px-2 py-1 rounded">
                      {benefit}
                    </span>
                  ))}
                </div>
              </div>
              
              <button 
                onClick={() => handleConnect(health.id)}
                className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-colors ${getButtonStyle(health.status, health.id)}`}
              >
                {getButtonText(health.status, health.id)}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Employer Benefits */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Briefcase className="w-5 h-5 mr-2" />
          💼 Beneficios del Empleador
        </h3>
        <div className="space-y-4">
          {employerServices.map(employer => (
            <div key={employer.id} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-900">{employer.name}</h4>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  Pendiente configuración
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3">{employer.description}</p>
              
              <div className="mb-4">
                <h5 className="text-xs font-medium text-gray-700 mb-2">Información disponible:</h5>
                <div className="flex flex-wrap gap-1">
                  {employer.benefits.map((benefit, index) => (
                    <span key={index} className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded">
                      {benefit}
                    </span>
                  ))}
                </div>
              </div>
              
              <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors">
                Configurar conexión
              </button>
            </div>
          ))}
        </div>
        
        <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <div className="flex items-start">
            <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 mr-3" />
            <div>
              <h4 className="font-medium text-yellow-800 mb-1">Configuración manual requerida</h4>
              <p className="text-sm text-yellow-700">
                Para conectar con tu empleador, necesitamos que proporciones algunos datos de contacto 
                de RRHH o el sistema de beneficios que usa tu empresa.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Future Integrations */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Zap className="w-5 h-5 mr-2" />
          🚀 Próximamente
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {futureIntegrations.map(integration => (
            <div key={integration.id} className="p-4 bg-white bg-opacity-70 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">{integration.icon}</span>
                  <h4 className="font-medium text-gray-900">{integration.name}</h4>
                </div>
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
                  {integration.eta}
                </span>
              </div>
              <p className="text-sm text-gray-600">{integration.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 mb-4">
            ¿Hay alguna integración específica que te gustaría ver? Déjanos saber tu feedback.
          </p>
          <button className="px-6 py-2 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-700 transition-colors">
            Sugerir integración
          </button>
        </div>
      </div>
    </div>
  );
};

export default Integrations;