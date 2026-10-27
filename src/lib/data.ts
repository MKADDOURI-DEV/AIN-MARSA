// Données statiques (plus de base de données). Modifiez ce fichier pour ajouter chambres, activités, avis.
export type Room = {
  slug: string; name: string; description?: string; images: string[]; bed_type?: string;
  capacity: number; surface_m2?: number; view?: string; amenities: string[]; price_mad?: number;
};
export type Activity = {
  id: string; title: string; description?: string; image?: string; duration?: string;
  level?: string; price_mad?: number; location?: string; category?: string;
};
export type Testimonial = {
  id: string; text: string; first_name: string; country?: string; platform?: string; rating?: number;
};

export const rooms: Room[] = [];
export const activities: Activity[] = [];
export const testimonials: Testimonial[] = [];

export const services = [
  { id: "wifi", title: "Wi-Fi gratuit", description: "Connexion sans fil offerte dans l’établissement.", icon: "wifi" },
  { id: "parking", title: "Parking privé gratuit", description: "Stationnement privé sur place, sans frais.", icon: "car" },
  { id: "family", title: "Chambres familiales", description: "Des chambres adaptées aux séjours en famille.", icon: "users" },
  { id: "nosmoke", title: "Chambres non-fumeurs", description: "Un air pur, à l’intérieur comme à l’extérieur.", icon: "wind" },
  { id: "ac", title: "Climatisation", description: "Confort thermique selon les chambres.", icon: "snowflake" },
  { id: "garden", title: "Jardin", description: "Un espace vert pour se reposer au calme.", icon: "trees" },
  { id: "terrace", title: "Terrasse", description: "Profiter du grand air et de la vue.", icon: "sun" },
  { id: "breakfast", title: "Petit-déjeuner", description: "Pour bien commencer la journée dans le Moyen Atlas.", icon: "coffee" },
  { id: "mountain", title: "Vue montagne", description: "Selon les chambres, une vue sur les reliefs.", icon: "mountain" },
];
