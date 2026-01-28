//ype représentant un article dans un devis
export interface Article {
  id: number; // Identifiant unique de l'article
  nom: string; // Nom/désignation de l'article
  quantite: number; // Quantité commandée
  prixUnitaire: number; // Prix unitaire en euros
}
