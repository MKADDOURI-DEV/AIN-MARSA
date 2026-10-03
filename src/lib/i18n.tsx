import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "fr" | "en" | "ar";

const fr = {
  nav_home: "Accueil", nav_rooms: "Chambres", nav_services: "Services", nav_activities: "Activités",
  nav_destination: "Moyen Atlas", nav_gallery: "Galerie", nav_contact: "Contact", nav_book: "Réserver",
  hero_eyebrow: "Ifrane · Dayet Aoua · Moyen Atlas",
  hero_title: "Votre séjour au cœur du Moyen Atlas",
  hero_sub: "Une auberge familiale entre cèdres, lacs et montagnes, à quelques pas de Dayet Aoua.",
  cta_book: "Réserver mon séjour", cta_discover: "Découvrir Ain Mersa",
  s_checkin: "Arrivée", s_checkout: "Départ", s_adults: "Adultes", s_children: "Enfants", s_rooms: "Chambres", s_search: "Voir les disponibilités",
  exp_eyebrow: "L’expérience Ain Mersa", exp_title: "Le calme de la montagne, la chaleur d’une maison",
  exp_text: "Ici, le temps ralentit. L’air est pur, la forêt est proche et l’accueil se fait à la marocaine : simplement, sincèrement.",
  exp_1: "Calme & nature", exp_1d: "Loin du bruit, au rythme des saisons du Moyen Atlas.",
  exp_2: "Air pur de montagne", exp_2d: "Forêts de cèdres, sources et lacs à proximité.",
  exp_3: "Hospitalité familiale", exp_3d: "Un accueil attentif, pour les familles comme les voyageurs.",
  exp_4: "Découverte de la région", exp_4d: "Ifrane, Dayet Aoua et les sentiers du Moyen Atlas.",
  facts_rooms: "chambres", facts_beds: "lits", facts_class: "Auberge 2ème catégorie",
  rooms_title: "Nos chambres", rooms_sub: "Des chambres simples et chaleureuses pour se reposer après une journée en pleine nature.",
  rooms_empty: "Les fiches détaillées des chambres seront bientôt publiées. Contactez-nous pour connaître les disponibilités.",
  per_night: "/ nuit", guests: "pers.", book: "Réserver", details: "Voir la chambre", amenities: "Équipements",
  services_title: "Services", services_sub: "Les services proposés par l’établissement.",
  breakfast_eyebrow: "Petit-déjeuner", breakfast_title: "Bien commencer la journée",
  breakfast_text: "Le petit-déjeuner est servi chaque matin. Pour toute demande particulière (horaires, régime, enfants), indiquez-la lors de votre réservation.",
  dest_title: "Découvrir le Moyen Atlas", dest_sub: "Forêts de cèdres, lacs de montagne et villages : la région autour d’Ain Mersa.",
  nearby: "À proximité",
  act_title: "Activités", act_sub: "Les activités proposées ou organisées sur demande.", act_empty: "Les activités proposées seront publiées prochainement. Demandez-nous conseil pour explorer la région.",
  info_request: "Demander des informations",
  gallery_title: "Galerie", all: "Tout",
  reviews_title: "Ce que disent nos voyageurs",
  book_title: "Réservation", book_sub: "Envoyez votre demande : l’établissement vous contactera pour confirmer votre séjour.",
  f_name: "Nom complet", f_phone: "Téléphone", f_email: "Email", f_notes: "Remarques", f_room: "Chambre souhaitée", f_any: "Peu importe", f_message: "Message",
  f_send: "Envoyer la demande", f_sending: "Envoi…",
  book_ok_title: "Demande reçue", book_ok: "Votre demande a bien été reçue. L’établissement vous contactera pour confirmer votre séjour.", ref: "Référence",
  err_generic: "Une erreur est survenue. Réessayez ou contactez-nous par téléphone.", err_dates: "La date de départ doit être après l’arrivée.",
  contact_title: "Contact", contact_sub: "Une question, une demande ? Nous vous répondons.",
  contact_ok: "Merci, votre message a bien été envoyé.", call: "Appeler", directions: "Itinéraire GPS", whatsapp: "WhatsApp",
  footer_tag: "Auberge de montagne à Dayet Aoua, province d’Ifrane.",
};
type Dict = typeof fr;

const en: Dict = {
  nav_home: "Home", nav_rooms: "Rooms", nav_services: "Services", nav_activities: "Activities",
  nav_destination: "Middle Atlas", nav_gallery: "Gallery", nav_contact: "Contact", nav_book: "Book",
  hero_eyebrow: "Ifrane · Dayet Aoua · Middle Atlas",
  hero_title: "Your stay in the heart of the Middle Atlas",
  hero_sub: "A family-run inn among cedars, lakes and mountains, close to Dayet Aoua.",
  cta_book: "Book my stay", cta_discover: "Discover Ain Mersa",
  s_checkin: "Check-in", s_checkout: "Check-out", s_adults: "Adults", s_children: "Children", s_rooms: "Rooms", s_search: "Check availability",
  exp_eyebrow: "The Ain Mersa experience", exp_title: "Mountain calm, the warmth of a home",
  exp_text: "Time slows down here. The air is pure, the forest is close and hospitality is Moroccan: simple and sincere.",
  exp_1: "Calm & nature", exp_1d: "Far from the noise, following the Middle Atlas seasons.",
  exp_2: "Fresh mountain air", exp_2d: "Cedar forests, springs and lakes nearby.",
  exp_3: "Family hospitality", exp_3d: "Attentive welcome for families and travellers alike.",
  exp_4: "Explore the region", exp_4d: "Ifrane, Dayet Aoua and the Middle Atlas trails.",
  facts_rooms: "rooms", facts_beds: "beds", facts_class: "2nd category inn",
  rooms_title: "Our rooms", rooms_sub: "Simple, warm rooms to rest after a day in nature.",
  rooms_empty: "Detailed room pages will be published soon. Contact us for availability.",
  per_night: "/ night", guests: "guests", book: "Book", details: "View room", amenities: "Amenities",
  services_title: "Services", services_sub: "Services offered by the inn.",
  breakfast_eyebrow: "Breakfast", breakfast_title: "Start the day well",
  breakfast_text: "Breakfast is served every morning. For any special request (time, diet, children), mention it when booking.",
  dest_title: "Discover the Middle Atlas", dest_sub: "Cedar forests, mountain lakes and villages: the region around Ain Mersa.",
  nearby: "Nearby",
  act_title: "Activities", act_sub: "Activities offered or arranged on request.", act_empty: "Activities will be published soon. Ask us for advice on exploring the region.",
  info_request: "Request information",
  gallery_title: "Gallery", all: "All",
  reviews_title: "What our guests say",
  book_title: "Booking", book_sub: "Send your request: the inn will contact you to confirm your stay.",
  f_name: "Full name", f_phone: "Phone", f_email: "Email", f_notes: "Notes", f_room: "Preferred room", f_any: "No preference", f_message: "Message",
  f_send: "Send request", f_sending: "Sending…",
  book_ok_title: "Request received", book_ok: "Your request has been received. The inn will contact you to confirm your stay.", ref: "Reference",
  err_generic: "Something went wrong. Please retry or call us.", err_dates: "Check-out must be after check-in.",
  contact_title: "Contact", contact_sub: "A question or a request? We’ll get back to you.",
  contact_ok: "Thank you, your message has been sent.", call: "Call", directions: "GPS directions", whatsapp: "WhatsApp",
  footer_tag: "Mountain inn in Dayet Aoua, Ifrane province.",
};

const ar: Dict = {
  nav_home: "الرئيسية", nav_rooms: "الغرف", nav_services: "الخدمات", nav_activities: "الأنشطة",
  nav_destination: "الأطلس المتوسط", nav_gallery: "معرض الصور", nav_contact: "اتصل بنا", nav_book: "احجز",
  hero_eyebrow: "إفران · ضاية عوا · الأطلس المتوسط",
  hero_title: "إقامتك في قلب الأطلس المتوسط",
  hero_sub: "نُزُل عائلي بين أشجار الأرز والبحيرات والجبال، بالقرب من ضاية عوا.",
  cta_book: "احجز إقامتي", cta_discover: "اكتشف عين مرسى",
  s_checkin: "الوصول", s_checkout: "المغادرة", s_adults: "البالغون", s_children: "الأطفال", s_rooms: "الغرف", s_search: "عرض التوفر",
  exp_eyebrow: "تجربة عين مرسى", exp_title: "هدوء الجبل ودفء البيت",
  exp_text: "هنا يتباطأ الزمن. الهواء نقي، والغابة قريبة، والضيافة مغربية: بسيطة وصادقة.",
  exp_1: "الهدوء والطبيعة", exp_1d: "بعيداً عن الضجيج، على إيقاع فصول الأطلس المتوسط.",
  exp_2: "هواء الجبل النقي", exp_2d: "غابات الأرز والعيون والبحيرات بالقرب.",
  exp_3: "ضيافة عائلية", exp_3d: "استقبال حار للعائلات والمسافرين.",
  exp_4: "اكتشاف المنطقة", exp_4d: "إفران وضاية عوا ومسالك الأطلس المتوسط.",
  facts_rooms: "غرف", facts_beds: "سريراً", facts_class: "نُزُل من الصنف الثاني",
  rooms_title: "غرفنا", rooms_sub: "غرف بسيطة ودافئة للراحة بعد يوم في الطبيعة.",
  rooms_empty: "سيتم نشر تفاصيل الغرف قريباً. اتصلوا بنا لمعرفة التوفر.",
  per_night: "/ الليلة", guests: "أشخاص", book: "احجز", details: "عرض الغرفة", amenities: "التجهيزات",
  services_title: "الخدمات", services_sub: "الخدمات التي تقدمها المؤسسة.",
  breakfast_eyebrow: "الفطور", breakfast_title: "بداية جميلة لليوم",
  breakfast_text: "يُقدَّم الفطور كل صباح. لأي طلب خاص (التوقيت، النظام الغذائي، الأطفال) أشيروا إليه عند الحجز.",
  dest_title: "اكتشف الأطلس المتوسط", dest_sub: "غابات الأرز وبحيرات الجبل والقرى: المنطقة المحيطة بعين مرسى.",
  nearby: "بالقرب منا",
  act_title: "الأنشطة", act_sub: "الأنشطة المقترحة أو المنظمة عند الطلب.", act_empty: "سيتم نشر الأنشطة قريباً. اطلبوا نصيحتنا لاستكشاف المنطقة.",
  info_request: "طلب معلومات",
  gallery_title: "معرض الصور", all: "الكل",
  reviews_title: "ماذا يقول ضيوفنا",
  book_title: "الحجز", book_sub: "أرسلوا طلبكم: ستتصل بكم المؤسسة لتأكيد إقامتكم.",
  f_name: "الاسم الكامل", f_phone: "الهاتف", f_email: "البريد الإلكتروني", f_notes: "ملاحظات", f_room: "الغرفة المفضلة", f_any: "لا يهم", f_message: "الرسالة",
  f_send: "إرسال الطلب", f_sending: "جارٍ الإرسال…",
  book_ok_title: "تم استلام الطلب", book_ok: "تم استلام طلبكم بنجاح. ستتصل بكم المؤسسة لتأكيد إقامتكم.", ref: "المرجع",
  err_generic: "حدث خطأ. حاولوا مجدداً أو اتصلوا بنا هاتفياً.", err_dates: "يجب أن يكون تاريخ المغادرة بعد الوصول.",
  contact_title: "اتصل بنا", contact_sub: "سؤال أو طلب؟ سنرد عليكم.",
  contact_ok: "شكراً، تم إرسال رسالتكم.", call: "اتصال", directions: "الاتجاهات GPS", whatsapp: "واتساب",
  footer_tag: "نُزُل جبلي في ضاية عوا، إقليم إفران.",
};

const dicts: Record<Lang, Dict> = { fr, en, ar };

const Ctx = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: (k: keyof Dict) => string }>({
  lang: "fr", setLang: () => {}, t: (k) => fr[k],
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("fr");
  useEffect(() => {
    const saved = localStorage.getItem("am_lang") as Lang | null;
    if (saved && saved in dicts) setLangState(saved);
  }, []);
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);
  const setLang = (l: Lang) => { setLangState(l); localStorage.setItem("am_lang", l); };
  return <Ctx.Provider value={{ lang, setLang, t: (k) => dicts[lang][k] }}>{children}</Ctx.Provider>;
}

export const useI18n = () => useContext(Ctx);
