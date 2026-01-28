import {Article} from "./Article";

// Type représentant un projet de devis Contient une liste d'articles

export interface Projet {
  id: number; // Identifiant unique du projet
  nom: string; // Nom du projet
  articles: Article[]; // Liste des articles du projet
}
