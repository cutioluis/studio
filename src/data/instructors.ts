export interface Instructor {
  id: string;
  name: string;
  role: string;
  bio: string;
  specialties: string[];
  image: string;
  imageAlt: string;
  // Featured instructors get the large highlighted card
  featured?: boolean;
}

// Add, remove or reorder instructors here. Team photos are from Unsplash (free license).
export const instructors: Instructor[] = [
  {
    id: "cecilia",
    name: "Carmen Cecilia",
    role: "Fundadora · Maestra en Belleza",
    bio: "Más de 10 años formando profesionales en uñas, pestañas y maquillaje. Su metodología combina práctica intensiva, técnicas actuales y visión empresarial para que cada alumna salga lista para trabajar o emprender.",
    specialties: ["Uñas", "Pestañas", "Maquillaje", "Emprendimiento"],
    image: "/images/instructors/cecilia.png",
    imageAlt: "Carmen Cecilia, fundadora y maestra en belleza de Ceciglam Academia",
    featured: true,
  },
  {
    id: "barberia",
    name: "Equipo de Barbería",
    role: "Barbería y Cortes Masculinos",
    bio: "Cortes clásicos y modernos, fades, perfilado de barba y atención profesional al cliente.",
    specialties: ["Fades", "Barba", "Estilismo masculino"],
    image: "/images/instructors/barberia.jpg",
    imageAlt: "Máquinas de corte, tijeras y peine profesionales de barbería",
  },
  {
    id: "colorimetria",
    name: "Equipo de Colorimetría",
    role: "Color y Tratamientos Capilares",
    bio: "Teoría del color aplicada al cabello: diagnóstico, técnicas de aclarado y corrección de color.",
    specialties: ["Teoría del color", "Balayage", "Corrección"],
    image: "/images/instructors/colorimetria.jpg",
    imageAlt: "Mechones de cabello en distintos tonos para práctica de colorimetría",
  },
  {
    id: "emprendimiento",
    name: "Equipo de Emprendimiento",
    role: "Negocio Digital e IA",
    bio: "Emprendimiento digital e inteligencia artificial aplicada para hacer crecer tu negocio de belleza.",
    specialties: ["Emprendimiento", "IA aplicada", "Marketing digital"],
    image: "/images/instructors/emprendimiento.jpg",
    imageAlt: "Espacio de trabajo con laptop para gestionar un negocio digital",
  },
];
