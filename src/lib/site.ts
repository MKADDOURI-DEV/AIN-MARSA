export const SITE = {
  name: "Motel Ain Mersa",
  phoneDisplay: "+212 6 61 81 37 75",
  phoneIntl: "+212661813775",
  whatsapp: "212661813775",
  classification: "Auberge 2ème catégorie",
  capacity: { rooms: 10, beds: 20 },
  address: ["Aït Hmad / Dayet Aoua", "Province d’Ifrane", "Région Fès-Meknès", "Maroc"],
  historicAddress: "Route d’Immouzzer — Commune territoriale de Tizguit",
  mapQuery: "Dayet Aoua, Ifrane, Maroc",
};

export const whatsappUrl = (msg?: string) =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(
    msg ?? "Bonjour, je souhaite avoir des informations concernant un séjour au Motel Ain Mersa.",
  )}`;

export const mapsEmbed = `https://www.google.com/maps?q=${encodeURIComponent(SITE.mapQuery)}&output=embed`;
export const mapsDirections = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(SITE.mapQuery)}`;
