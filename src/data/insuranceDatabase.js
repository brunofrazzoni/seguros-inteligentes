export const fetchInsuranceData = async () => {
  try {
    const response = await fetch("https://sheet2api.com/v1/LJOjidlRUa4S/bbdd-aseguradoras");
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    const data = await response.json();

    // Asumir que los datos ya vienen con las claves estandarizadas
    const formattedData = data.map((row, index) => ({
      id: index + 1,
      provider: row.provider,
      type: row.type,
      plan: row.plan,
      cost: parseInt(row.cost || "0", 10),
      mainCoverage: row.mainCoverage,
      maxCoverage: row.maxCoverage,
      specialConditions: row.specialConditions,
      availableFor: row.availableFor,
      category: row.category || "",
      priority: row.priority || "",
      quoteLink: row.quoteLink
    }));

    return formattedData;
  } catch (error) {
    console.error("Error al obtener los seguros desde Sheets:", error);
    return [];
  }
};
import { Home, Car, Briefcase, Heart, Plane, Smartphone } from 'lucide-react';

export const questionnaireData = [
  {
    id: 'housing',
    title: '🏡 Vivienda y entorno',
    question: '¿Cuál es tu situación de vivienda?',
    icon: Home,
    type: 'select',
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
    type: 'checkbox',
    options: [
      { value: 'auto', label: 'Auto propio' },
      { value: 'bicicleta', label: 'Bicicleta' },
      { value: 'scooter', label: 'Scooter eléctrico' },
      { value: 'transporte_publico', label: 'Transporte público' },
      { value: 'moto', label: 'Moto' },
      { value: 'caminando', label: 'Caminando' }
    ]
  },
  {
    id: 'work_transport',
    title: '💼 Trabajo con transporte',
    question: '¿Usas algún medio de transporte para trabajar?',
    icon: Briefcase,
    type: 'select',
    options: [
      { value: 'delivery', label: 'Sí, hago delivery' },
      { value: 'transporte_personas', label: 'Sí, traslado personas' },
      { value: 'no', label: 'No' }
    ]
  },
  {
    id: 'pets',
    title: '🐾 Mascotas',
    question: '¿Tienes mascotas?',
    icon: Heart,
    type: 'checkbox',
    options: [
      { value: 'perro', label: 'Perro' },
      { value: 'gato', label: 'Gato' },
      { value: 'otro', label: 'Otro (conejo, hurón, etc.)' },
      { value: 'ninguna', label: 'No tengo mascotas' }
    ]
  },
  {
    id: 'occupation',
    title: '💼 Trabajo',
    question: '¿Cuál es tu situación laboral?',
    icon: Briefcase,
    type: 'select',
    options: [
      { value: 'dependiente', label: 'Empleado dependiente' },
      { value: 'freelance', label: 'Freelancer' },
      { value: 'emprendedor', label: 'Emprendedor' },
      { value: 'cesante', label: 'Cesante' },
      { value: 'estudiante', label: 'Estudiante' }
    ]
  },
  {
    id: 'travel',
    title: '✈️ Viajes',
    question: '¿Viajas fuera del país?',
    icon: Plane,
    type: 'select',
    options: [
      { value: 'frecuente', label: 'Sí, más de 2 veces al año' },
      { value: 'ocasional', label: 'Sí, 1-2 veces al año' },
      { value: 'raro', label: 'Muy rara vez' },
      { value: 'nunca', label: 'No viajo' }
    ]
  },
  {
    id: 'health',
    title: '🧬 Salud',
    question: '¿Tienes condiciones de salud preexistentes?',
    icon: Heart,
    type: 'checkbox',
    options: [
      { value: 'hipertension', label: 'Hipertensión' },
      { value: 'diabetes', label: 'Diabetes' },
      { value: 'cancer_historial', label: 'Historial oncológico' },
      { value: 'ninguna', label: 'Ninguna condición especial' },
      { value: 'otros', label: 'Otros' }
    ]
  },
  {
    id: 'dependents',
    title: '👨‍👩‍👧‍👦 Familia',
    question: '¿Tienes personas a tu cargo?',
    icon: Heart,
    type: 'select',
    options: [
      { value: 'hijos', label: 'Sí, tengo hijos' },
      { value: 'padres', label: 'Sí, cuido a mis padres' },
      { value: 'ambos', label: 'Ambos' },
      { value: 'ninguno', label: 'No tengo dependientes' }
    ]
  },
  {
    id: 'technology',
    title: '🔒 Tecnología',
    question: '¿Trabajas con equipos propios de alto valor?',
    icon: Smartphone,
    type: 'checkbox',
    options: [
      { value: 'notebook', label: 'Notebook/MacBook' },
      { value: 'camara', label: 'Cámara profesional' },
      { value: 'tablet', label: 'Tablet' },
      { value: 'ninguno', label: 'No tengo equipos costosos' }
    ]
  }
];