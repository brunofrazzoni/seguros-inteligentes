export const generateProfile = (responses) => {
  const profile = {
    lifestyle: "Profesional Urbano",
    riskScore: 6.5,
    tags: [],
    coverageNeeds: 7,
    currentCoverage: 0,
    lastUpdate: new Date().toLocaleDateString(),
    responses: { ...responses }
  };

  // Generar tags basado en respuestas
  if (['casa_propia', 'depto_propio'].includes(responses.housing)) {
    profile.tags.push("Propietario");
  }
  if (responses.transport === 'auto') {
    profile.tags.push("Conductor");
  }
  if (['freelance', 'emprendedor'].includes(responses.occupation)) {
    profile.tags.push("Independiente");
    profile.riskScore += 1;
  }
  if (['perro', 'gato', 'ambos'].includes(responses.pets)) {
    profile.tags.push("Con mascotas");
  }
  if (['frecuente', 'ocasional'].includes(responses.travel)) {
    profile.tags.push("Viajero");
  }

  // Determinar lifestyle más específico
  if (responses.occupation === 'freelance') {
    profile.lifestyle = "Freelancer Tech";
  } else if (responses.occupation === 'emprendedor') {
    profile.lifestyle = "Emprendedor Digital";
  } else if (responses.transport === 'auto' && responses.pets !== 'ninguna') {
    profile.lifestyle = "Profesional con Familia";
  }

  return profile;
};

export const generateAlerts = (responses, userPortfolio) => {
  const alerts = [];

  // Alert de ahorro
  if (responses.transport === 'auto' && !userPortfolio.find(p => p.type === 'Seguro Automotriz')) {
    alerts.push({
      id: 1,
      type: "savings",
      title: "Podrías ahorrar $12.400 al mes",
      description: "Encontramos un seguro de auto 25% más barato con SURA",
      priority: "high",
      action: "Comparar ofertas"
    });
  }

  // Alert de gap crítico
  if (['freelance', 'emprendedor'].includes(responses.occupation) && 
      !userPortfolio.find(p => p.category === 'salud')) {
    alerts.push({
      id: 2,
      type: "gap",
      title: "Gap crítico detectado",
      description: "No tienes seguro de salud como trabajador independiente",
      priority: "critical",
      action: "Ver recomendaciones"
    });
  }

  // Alert de renovación (simulado)
  if (userPortfolio.length > 0) {
    alerts.push({
      id: 3,
      type: "renewal",
      title: "Renovación próxima",
      description: "Tu seguro de hogar vence en 45 días",
      priority: "medium",
      action: "Renovar ahora"
    });
  }

  return alerts;
};

export const generateRecommendations = (responses, insuranceDatabase, existingPortfolio = []) => {
  const recommendations = [];
  
  // CRÍTICOS
  if (responses.transport === 'auto') {
    const soap = insuranceDatabase.find(i => i.type === "SOAP");
    if (soap && !existingPortfolio.some(p => p.type === "SOAP")) {
      recommendations.push({
        ...soap,
        reason: "Obligatorio por ley para conductores",
        urgencyScore: 10
      });
    }
  }
  
  if (['freelance', 'emprendedor'].includes(responses.occupation)) {
    const salud = insuranceDatabase.find(i => i.type === "Seguro de Salud");
    if (salud && !existingPortfolio.some(p => p.type === "Seguro de Salud")) {
      recommendations.push({
        ...salud,
        reason: "Cobertura médica esencial para trabajadores independientes",
        urgencyScore: 9
      });
    }
  }
  
  if (responses.health === 'cancer_historial') {
    const oncologico = insuranceDatabase.find(i => i.type === "Seguro Oncológico");
    if (oncologico && !existingPortfolio.some(p => p.type === "Seguro Oncológico")) {
      recommendations.push({
        ...oncologico,
        reason: "Cobertura especializada por historial médico",
        urgencyScore: 10
      });
    }
  }
  
  // ALTOS
  if (['casa_propia', 'depto_propio'].includes(responses.housing)) {
    const hogar = insuranceDatabase.find(i => i.type === "Seguro de Hogar");
    if (hogar && !existingPortfolio.some(p => p.type === "Seguro de Hogar")) {
      recommendations.push({
        ...hogar,
        reason: "Protección integral para tu patrimonio inmobiliario",
        urgencyScore: 8
      });
    }
  }
  
  if (['freelance', 'emprendedor'].includes(responses.occupation)) {
    const rcProf = insuranceDatabase.find(i => i.type === "Seguro de Responsabilidad Civil");
    if (rcProf && !existingPortfolio.some(p => p.type === "Seguro de Responsabilidad Civil")) {
      recommendations.push({
        ...rcProf,
        reason: "Protección contra errores profesionales",
        urgencyScore: 7
      });
    }
  }
  
  if (['frecuente', 'ocasional'].includes(responses.travel)) {
    const viaje = insuranceDatabase.find(i => i.type === "Seguro de Viaje");
    if (viaje && !existingPortfolio.some(p => p.type === "Seguro de Viaje")) {
      recommendations.push({
        ...viaje,
        reason: "Cobertura médica y de equipaje para viajeros",
        urgencyScore: 6
      });
    }
  }
  
  // MEDIOS
  const petsArray = Array.isArray(responses.pets) ? responses.pets : [responses.pets];
  if (petsArray.some(pet => ['perro', 'gato', 'ambos'].includes(pet)) && !petsArray.includes('ninguna')) {
    const mascotas = insuranceDatabase.find(i => i.type === "Seguro de Mascotas");
    if (mascotas && !existingPortfolio.some(p => p.type === "Seguro de Mascotas")) {
      recommendations.push({
        ...mascotas,
        reason: "Gastos veterinarios pueden ser muy altos",
        urgencyScore: 5
      });
    }
  }
  
  // Ordenar por urgencia
  return recommendations.sort((a, b) => (b.urgencyScore || 0) - (a.urgencyScore || 0));
};