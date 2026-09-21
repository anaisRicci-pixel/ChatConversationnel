import type { MobileNavItem } from "@/components/molecules/MobileNav";

// ─── Domain types ─────────────────────────────────────────────────────────────

export interface Project {
  id: string;
  name: string;
  instructions?: string;
  date: string;
  pinned: boolean;
  expired?: boolean;
}

export type SourceType = "xlsx" | "xls" | "pdf" | "jpg" | "jpeg" | "png" | "docx" | "md" | "json";

export interface Source {
  id: string;
  projectId: string;
  name: string;
  type: SourceType;
  size: number;
  date: string;
  previewUrl?: string;
}

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  webSearch?: boolean;
  sourceRefs?: string[];
}

export interface Chat {
  id: string;
  projectId: string;
  title: string;
  date: string;
  pinned: boolean;
  messages: Message[];
}

// ─── Navigation ───────────────────────────────────────────────────────────────

export const PINNED_ITEMS: MobileNavItem[] = [
  { id: "p1", label: "A quoi sert Open Router ?" },
  { id: "p2", label: "Peux tu me proposer un plan de migration AZURE?" },
];

export const RECENT_ITEMS: MobileNavItem[] = [
  { id: "c1", label: "Quelle est ma consommation de token de ce mois ?" },
  { id: "c2", label: "Dans quels cas utiliser Fable 5 ?" },
  { id: "c3", label: "What are Pros and Cons for LLM use ?", isProject: true },
  { id: "c4", label: "Je souhaite réaliser une automation avec N8N", isProject: true },
  { id: "c5", label: "Réalise un benchmark des outils open sources" },
];

// ─── Suggested prompts ────────────────────────────────────────────────────────

export const SUGGESTED_PROMPTS_MOBILE = [
  "Crée un plan d'action basé sur ce fichier Power Point.",
  "Résume ce document en 5 points clés.",
  "Rédige un email de suivi client.",
];

export const SUGGESTED_PROMPTS_DESKTOP = [
  { title: "Présentation", text: "Crée un plan d'action basé sur ce fichier Power Point." },
  { title: "Résumé", text: "Résume ce document en 5 points clés." },
  { title: "Email", text: "Rédige un email de suivi client." },
  { title: "Analyse", text: "Analyse les données de ce tableau Excel." },
  { title: "Stratégie", text: "Propose une stratégie de communication pour ce projet." },
  { title: "Rapport", text: "Génère un rapport hebdomadaire à partir de ces notes." },
];

// ─── Projets ──────────────────────────────────────────────────────────────────

export const MOCK_PROJECTS: Project[] = [
  {
    id: "proj-1",
    name: "Migration Azure",
    instructions: "Plan de migration complet de l'infrastructure on-premise vers Azure, incluant la stratégie de transition et les étapes clés.",
    date: "Modifié le 12 sept. 2026",
    pinned: true,
  },
  {
    id: "proj-2",
    name: "Benchmark LLM",
    instructions: "Comparatif des modèles open source disponibles pour un déploiement interne sécurisé.",
    date: "Modifié le 10 sept. 2026",
    pinned: true,
  },
  {
    id: "proj-3",
    name: "Automatisation N8N",
    instructions: "Workflows d'automatisation des processus métier via N8N : onboarding, relances, reporting.",
    date: "Modifié le 8 sept. 2026",
    pinned: false,
  },
  {
    id: "proj-4",
    name: "Open Router",
    instructions: "Intégration d'Open Router comme gateway LLM unifié pour centraliser les appels API.",
    date: "Modifié le 3 sept. 2026",
    pinned: false,
  },
  {
    id: "proj-5",
    name: "Veille technologique",
    instructions: "Synthèse mensuelle des tendances IA/cloud à destination des équipes techniques.",
    date: "Modifié le 28 août 2026",
    pinned: false,
  },
  {
    id: "proj-6",
    name: "Sécurité des données",
    instructions: "Audit des pratiques de sécurité et recommandations pour la conformité RGPD.",
    date: "Modifié le 15 août 2026",
    pinned: false,
  },
  {
    id: "proj-7",
    name: "Refonte UX portail",
    instructions: "Refonte de l'expérience utilisateur du portail interne — recherche, wireframes et tests.",
    date: "Expire dans 3 jours",
    pinned: false,
    expired: true,
  },
];

// Helper : transforme un Project en props ProjetCard
export function projectToCardProps(p: Project) {
  return {
    id: p.id,
    titre: p.name,
    description: p.instructions,
    date: p.date,
    pinned: p.pinned,
  };
}

// ─── Sources (pour proj-2) ────────────────────────────────────────────────────

export const MOCK_SOURCES: Source[] = [
  { id: "src-1", projectId: "proj-2", name: "Benchmark_GPT4.xlsx", type: "xlsx", size: 245000, date: "Ajouté le 10 sept. 2026" },
  { id: "src-2", projectId: "proj-2", name: "Rapport_Gartner_2026.pdf", type: "pdf", size: 3200000, date: "Ajouté le 9 sept. 2026" },
  { id: "src-3", projectId: "proj-2", name: "Gartner_graph.jpg", type: "jpg", size: 820000, date: "Ajouté le 9 sept. 2026", previewUrl: "/avatar.png" },
  { id: "src-4", projectId: "proj-2", name: "Notes_benchmark.md", type: "md", size: 12000, date: "Ajouté le 8 sept. 2026" },
  { id: "src-5", projectId: "proj-2", name: "config_modeles.json", type: "json", size: 4500, date: "Ajouté le 7 sept. 2026" },
  { id: "src-6", projectId: "proj-2", name: "Synthese_finale.docx", type: "docx", size: 185000, date: "Ajouté le 6 sept. 2026" },
];

// ─── Chats ────────────────────────────────────────────────────────────────────

export const MOCK_CHATS: Chat[] = [
  {
    id: "chat-1",
    projectId: "proj-2",
    title: "Comparaison GPT-4o vs Claude Opus",
    date: "Aujourd'hui",
    pinned: true,
    messages: [
      {
        id: "msg-1",
        role: "user",
        content: "Compare GPT-4o et Claude Opus sur les critères coût, latence et qualité de raisonnement.",
        webSearch: false,
      },
      {
        id: "msg-2",
        role: "assistant",
        content: "D'après le rapport Gartner 2026 [src-2] et les données du benchmark [src-1], voici la comparaison : GPT-4o affiche une latence médiane de 1,2s contre 1,8s pour Claude Opus, mais Claude Opus obtient de meilleurs scores sur les tâches de raisonnement multi-étapes...",
        sourceRefs: ["src-1", "src-2"],
      },
    ],
  },
  {
    id: "chat-2",
    projectId: "proj-2",
    title: "Recommandations déploiement interne",
    date: "Hier",
    pinned: false,
    messages: [
      {
        id: "msg-3",
        role: "user",
        content: "Quels modèles recommandes-tu pour un déploiement interne sécurisé ?",
        webSearch: true,
      },
      {
        id: "msg-4",
        role: "assistant",
        content: "En combinant les résultats de la recherche web et les notes du projet [src-4], je recommande en priorité Mistral Large pour son équilibre performance/coût, et Llama 3.1 70B pour les cas nécessitant un hébergement on-premise...",
        sourceRefs: ["src-4"],
        webSearch: true,
      },
    ],
  },
];
