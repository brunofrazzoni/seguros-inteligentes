export const insuranceDatabase = [
  {
    id: 1,
    provider: "BCI Seguros",
    type: "SOAP",
    plan: "SOAP Auto Particular",
    cost: 5950,
    mainCoverage: "Muerte, incapacidad total o parcial, gastos médicos",
    maxCoverage: "UF 300 (muerte), UF 200 (gastos médicos)",
    specialConditions: "Obligatorio por ley para circular",
    availableFor: "Auto, camioneta, motocicleta, remolques",
    category: "auto",
    priority: "CRÍTICO",
    quoteLink: "https://www.bciseguros.cl/nuestros_seguros/personas/soap"
  },
  {
    id: 2,
    provider: "Seguros Falabella",
    type: "Seguro de Mascotas",
    plan: "Mascota Premium",
    cost: 11510,
    mainCoverage: "Consultas veterinarias, emergencias, traslado, cremación, hotelería",
    maxCoverage: "UF 300 anual",
    specialConditions: "Solo para perros y gatos hasta 10 años",
    availableFor: "Perros, Gatos",
    category: "mascotas",
    priority: "MEDIO",
    quoteLink: "https://www.segurosfalabella.com/cl/otros-seguros/mascotas"
  },
  {
    id: 3,
    provider: "SURA",
    type: "Seguro de Viaje",
    plan: "Viaje Internacional Total",
    cost: 15000,
    mainCoverage: "Emergencias médicas, pérdida de equipaje, repatriación",
    maxCoverage: "USD 30,000",
    specialConditions: "Cobertura por viaje de hasta 30 días",
    availableFor: "Viajes al extranjero",
    category: "viaje",
    priority: "ALTO",
    quoteLink: "https://seguros.sura.cl/movilidad/seguro-viaje"
  },
  {
    id: 4,
    provider: "HDI Seguros",
    type: "Seguro de Hogar",
    plan: "Hogar Básico",
    cost: 32522,
    mainCoverage: "Incendio, robo, responsabilidad civil",
    maxCoverage: "UF 2,000",
    specialConditions: "Requiere avalúo de la propiedad",
    availableFor: "Casa, Departamento",
    category: "hogar",
    priority: "ALTO"
  },
  {
    id: 5,
    provider: "HDI Seguros",
    type: "Seguro Oncológico",
    plan: "Oncológico Plus",
    cost: 47839,
    mainCoverage: "Diagnóstico, tratamiento, quimioterapia, radioterapia",
    maxCoverage: "UF 1,000",
    specialConditions: "Sin límite de edad de ingreso",
    availableFor: "Personas sin historial oncológico",
    category: "salud",
    priority: "CRÍTICO"
  },
  {
    id: 6,
    provider: "Mapfre",
    type: "Seguro de Salud",
    plan: "Salud Complementaria Plus",
    cost: 55000,
    mainCoverage: "Complemento a isapre, consultas privadas",
    maxCoverage: "UF 100 anual",
    specialConditions: "Requiere isapre activa",
    availableFor: "Trabajadores dependientes e independientes",
    category: "salud",
    priority: "CRÍTICO"
  },
  {
    id: 7,
    provider: "Liberty",
    type: "Seguro de Responsabilidad Civil",
    plan: "RC Profesional",
    cost: 28000,
    mainCoverage: "Errores y omisiones profesionales",
    maxCoverage: "UF 500",
    specialConditions: "Solo para profesionales titulados",
    availableFor: "Freelancers, Consultores",
    category: "trabajo",
    priority: "ALTO"
  },
  {
    id: 8,
    provider: "Banco de Chile",
    type: "Seguro de Cesantía",
    plan: "Cesantía Independiente",
    cost: 18000,
    mainCoverage: "Renta mensual por desempleo",
    maxCoverage: "6 meses de cobertura",
    specialConditions: "Solo para trabajadores independientes",
    availableFor: "Freelancers, Emprendedores",
    category: "trabajo",
    priority: "ALTO"
  },
  {
    id: 9,
    provider: "Consorcio",
    type: "Seguro de Equipos Electrónicos",
    plan: "Equipos Electrónicos Plus",
    cost: 33094,
    mainCoverage: "Robo, daño accidental, falla eléctrica",
    maxCoverage: "Hasta UF 200 por equipo",
    specialConditions: "Requiere factura de compra",
    availableFor: "Notebooks, celulares, tablets",
    category: "tecnologia",
    priority: "ALTO"
  },
  {
    id: 10,
    provider: "BCI Seguros",
    type: "Seguro de Vida",
    plan: "Vida Total",
    cost: 25000,
    mainCoverage: "Muerte natural, accidental, invalidez",
    maxCoverage: "UF 1,000",
    specialConditions: "Declaración de salud requerida",
    availableFor: "Personas de 18 a 65 años",
    category: "vida",
    priority: "ALTO"
  }
];

export const questionnaireData = [
  {
    id: 'housing',
    title: '🏡 Vivienda',
    question: '¿Cuál es tu situación de vivienda?',
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
    options: [
      { value: 'frecuente', label: 'Más de 2 veces al año' },
      { value: 'ocasional', label: 'Sí, 1-2 veces al año' },
      { value: 'raro', label: 'Muy rara vez' },
      { value: 'nunca', label: 'No viajo' }
    ]
  },
  {
    id: 'health',
    title: '🧬 Salud',
    question: '¿Tienes condiciones de salud preexistentes?',
    options: [
      { value: 'ninguna', label: 'Ninguna condición especial' },
      { value: 'hipertension', label: 'Hipertensión' },
      { value: 'diabetes', label: 'Diabetes' },
      { value: 'cancer_historial', label: 'Historial oncológico' }
    ]
  }
];