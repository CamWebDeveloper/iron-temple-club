/* =========================================================
   IRON TEMPLE CLUB — DATOS SIMULADOS (DEMO / PORTAFOLIO)
   ========================================================= */

/* ---------- GALERÍA (7 fotos recorrido) ---------- */
const GALLERY_PHOTOS = [
  { img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop", label: "Zona de pesas libres", size: "wide" },
  { img: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=800&auto=format&fit=crop", label: "Área de cardio", size: "tall" },
  { img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800&auto=format&fit=crop", label: "Sala funcional", size: "" },
  { img: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=800&auto=format&fit=crop", label: "Ring de combate", size: "" },
  { img: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=800&auto=format&fit=crop", label: "Vestidores premium", size: "" },
  { img: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop", label: "Zona de recuperación", size: "wide" },
  { img: "https://images.unsplash.com/photo-1550345332-09e3ac987658?q=80&w=800&auto=format&fit=crop", label: "Recepción & lounge", size: "" }
];

/* ---------- MEMBRESÍAS ---------- */
const MEMBERSHIPS = [
  {
    id: "basico",
    tier: "Nivel 01",
    name: "Básico",
    price: 39,
    period: "/ mes",
    featured: false,
    benefits: [
      "Acceso a sala de pesas y cardio",
      "1 clase grupal por semana",
      "App de seguimiento básico",
      "Casillero compartido"
    ],
    fullBenefits: [
      "Acceso ilimitado a sala de pesas y cardio",
      "1 clase grupal por semana (a elección)",
      "Evaluación física inicial",
      "App de seguimiento básico",
      "Casillero compartido",
      "Descuento 5% en tienda"
    ]
  },
  {
    id: "pro",
    tier: "Nivel 02",
    name: "Pro",
    price: 69,
    period: "/ mes",
    featured: true,
    benefits: [
      "Acceso total 24/7",
      "Clases grupales ilimitadas",
      "1 sesión mensual con coach personal",
      "Plan nutricional descargable"
    ],
    fullBenefits: [
      "Acceso total al club 24/7",
      "Clases grupales ilimitadas (10 disciplinas)",
      "1 sesión mensual con coach personal",
      "Plan nutricional descargable y actualizable",
      "Casillero individual",
      "Descuento 15% en tienda",
      "Acceso a zona de recuperación"
    ]
  },
  {
    id: "elite",
    tier: "Nivel 03",
    name: "Elite Black",
    price: 129,
    period: "/ mes",
    featured: false,
    benefits: [
      "Todo lo del plan Pro",
      "Entrenador personal dedicado",
      "Acceso a calendario de eventos exclusivos",
      "Plan nutricional 100% personalizado"
    ],
    fullBenefits: [
      "Todo lo incluido en el plan Pro",
      "Entrenador personal dedicado",
      "Acceso a calendario de eventos y torneos exclusivos",
      "Plan nutricional 100% personalizado con seguimiento semanal",
      "Casillero VIP + toalla y suplementos incluidos",
      "Descuento 25% en tienda",
      "Invitaciones a masterclasses con atletas invitados"
    ]
  }
];

/* ---------- ENTRENADORES (5) ---------- */
const TRAINERS = [
  {
    name: "Marcus Steel",
    photo: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=500&auto=format&fit=crop",
    specialty: "Fuerza & Powerlifting",
    experience: "10 años de experiencia",
    social: { instagram: "#", tiktok: "#", whatsapp: "#" }
  },
  {
    name: "Elena Cross",
    photo: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?q=80&w=500&auto=format&fit=crop",
    specialty: "HIIT & Acondicionamiento",
    experience: "8 años de experiencia",
    social: { instagram: "#", tiktok: "#", whatsapp: "#" }
  },
  {
    name: "Diego Vargas",
    photo: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=500&auto=format&fit=crop",
    specialty: "Boxeo & Combate",
    experience: "12 años de experiencia",
    social: { instagram: "#", tiktok: "#", whatsapp: "#" }
  },
  {
    name: "Sofía Reyes",
    photo: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=500&auto=format&fit=crop",
    specialty: "Movilidad & Yoga atlético",
    experience: "6 años de experiencia",
    social: { instagram: "#", tiktok: "#", whatsapp: "#" }
  },
  {
    name: "Kai Torres",
    photo: "https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?q=80&w=500&auto=format&fit=crop",
    specialty: "CrossTraining & Funcional",
    experience: "9 años de experiencia",
    social: { instagram: "#", tiktok: "#", whatsapp: "#" }
  }
];

/* ---------- CLASES / RESERVAS (10) ---------- */
const CLASSES = [
  { name: "Iron CrossFit", desc: "Entrenamiento funcional de alta intensidad.", img: "assets/img/crossfit.jpeg" },
  { name: "Boxing Combat", desc: "Técnica y potencia sobre el ring.", img: "assets/img/boxeo.jpeg" },
  { name: "HIIT Extreme", desc: "Quema máxima en mínimo tiempo.", img: "https://images.unsplash.com/photo-1554284126-aa88f22d8b74?q=80&w=600&auto=format&fit=crop" },
  { name: "Powerlifting Elite", desc: "Fuerza pura: sentadilla, press y peso muerto.", img: "https://images.unsplash.com/photo-1517341725866-6a1b1b6ae3d6?q=80&w=600&auto=format&fit=crop" },
  { name: "Athletic Yoga", desc: "Movilidad y recuperación activa.", img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=600&auto=format&fit=crop" },
  { name: "Spinning Dark", desc: "Cardio inmersivo en sala oscura con luces.", img: "assets/img/spinning.jpeg" },
  { name: "Kickboxing", desc: "Golpes, cardio y descarga de adrenalina.", img: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=600&auto=format&fit=crop" },
  { name: "Functional Strength", desc: "Fuerza aplicada al movimiento real.", img: "https://images.unsplash.com/photo-1571731956672-f2b94d7dd0cb?q=80&w=600&auto=format&fit=crop" },
  { name: "Core & Abs Lab", desc: "Núcleo de acero, postura de élite.", img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=600&auto=format&fit=crop" },
  { name: "Recovery Stretch", desc: "Estiramiento guiado post-entrenamiento.", img: "https://images.unsplash.com/photo-1600881333168-2ef49b341f30?q=80&w=600&auto=format&fit=crop" }
];

/* ---------- TRANSFORMACIONES (5 pares = 10 fotos) ---------- */
const TRANSFORMATIONS = [
  { name: "Rodrigo M.", weeks: "16 semanas", before: "assets/img/cambio_fisico_1-1.jpeg", after: "assets/img/cambio_fisico_1-2.jpeg" },
  { name: "Bruno T.", weeks: "18 semanas", before: "assets/img/cambio_fisico_2-1.jpeg", after: "assets/img/cambio_fisico_2-2.jpeg" },
  { name: "Camila S.", weeks: "12 semanas", before: "assets/img/cambio_fisico_3-1.jpeg", after: "assets/img/cambio_fisico_3-2.jpeg" },
  { name: "Valentina R.", weeks: "10 semanas", before: "assets/img/cambio_fisico_4-1.jpeg", after: "assets/img/cambio_fisico_4-2.jpeg" },
  { name: "Marina Ibarra", weeks: "20 semanas", before: "assets/img/cambio_fisico_5-1.jpeg", after: "assets/img/cambio_fisico_5-2.jpeg" }
];

/* ---------- PROMOCIONES ---------- */
const PROMOTIONS = [
  { tag: "Nuevo miembro", title: "50% en tu primer mes", desc: "Válido para planes Pro y Elite Black en tu primera inscripción.", expiry: "Vence: 31 / 08 / 2026" },
  { tag: "Referidos", title: "Trae un amigo, gana 1 mes gratis", desc: "Por cada referido activo, acumulas beneficios en tu cuenta.", expiry: "Promoción permanente" },
  { tag: "Tienda", title: "20% en suplementos", desc: "Aplica en toda la línea de proteínas y pre-entrenos.", expiry: "Vence: 15 / 08 / 2026" }
];

/* ---------- CALENDARIO DE EVENTOS (Elite Black) ---------- */
const EVENTS = [
  { day: 4, title: "Torneo interno de Powerlifting", desc: "Competencia amistosa entre miembros Elite Black. Premios y reconocimientos." },
  { day: 11, title: "Masterclass de Boxeo con invitado", desc: "Sesión especial con un campeón invitado. Cupos limitados." },
  { day: 18, title: "Reto Iron 30 días", desc: "Inicio del reto de transformación intensiva de 30 días." },
  { day: 24, title: "Seminario de nutrición deportiva", desc: "Charla con nutriólogo deportivo certificado sobre rendimiento." }
];

/* ---------- BLOG ---------- */
const BLOG_POSTS = [
  { cat: "Nutrición", title: "5 claves para maximizar tu recuperación muscular", excerpt: "Estrategias prácticas para entrenar más fuerte, con menos fatiga acumulada.", img: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=600&auto=format&fit=crop" },
  { cat: "Entrenamiento", title: "Por qué la fuerza es la base de toda transformación", excerpt: "La ciencia detrás del entrenamiento de fuerza progresivo.", img: "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?q=80&w=600&auto=format&fit=crop" },
  { cat: "Mentalidad", title: "Disciplina sobre motivación: el verdadero secreto", excerpt: "Por qué los resultados duraderos no dependen de la motivación diaria.", img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=600&auto=format&fit=crop" }
];

/* ---------- TESTIMONIOS (con video) ---------- */
const TESTIMONIALS = [
  { name: "Laura Gómez", plan: "Miembro Elite Black", quote: "Cambié mi cuerpo y mi mentalidad en 4 meses.", thumb: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?q=80&w=500&auto=format&fit=crop" },
  { name: "Iván Castro", plan: "Miembro Pro", quote: "El mejor equipo de coaches que he tenido.", thumb: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=500&auto=format&fit=crop" },
  { name: "Renata Ibáñez", plan: "Miembro Elite Black", quote: "Un ambiente que te exige ser tu mejor versión.", thumb: "https://images.unsplash.com/photo-1571731956672-f2b94d7dd0cb?q=80&w=500&auto=format&fit=crop" }
];

/* ---------- TIENDA: PRODUCTOS ---------- */
const PRODUCTS = [
  { id: "p1", cat: "suplementos", name: "Proteína Whey Iron 2lb", desc: "24g de proteína por porción, sabor chocolate.", price: 45, img: "assets/img/proteina.jpeg" },
  { id: "p2", cat: "suplementos", name: "Pre-entreno Black Rage", desc: "Energía y enfoque extremo para tus sesiones.", price: 32, img: "https://images.unsplash.com/photo-1579722820903-ff0e3d3e4f37?q=80&w=500&auto=format&fit=crop" },
  { id: "p3", cat: "ropa", name: "Playera Iron Temple Black", desc: "Algodón premium, corte atlético.", price: 25, img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=500&auto=format&fit=crop" },
  { id: "p4", cat: "ropa", name: "Short de entrenamiento Pro", desc: "Tela transpirable de alto rendimiento.", price: 28, img: "assets/img/short.jpeg" },
  { id: "p5", cat: "accesorios", name: "Guantes de Boxeo Elite", desc: "Protección profesional 14oz.", price: 55, img: "assets/img/guantes.jpeg" },
  { id: "p6", cat: "accesorios", name: "Cinturón de Powerlifting", desc: "Cuero reforzado, soporte lumbar total.", price: 60, img: "assets/img/cinturon.jpeg" },
  { id: "p7", cat: "accesorios", name: "Straps de agarre Iron", desc: "Máximo agarre para levantamientos pesados.", price: 15, img: "assets/img/straps.jpeg" },
  { id: "p8", cat: "suplementos", name: "Creatina Monohidratada 300g", desc: "Pureza certificada, sin sabor.", price: 22, img: "assets/img/creatina.jpeg" },
  { id: "p9", cat: "ropa", name: "Sudadera Black Edition", desc: "Ideal para calentamiento y calle.", price: 42, img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=500&auto=format&fit=crop" },
  { id: "p10", cat: "accesorios", name: "Botella térmica Iron 1L", desc: "Mantiene tu bebida fría hasta 24h.", price: 18, img: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=500&auto=format&fit=crop" },
  { id: "p11", cat: "suplementos", name: "BCAA Recovery 400g", desc: "Recuperación muscular acelerada.", price: 27, img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=500&auto=format&fit=crop" },
  { id: "p12", cat: "ropa", name: "Gorra Iron Temple", desc: "Bordado premium, ajuste unisex.", price: 16, img: "https://images.unsplash.com/photo-1521369909029-2afed882baee?q=80&w=500&auto=format&fit=crop" }
];

/* ---------- PANEL DE USUARIO: DATOS DEMO ---------- */
const USER_DEMO = {
  name: "Atleta Iron",
  plan: "Plan Pro",
  routine: [
    { day: "Lunes — Pecho & Tríceps", items: ["Press banca 4x8", "Press inclinado 3x10", "Fondos 3x12", "Extensión tríceps 3x15"] },
    { day: "Miércoles — Espalda & Bíceps", items: ["Dominadas 4x8", "Remo con barra 3x10", "Curl barra Z 3x12", "Curl martillo 3x15"] },
    { day: "Viernes — Pierna completa", items: ["Sentadilla 4x8", "Peso muerto rumano 3x10", "Prensa 3x12", "Elevación de talones 3x20"] }
  ],
  payments: [
    { concept: "Membresía Pro — Julio 2026", amount: "$69.00", status: "Pagado" },
    { concept: "Membresía Pro — Junio 2026", amount: "$69.00", status: "Pagado" },
    { concept: "Compra en tienda — Proteína + Straps", amount: "$60.00", status: "Pagado" }
  ],
  notifications: [
    { text: "Tu rutina de esta semana fue actualizada por tu coach.", unread: true },
    { text: "Recordatorio: tu clase de Boxing Combat es mañana a las 7:00 AM.", unread: true },
    { text: "¡Nuevo reto disponible en el calendario de eventos!", unread: true },
    { text: "Tu pago de julio fue procesado con éxito.", unread: false }
  ]
};

/* ---------- CHAT: RESPUESTAS AUTOMÁTICAS DEMO ---------- */
const CHAT_RESPONSES = [
  "Gracias por tu mensaje. Un asesor del equipo Iron Temple te responderá en breve.",
  "Puedes reservar tu clase directamente en la sección \"Reservas\" de la página.",
  "Nuestras membresías Básico, Pro y Elite Black están disponibles en la sección \"Membresías\".",
  "Para dudas urgentes, también puedes escribirnos por WhatsApp desde el botón flotante."
];
