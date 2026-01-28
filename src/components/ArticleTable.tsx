import React from "react";
import {Article} from "../types/Article";

// Interface des props reçues par le composant
interface ArticleTableProps {
  // Liste des articles à afficher (vient du parent)
  articles: Article[];
  // Fonction envoyée par le parent pour supprimer un article
  // Prend un id et ne retourne rien (void)
  onDelete: (id: number) => void;
  // Fonction pour modifier la quantité
  onUpdateQuantite: (id: number, delta: number) => void;
}

// Déclaration du composant React ArticleTable
// Il reçoit articles et onDelete via les props
const ArticleTable: React.FC<ArticleTableProps> = ({
  articles,
  onDelete,
  onUpdateQuantite,
}) => {
  // Fonction qui calcule le prix total d'un article
  // quantité × prix unitaire
  const calculerPrixTotal = (
    quantite: number,
    prixUnitaire: number,
  ): number => {
    return quantite * prixUnitaire;
  };

  // Fonction qui calcule le total général de tous les articles
  const calculerTotal = (): number => {
    // reduce permet de parcourir le tableau articles
    // total = somme en cours
    // article = article actuel
    // On ajoute le prix total de chaque article
    // 0 = valeur de départ
    return articles.reduce((total, article) => {
      return total + calculerPrixTotal(article.quantite, article.prixUnitaire);
    }, 0);
  };

  // Rendu du composant (appelé à chaque changement de props)
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Quantité</th>
            <th>Prix Unitaire</th>
            <th>Prix Total</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {/* On transforme chaque article en ligne de tableau */}
          {articles.map((article) => (
            // key est obligatoire pour React
            <tr key={article.id}>
              {/* Nom de l'article */}
              <td data-label="Nom">{article.nom}</td>

              {/* Quantité */}
              <td data-label="Quantité">
                <button
                  style={{
                    background:
                      "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                    color: "white",
                    borderRadius: "4px",
                    border: "solid 2px #f093fb ",
                    padding: "2px 8px",
                  }}
                  onClick={() => onUpdateQuantite(article.id, -1)}
                  disabled={article.quantite <= 0}
                >
                  −
                </button>

                <span style={{margin: "0 8px"}}>{article.quantite}</span>

                <button
                  style={{
                    backgroundColor: "#10b981",
                    color: "white",
                    borderRadius: "4px",
                    border: "solid 2px #10b981",
                    padding: "2px 8px",
                  }}
                  onClick={() => onUpdateQuantite(article.id, +1)}
                >
                  +
                </button>
              </td>

              {/* Prix unitaire formaté à 2 décimales */}
              <td data-label="Prix Unitaire">
                {article.prixUnitaire.toFixed(2)} €
              </td>

              {/* Prix total (quantité × prix unitaire) */}
              <td data-label="Prix Total">
                {calculerPrixTotal(
                  article.quantite,
                  article.prixUnitaire,
                ).toFixed(2)}{" "}
                €
              </td>

              {/* Bouton de suppression */}
              <td data-label="Action">
                <button
                  // Au clic, on appelle la fonction du parent
                  // avec l'id de l'article
                  onClick={() => onDelete(article.id)}
                  className="btn-delete"
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>

        {/* Pied du tableau : total général */}
        <tfoot>
          <tr>
            <td colSpan={3}>
              <strong>Total Général</strong>
            </td>
            <td colSpan={2}>
              <strong>{calculerTotal().toFixed(2)} €</strong>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

// Export du composant pour pouvoir l'utiliser ailleurs
export default ArticleTable;
