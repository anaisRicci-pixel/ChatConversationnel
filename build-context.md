# build-context.md

## Contexte
- SecuredChatGPT : plateforme SaaS interne (OnPrem) type ChatGPT, ~30 000 utilisateurs actifs/mois (Safran).
- Nouvelle fonctionnalité "Projet" : espace personnel de connaissances. L'utilisateur stocke des documents sources exploités par l'assistant, et lance des chats contextualisés à l'intérieur du projet.
- Rétention : projets et chats associés conservés 1 an, puis expiration.

## Objectif du build
- Prototype responsive cliquable (pas de vrai backend/IA — tout est mocké).

## Parcours à couvrir (scope exact — ne rien ajouter, ne rien retirer)

**Gérer un projet**
- Créer (depuis nav latérale "+" ou page "Liste des projets" → bouton "créer") → ouvre la page projet, apparaît dans "Liste des projets"
- Modifier nom + instructions (accessible depuis nav latérale, liste des projets, ou page projet "...") — nom limité à 15 caractères, saisie bloquée au-delà
- Supprimer (depuis liste des projets ou depuis la page projet) — confirmation par pop-up
- Épingler (depuis nav latérale ou liste des projets) — apparaît en section "épinglé" avec icône active

**Gérer les sources**
- Uploader un fichier → apparaît dans onglet "Sources". Gérer : doublon, format non supporté, fichier trop lourd
- Télécharger (depuis onglet Sources "..." OU depuis pop-up d'aperçu dans un chat)
- Visualiser (clic fichier → pop-up aperçu). Si format non affichable (ex. XLS) → message "affichage impossible" + bouton télécharger
- Supprimer (onglet Sources → "..." → supprimer)

**Travailler dans un projet**
- Créer un chat contextualisé (lancé depuis la barre de chat du projet) → apparaît dans onglet "Chats" du projet ET dans nav latérale section "Discussions" avec icône "discussion" (vs icône "Timer" pour un chat hors-projet). Durée de vie 1 an. Fichiers uploadés dans le chat = stockés dans le chat uniquement, jamais dans l'onglet Sources du projet
- Référencer un fichier source dans une réponse → lien cliquable dans le paragraphe concerné. Cas : 1 fichier, plusieurs fichiers, fichier uploadé dans le chat (hors sources projet)
- Recherche web dans un chat : activation via "+" → "recherche sur le web" (tag visible dans la barre, reste actif jusqu'à suppression manuelle). Loader "Rechercher sur le web" pendant l'exécution
- Visualiser un fichier référencé dans un chat → pop-up aperçu + bouton télécharger. Formats supportés : PDF, XLS, DOCX, PNG, JPG. Si non affichable → proposer téléchargement
- Épingler un chat (depuis page projet "..." ou nav latérale section "Discussions" "...") → apparaît section "épinglé" avec icône active
- Supprimer un chat du projet (depuis onglet Chats ou nav latérale, avec confirmation) → retiré de la liste des chats ET de la nav latérale

## États d'écran requis
- Page "Liste des projets" : état vide / état avec projets
- Section "Projet" de la nav latérale : état vide / état avec projets
- Edge case global : projet expiré → bannière d'alerte sur la page

## Contraintes de design (non négociables)
- Responsive mobile + desktop
- WCAG AA
- Light & dark mode
- Composants = Figma fourni (lien dans spec.md), mais icônes toujours remplacées par Lucide React (jamais les icônes du Figma)
- Couleurs/styles/spacing/radius uniquement depuis les tokens de design.md — ne jamais inventer de code hex

## Stack
- Next.js + Tailwind, déploiement Vercel
- Icônes : Lucide React uniquement
- tailwind.config.js doit consommer les tokens de design.md

## Fichiers à lire (dans l'ordre, ne pas tout coller d'un coup)
1. build-context.md (ce fichier)
2. spec.md — écrans, états, flows détaillés, ce qui est mocké, hors scope
3. design.md — tokens couleur/typo/spacing/radius
4. reference/ — captures SecuredChatGPT (UI à matcher)
5. public/images/ — images et avatars à utiliser
