import { Appointment, Client, Podcast, Service } from "../types/types";

export const categoriesSkills = [
  {
    name: "Santé - Bien-être",
    themes: [
      "Fatigue",
      "Sommeil",
      "Bien-être",
      "Addictions",
      "Perte de poids",
      "Confiance en soi",
      "Stress & anxiété",
      "Préparation mentale",
      "Gestion des émotions",
      "Gestion de la douleur",
      "Développement personnel",
    ],
  },
  {
    name: "Psychologie / émotionnelle",
    themes: [
      "Troubles du comportement",
      "Douleurs articulaires",
      "Troubles féminins",
      "Problèmes de peau",
      "Allergies",
      "Burnout",
      "Troubles ORL",
      "Audition",
      "Dépression",
      "Peurs / Phobies",
      "Traumatismes",
    ],
  },
  {
    name: "Mode de vie - Relations",
    themes: [
      "Troubles relationnels",
      "Arrêt du tabac",
      "Sport",
      "Échec scolaire",
      "Sexualité",
      "Grossesse",
      "Fécondité",
      "Couple",
      "Éducation",
    ],
  },
];

export const ArrayServices = [
  {
    title: "Thérapie de couple",
    text: "Renforcez votre relation et retrouvez l'harmonie dans votre couple. Mes séances vous aident à améliorer votre communication, résoudre les conflits et redécouvrir la complicité qui vous unit.",
    Features: [
      "Séances de 1h30",
      "Accompagnement approfondi pour des résultats durables.",
      "Suivi et exercices pratiques.",
      "Environnement bienveillant et confidentiel",
    ],
    price: 120,
    devise: "€",
    button: "Prendre RDV",
  },
  {
    title: "Adulte",
    text: "Accompagnement personnalisé pour surmonter les défis de la vie adulte. Que vous traversiez une période difficile, cherchiez à mieux vous connaître ou souhaitiez développer votre potentiel, je vous guide vers un mieux-être durable.",
    Features: [
      "Thérapie individuelle adaptée à vos besoins",
      "Approche holistique corps-esprit",
      "Outils de gestion du stress et des émotions",
      "Développement de votre confiance en soi",
    ],
    price: 90,
    devise: "€",
    button: "Prendre RDV",
  },
  {
    title: "Kids",
    text: "Accompagnement spécialisé pour les enfants et adolescents. J'aide votre enfant à exprimer ses émotions, développer sa confiance et surmonter les difficultés scolaires, familiales ou sociales dans un cadre ludique et rassurant.",
    Features: [
      "Thérapie adaptée à l'âge de l'enfant",
      "Techniques ludiques et créatives",
      "Collaboration avec les parents",
      "Suivi de l'évolution et conseils éducatifs",
    ],
    price: 80,
    devise: "€",
    button: "Prendre RDV",
  },
];

export const ArrayServicesPro = [
  {
    title: "Entreprise",
    text: "Solutions sur-mesure pour améliorer le bien-être au travail et optimiser la performance de vos équipes. Formations, ateliers et accompagnement pour créer un environnement professionnel épanouissant.",
    Features: [
      "Audit du climat social et des besoins",
      "Formations en gestion du stress et communication",
      "Ateliers de cohésion d'équipe",
      "Accompagnement des managers",
      "Suivi et évaluation des résultats",
    ],
    button: "Demander un devis",
  },
  {
    title: "Coaching",
    text: "Révélez votre potentiel et atteignez vos objectifs personnels et professionnels. Un accompagnement structuré pour clarifier votre vision, lever vos blocages et mettre en place un plan d'action concret.",
    Features: [
      "Définition d'objectifs SMART",
      "Techniques de développement personnel",
      "Stratégies de motivation et de persévérance.",
      "Bilan de compétences et orientation",
      "Suivi personnalisé de vos progrès",
    ],
    button: "Demander un devis",
  },
];

// Sample Data
export const sampleAppointments: Appointment[] = [
  {
    id: "1",
    clientName: "Marie Dubois",
    clientId: "1",
    date: "2025-06-20",
    time: "10:00",
    duration: 60,
    type: "Hypnothérapie",
    status: "confirmed",
    notes: "Première séance - anxiété",
  },
  {
    id: "2",
    clientName: "Pierre Martin",
    clientId: "2",
    date: "2025-06-20",
    time: "14:30",
    duration: 90,
    type: "Coaching",
    status: "pending",
    notes: "Suivi développement personnel",
  },
  {
    id: "3",
    clientName: "Sophie Leclerc",
    clientId: "3",
    date: "2025-06-21",
    time: "09:00",
    duration: 60,
    type: "Hypnothérapie",
    status: "confirmed",
  },
];

export const sampleClients: Client[] = [
  {
    id: "1",
    name: "Marie Dubois",
    email: "marie.dubois@email.com",
    phone: "06 12 34 56 78",
    dateCreated: "2025-05-15",
    totalSessions: 3,
    lastSession: "2025-06-13",
    notes: "Patiente très motivée, progrès remarquables",
  },
  {
    id: "2",
    name: "Pierre Martin",
    email: "pierre.martin@email.com",
    phone: "06 98 76 54 32",
    dateCreated: "2025-04-20",
    totalSessions: 8,
    lastSession: "2025-06-18",
  },
  {
    id: "3",
    name: "Sophie Leclerc",
    email: "sophie.leclerc@email.com",
    phone: "06 11 22 33 44",
    dateCreated: "2025-06-01",
    totalSessions: 1,
    lastSession: "2025-06-10",
  },
];

export const samplePodcasts: Podcast[] = [
  {
    id: "1",
    title: "Introduction à l'Hypnose Thérapeutique",
    description: "Découvrez les bases de l'hypnothérapie et ses applications.",
    coverImage: "/images/about-img.jpg",
    audioFile: "podcast1.mp3",
    category: "Éducation",
    duration: 1860,
    uploadDate: "2025-06-15",
    downloads: 245,
  },
  {
    id: "2",
    title: "Techniques de Relaxation Profonde",
    description: "Guide pratique pour apprendre à se détendre en profondeur.",
    coverImage: "/api/placeholder/300/300",
    audioFile: "podcast2.mp3",
    category: "Pratique",
    duration: 2280,
    uploadDate: "2025-06-10",
    downloads: 189,
  },
];

export const sampleServices: Service[] = [
  {
    id: "1",
    name: "Séance d'Hypnothérapie",
    description:
      "Séance individuelle d'hypnothérapie pour traiter divers troubles.",
    price: 80,
    duration: 60,
    category: "Hypnothérapie",
    active: true,
    priceHistory: [
      { price: 75, date: "2025-01-01" },
      { price: 80, date: "2025-05-01" },
    ],
    feature: [
      "Séances de 1h30",
      "Accompagnement approfondi pour des résultats durables.",
      "Suivi et exercices pratiques.",
      "Environnement bienveillant et confidentiel",
    ],
  },
  {
    id: "2",
    name: "Coaching Individuel",
    description: "Séance de coaching personnel pour atteindre vos objectifs.",
    price: 90,
    duration: 90,
    category: "Coaching",
    active: false,
    priceHistory: [
      { price: 85, date: "2025-01-01" },
      { price: 90, date: "2025-04-01" },
    ],
    feature: [
      "Séances de 1h30",
      "Accompagnement approfondi pour des résultats durables.",
      "Suivi et exercices pratiques.",
      "Environnement bienveillant et confidentiel",
    ],
  },
];

// AVIS
export const testimonials = [
  {
    name: "Alix B.",
    rating: 5,
    comment:
      "Une personne exceptionnelle, authentique et alerte. Une thérapeute alignée, clairvoyante et dotée de dons multiples. Merci d’avoir mis de la lumière là je percevais de l’ombre, merci pour l’énergie transmise, merci pour ce moment de connexion.",
    dateCreated: "16/04/2025",
    hourCreated: "13:24",
  },
  {
    name: "Annick J.",
    rating: 5,
    comment: "juste merci",
    dateCreated: "09/04/2025",
    hourCreated: " 16:28",
  },
  {
    name: "Marie-karine E",
    rating: 5,
    comment:
      "Bienveillante empathique je recommande aide à se recentrer sur soi.",
    dateCreated: "26/03/2025",
    hourCreated: "12:44",
  },
  {
    name: "Patricia N.",
    rating: 5,
    comment:
      "Disponible et à l’écoute . Bienveillante et professionnelle. Une rencontre éclairée qui mérite d’être renouvelée . Je recommande",
    dateCreated: "26/02/2025",
    hourCreated: "13:28",
  },
  {
    name: "Sylviane C",
    rating: 5,
    comment: "Bienveillante et puissante",
    dateCreated: "27/12/2024",
    hourCreated: "13:00",
  },
  {
    name: "Célia P",
    rating: 5,
    comment: "Elle est juste extraordinaire !",
    dateCreated: "17/11/2024",
    hourCreated: "13:42",
  },
  {
    name: "Célia P.",
    rating: 5,
    comment: "",
    dateCreated: " 17/11/2024",
    hourCreated: "13:42",
  },
  {
    name: "Sandra S",
    rating: 5,
    comment: "Wahou",
    dateCreated: "29/10/2024",
    hourCreated: "12:56",
  },
  {
    name: "Aude F.",
    rating: 5,
    comment:
      "Valeycia est une thérapeute extraordinaire! Cela fait 3 ans qu'elle est mon thérapeute et grace à son accompagnement j'ai surmonté des traumatismes, laissez ma colère, me resociabilise et ai pu établir une relation saine avec mon fils. Je le recommande grandement",
    dateCreated: "03/09/2024",
    hourCreated: "12:48",
  },
  {
    name: "Kéri B",
    rating: 5,
    comment: "",
    dateCreated: "07/08/2024",
    hourCreated: "03:24",
  },
  {
    name: "Karen G",
    rating: 5,
    comment:
      "Je recommande +++. Valeycia est extraordinaire. Merci pour tout ❤️",
    dateCreated: "24/07/2024",
    hourCreated: "13:20",
  },
  {
    name: "Sarah C",
    rating: 5,
    comment:
      "Valeycia est une personne et une thérapeute extraordinaire ! Son accompagnement est très précieux ! Je recommande +++. Encore mille mercis Valeycia ✨",
    dateCreated: "23/05/2024",
    hourCreated: "13:03",
  },
  {
    name: "Aline P",
    rating: 5,
    comment:
      "Merci Valeycia pour ton écoute et ta disponibilité. Je t’ai rencontré au bon moment. Tu as trouvé les mots pour m’aider et me réconforter dans ces moments difficiles de ma vie.",
    dateCreated: "15/03/2024",
    hourCreated: "17:25",
  },
  {
    name: "Sandra R",
    rating: 5,
    comment:
      "Il est important dans le processus de Guérison, d'avoir le Thérapeute à l'écoute de notre personne, afin de continuer ce travail important avec soi-même, parfois nos parcours sont de vraies montagnes russes, puis nous rencontrerons le Thérapeute qui est à notre et nous accompagne de manière juste...... Tout es juste avec Valeycia. La bonne rencontre, au bon moment, puis à notre tour, nous pouvons accompagner d'autres Âmes en souffrance. Madame Fortuné m'a permis de me reconnecter à moi-même, en me permettant de sortir de mes traumatismes et peurs...... Aujourd'hui j'avance en confiance, au fur et à mesure de mon parcours en Amour et en paix",
    dateCreated: "12/03/2024",
    hourCreated: "12:40",
  },
  {
    name: "Véronique F. ",
    rating: 5,
    comment:
      "Valeycia est une personne très à l'écoute, disponible et bienveillante. Elle m'a beaucoup aidée.",
    dateCreated: "01/02/2024",
    hourCreated: "15:39",
  },
  {
    name: "Océane F",
    rating: 5,
    comment:
      "Vraiment, je recommande Valeycia qui est à l’écoute de son patient ???? J’ai pu récupérer mon pouvoir de femme et je vis ma sexualité ! Je suis une jeune femme épanouie et en constante évolution ! Je n’ai plus peur de vivre et je m’accepte telle que je suis ! Je ne cesse de lui dire merci depuis nos deux séances ( j’ai commencé le 29 novembre 23????????). Alors vraiment n’hésitez pas ! Osez ! Une belle découverte et je recommande ses talents ! Love you Valeycia????????????????",
    dateCreated: "26/01/2024",
    hourCreated: "22:26",
  },
  {
    name: "Ikram J",
    rating: 4,
    comment: "",
    dateCreated: "24/01/2024",
    hourCreated: "15:41",
  },
  {
    name: "Sophie C",
    rating: 5,
    comment:
      "Une très belle rencontre. Valeycia est une thérapeute disponible compétente dans l’empathie et la bienveillance. Elle propose des séances et des soins de qualité. Elle m’a tout de suite mise à l’aise. Je recommande vivement. Merci pour tout Valeycia.",
    dateCreated: " 24/01/2024",
    hourCreated: "15:41",
  },
  {
    name: "Maryline B",
    rating: 5,
    comment:
      "Accueil agréable et respectueux. Jai apprécié le contact facile qui m'a permis de me mettre a l'aise rapidement. Belle qualite d'écoute et une bienveillance à tous les niveaux. Je suis partie apaisée et sereine. Merci beaucoup.",
    dateCreated: "18/01/2024",
    hourCreated: "23:13",
  },
  {
    name: "Inès C",
    rating: 5,
    comment:
      "Je recommande vivement car elle est lumière et bienveillance. Ses soins de qualité vous apportent un bien être immédiat. Je vois le résultat au quotidien dans ma vie. Merci Valeycia !",
    dateCreated: "06/01/2024",
    hourCreated: "13:06",
  },
  {
    name: "Véronique F",
    rating: 5,
    comment:
      "Le contact avec Valeycia est facile et agréable. Elle est toujours bienveillante, sans jugement et apporte une aide précieuse.",
    dateCreated: "16/11/2023",
    hourCreated: "18:41",
  },
  {
    name: "Michelle B.",
    rating: 5,
    comment:
      "Madame Valeycia FORTUNE est une thérapeute qui a beaucoup de bienveillance dans sa manière d'aborder les choses. Elle a su cerner mon problème et me mettre à l'aise afin que nous étudions ensemble des solutions pour résoudre ma situation et surtout pour me sentir mieux. Je la recommanderai à d'autres",
    dateCreated: "26/09/2023",
    hourCreated: "14:54",
  },
];
