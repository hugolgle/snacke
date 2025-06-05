# 🧪 BDD – Snake Game

## 🎯 Objectif

Décrire les comportements attendus de l'application _SnakeGame_ en se plaçant du point de vue de l'utilisateur, en précisant les scénarios fonctionnels principaux, l'expérience utilisateur et l’interface.

---

## 🟢 Fonctionnalité : Démarrer une partie

**En tant que** joueur  
**Je veux** cliquer sur un bouton "Jouer"  
**Afin de** commencer une nouvelle partie de Snake

### Scénario 1 : Lancer une partie

- Étant donné que je suis sur la page du jeu
- Quand je clique sur le bouton **"Jouer"**
- Alors la partie commence
- Et le plateau s'affiche avec un serpent initial et une nourriture

### Scénario 2 : Empêcher le lancement si déjà en cours

- Étant donné que je suis en train de jouer
- Quand je reclique sur **"Jouer"**
- Alors rien ne se passe
- Et la partie actuelle continue

---

## ☠️ Fonctionnalité : Perdre la partie

**En tant que** joueur  
**Je veux** que la partie s'arrête si je percute un mur ou moi-même  
**Afin de** savoir que j’ai perdu

### Scénario 1 : Collision avec un mur

- Étant donné que je joue
- Quand la tête du serpent sort du plateau
- Alors la partie se termine
- Et "Game Over" s'affiche

### Scénario 2 : Collision avec soi-même

- Étant donné que le serpent a grandi
- Quand la tête touche une partie de son propre corps
- Alors la partie se termine
- Et "Game Over" s'affiche

---

## 🔄 Fonctionnalité : Rejouer

**En tant que** joueur  
**Je veux** pouvoir recommencer une partie  
**Afin de** m’améliorer

### Scénario 1 : Rejouer après une défaite

- Étant donné que la partie est terminée
- Quand je clique sur **"Rejouer"**
- Alors une nouvelle partie démarre avec le serpent réinitialisé

### Scénario 2 : Réinitialisation complète

- Étant donné que j’ai perdu
- Quand je clique sur **"Rejouer"**
- Alors le score repart de 0
- Et une nouvelle position de nourriture est générée

---

## 🍏 Fonctionnalité : Manger de la nourriture

**En tant que** joueur  
**Je veux** que le serpent grandisse quand il mange  
**Afin de** faire progresser la partie

### Scénario 1 : Manger une nourriture

- Étant donné que la nourriture est devant la tête du serpent
- Quand le serpent avance et atteint la nourriture
- Alors le serpent s’allonge
- Et une nouvelle nourriture apparaît

### Scénario 2 : Plusieurs aliments consommés

- Étant donné que j’ai déjà mangé une nourriture
- Quand j’en mange une autre
- Alors le score augmente de 1 à chaque fois
- Et le serpent continue de grandir

---

## 🍏 Fonctionnalité : GameOver (collision avec soi-même)

**En tant que** joueur  
**Je veux** que la partie s'arrête lorsque le serpent se touche  
**Afin de** d'arrêter la partie

### Scénario 1 : Collision avec soi-même

- Étant donné que je suis en train de jouer
- Et que le serpent forme une boucle
- Quand je me dirige vers mon propre corps
- Alors "Game Over" s’affiche
- Et le bouton "Rejouer" est visible

---

## 🏆 Fonctionnalité : Afficher le score et le record

**En tant que** joueur  
**Je veux** voir mon score et mon record  
**Afin de** suivre ma progression

### Scénario 1 : Afficher le score en temps réel

- Étant donné que je suis en jeu
- Quand je mange une nourriture
- Alors le score affiché augmente immédiatement

### Scénario 2 : Enregistrer un nouveau record

- Étant donné que je termine une partie avec un score élevé
- Quand mon score dépasse le précédent record
- Alors il est stocké dans le `localStorage`
- Et affiché en haut de l’écran

---

## 💻 Interface et expérience utilisateur (UX/UI)

- Design responsive centré (flexbox Tailwind)
- Couleurs contrastées (fond sombre, serpent vert, nourriture rouge)
- Boutons visibles et intuitifs ("Jouer", "Rejouer")
- Commandes via les flèches du clavier
- Affichage clair des scores
- Plateau en grille visible avec animation fluide
