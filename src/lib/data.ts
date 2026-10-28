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

// EXEMPLES : remplacez noms, descriptions, prix et photos (public/images) par les vraies chambres.
export const rooms: Room[] = [
  {
    slug: "chambre-double-confort", name: "Chambre Double Confort",
    description: "Une chambre calme et lumineuse, décorée en bois et pierre, idéale pour un séjour en couple au cœur du Moyen Atlas.",
    images: ["/images/room.jpg"], bed_type: "1 grand lit", capacity: 2, surface_m2: 20, view: "Vue montagne",
    amenities: ["Wi-Fi gratuit", "Climatisation", "Salle de bain privée", "Chauffage", "Petit-déjeuner disponible"], price_mad: 450,
  },
  {
    slug: "chambre-twin", name: "Chambre Twin",
    description: "Deux lits simples dans une chambre fonctionnelle et chaleureuse, parfaite pour des amis ou des collègues.",
    images: ["/images/room.jpg"], bed_type: "2 lits simples", capacity: 2, surface_m2: 20, view: "Vue jardin",
    amenities: ["Wi-Fi gratuit", "Salle de bain privée", "Chauffage", "Parking privé gratuit"], price_mad: 400,
  },
  {
    slug: "chambre-triple", name: "Chambre Triple",
    description: "Une chambre spacieuse pour trois personnes, avec coin détente et accès direct au jardin.",
    images: ["/images/room.jpg"], bed_type: "3 lits simples", capacity: 3, surface_m2: 26, view: "Vue jardin",
    amenities: ["Wi-Fi gratuit", "Salle de bain privée", "Chauffage", "Accès jardin"], price_mad: 550,
  },
  {
    slug: "chambre-familiale", name: "Chambre Familiale",
    description: "Pensée pour les familles : un grand espace, plusieurs couchages et une belle vue sur les reliefs environnants.",
    images: ["/images/room.jpg"], bed_type: "1 grand lit + 2 lits simples", capacity: 4, surface_m2: 32, view: "Vue montagne",
    amenities: ["Wi-Fi gratuit", "Climatisation", "Salle de bain privée", "Chauffage", "Terrasse", "Petit-déjeuner disponible"], price_mad: 700,
  },
];
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
