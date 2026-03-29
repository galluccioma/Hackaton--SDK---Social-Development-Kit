// Mock data for the neighborhood activities platform

export type Difficulty = "easy" | "medium" | "hard"

export interface StarterKit {
  id: string
  title: string
  category: string
  description: string
  difficulty: Difficulty
  estimatedParticipants: string
  duration: string
  image: string
  steps: string[]
}

export interface Collaborator {
  id: string
  name: string
  avatar: string
}

export interface PendingProject {
  id: string
  title: string
  neighborhood: string
  category: string
  description: string
  currentCollaborators: number
  requiredCollaborators: number
  collaborators: Collaborator[]
  likes: number
  status: "in-partenza" | "in-corso" | "completato"
  plannedActivity: string
  image: string
}

export interface Location {
  id: string
  name: string
  capacity: number
  type: "indoor" | "outdoor"
  address: string
  coordinates: { lat: number; lng: number }
}

export interface User {
  id: string
  name: string
  avatar: string
  interests: string[]
  neighborhood: string
}

export const neighborhoods = [
  "San Salvario",
  "Vanchiglia",
  "Aurora",
  "Barriera di Milano",
  "Crocetta",
  "Cenisia",
  "San Paolo",
  "Santa Rita",
  "Lingotto",
  "Mirafiori",
]

export const activityTypes = [
  "Sport",
  "Cultura",
  "Sociale",
  "Musica",
  "Arte",
  "Ambiente",
  "Food",
  "Gaming",
]

export const starterKits: StarterKit[] = [
{
    id: "1",
    title: "Swap Party di Quartiere",
    category: "Sostenibilità",
    description: "Organizza un evento di scambio vestiti e oggetti per dare nuova vita all'usato e creare legami nel vicinato.",
    difficulty: "easy",
    estimatedParticipants: "15-30",
    duration: "4-6 ore",
    image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&auto=format&fit=crop",
    steps: [
      "Trova uno spazio adatto (cortile condominiale o sala comune)",
      "Definisci le regole (es. max 10 pezzi a testa, solo oggetti puliti)",
      "Procura stand, grucce e tavoli per l'esposizione",
      "Promuovi l'evento con volantini nei portoni e sui gruppi social",
      "Allestisci un angolo caffè per favorire la socializzazione durante lo scambio",
    ],
  },
  {
    id: "2",
    title: "Torneo di Ping Pong",
    category: "Sport",
    description: "Trasforma una piazza o un garage in un'arena sportiva. Un torneo aperto a tutte le età per sfidarsi in allegria.",
    difficulty: "easy",
    estimatedParticipants: "16-32",
    duration: "1 giorno",
    image: "https://images.unsplash.com/photo-1534158914592-062992fbe900?w=800&auto=format&fit=crop",
    steps: [
      "Recupera almeno 2 tavoli da ping pong (anche pieghevoli)",
      "Crea un tabellone per le iscrizioni (singolo o doppio)",
      "Prepara racchette e palline di scorta",
      "Definisci un piccolo premio simbolico per il vincitore",
      "Organizza la musica di sottofondo e una zona arbitro",
    ],
  },
  {
    id: "3",
    title: "Social Dinner",
    category: "Food",
    description: "Una grande tavolata dove ogni vicino porta un piatto da condividere. Il modo più semplice per conoscersi mangiando.",
    difficulty: "medium",
    estimatedParticipants: "20-50",
    duration: "3-4 ore",
    image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&auto=format&fit=crop",
    steps: [
      "Scegli la location (via pedonale o cortile) e verifica i permessi",
      "Crea un foglio condiviso per coordinare chi porta cosa (antipasti, primi, dolci)",
      "Organizza il noleggio o il prestito di tavoli lunghi e panche",
      "Assicurati di avere un piano per la gestione dei rifiuti e la pulizia finale",
      "Prepara dei segnaposto creativi per mescolare i vicini che non si conoscono",
    ],
  },
]

export const pendingProjects: PendingProject[] = [
  {
    id: "1",
    title: "Cineforum in San Salvario",
    neighborhood: "San Salvario",
    category: "Cultura",
    description: "Stiamo organizzando un cineforum settimanale nel cortile del centro sociale. Cerchiamo collaboratori per gestire proiezioni e dibattiti.",
    currentCollaborators: 3,
    requiredCollaborators: 5,
    collaborators: [
      { id: "u1", name: "Marco R.", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" },
      { id: "u2", name: "Sara L.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" },
      { id: "u3", name: "Luca B.", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop" },
    ],
    likes: 24,
    status: "in-partenza",
    plannedActivity: "Proiezioni ogni venerdì sera con discussione finale. Tema del primo mese: cinema italiano neorealista.",
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&auto=format&fit=crop",
  },
  {
    id: "2",
    title: "Torneo di basket 3vs3",
    neighborhood: "Aurora",
    category: "Sport",
    description: "Torneo di basket estivo per giovani del quartiere. Cerchiamo arbitri e organizzatori.",
    currentCollaborators: 4,
    requiredCollaborators: 6,
    collaborators: [
      { id: "u4", name: "Giulia M.", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop" },
      { id: "u5", name: "Andrea P.", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" },
      { id: "u6", name: "Chiara F.", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop" },
      { id: "u7", name: "Paolo V.", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop" },
    ],
    likes: 18,
    status: "in-partenza",
    plannedActivity: "Torneo ad eliminazione diretta con 8 squadre. Partite nel weekend per 3 settimane consecutive.",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&auto=format&fit=crop",
  },
  {
    id: "3",
    title: "Mercatino vintage",
    neighborhood: "Vanchiglia",
    category: "Sociale",
    description: "Organizziamo un mercatino mensile di oggetti vintage e artigianato locale.",
    currentCollaborators: 2,
    requiredCollaborators: 4,
    collaborators: [
      { id: "u8", name: "Elena T.", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop" },
      { id: "u9", name: "Davide S.", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" },
    ],
    likes: 31,
    status: "in-partenza",
    plannedActivity: "Prima domenica di ogni mese in piazza. Stand per venditori locali con piccola quota di partecipazione.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop",
  },
  {
    id: "4",
    title: "Gruppo corsa mattutina",
    neighborhood: "Crocetta",
    category: "Sport",
    description: "Running group per chi vuole correre in compagnia prima del lavoro.",
    currentCollaborators: 5,
    requiredCollaborators: 5,
    collaborators: [
      { id: "u10", name: "Marta G.", avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&h=100&fit=crop" },
      { id: "u11", name: "Roberto C.", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop" },
      { id: "u12", name: "Alessia N.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" },
      { id: "u13", name: "Federico L.", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" },
      { id: "u14", name: "Silvia R.", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop" },
    ],
    likes: 42,
    status: "in-corso",
    plannedActivity: "Corsa di 5-7km ogni martedì e giovedì alle 7:00. Ritrovo al parco del Valentino.",
    image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800&auto=format&fit=crop",
  },
  {
    id: "5",
    title: "Laboratorio murales",
    neighborhood: "Barriera di Milano",
    category: "Arte",
    description: "Progetto di riqualificazione urbana attraverso murales collettivi.",
    currentCollaborators: 3,
    requiredCollaborators: 7,
    collaborators: [
      { id: "u15", name: "Giorgia P.", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop" },
      { id: "u16", name: "Matteo B.", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop" },
      { id: "u17", name: "Valeria D.", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop" },
    ],
    likes: 56,
    status: "in-partenza",
    plannedActivity: "Realizzazione di 3 murales su muri autorizzati. Workshop aperti a tutti per imparare le tecniche.",
    image: "/img/murales.jpg",
  },
]

export const locations: Location[] = [
  {
    id: "l1",
    name: "Centro Sociale Aurora",
    capacity: 50,
    type: "indoor",
    address: "Via Cigna 45, Torino",
    coordinates: { lat: 45.0892, lng: 7.6931 },
  },
  {
    id: "l2",
    name: "Parco del Valentino",
    capacity: 200,
    type: "outdoor",
    address: "Corso Massimo d'Azeglio, Torino",
    coordinates: { lat: 45.0547, lng: 7.6869 },
  },
  {
    id: "l3",
    name: "Cortile Interno Via Nizza",
    capacity: 30,
    type: "outdoor",
    address: "Via Nizza 52, Torino",
    coordinates: { lat: 45.0544, lng: 7.6768 },
  },
  {
    id: "l4",
    name: "Sala Parrocchiale San Paolo",
    capacity: 80,
    type: "indoor",
    address: "Via Osasco 15, Torino",
    coordinates: { lat: 45.0645, lng: 7.6412 },
  },
  {
    id: "l5",
    name: "Campo sportivo Lingotto",
    capacity: 100,
    type: "outdoor",
    address: "Via Nizza 280, Torino",
    coordinates: { lat: 45.0298, lng: 7.6656 },
  },
]

export const currentUser: User = {
  id: "current",
  name: "Giovanni Rossi",
  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
  interests: ["Sport", "Cultura", "Musica"],
  neighborhood: "San Salvario",
}
