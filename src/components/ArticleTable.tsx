import React from "react";
import {Article} from "../types/Article";

interface ArticleTableProps {
  articles: Article[];
  onDelete: (id: number) => void;
}

const ArticleTable: React.FC<ArticleTableProps> = ({articles, onDelete}) => {
  const calculerPrixTotal = (
    quantite: number,
    prixUnitaire: number,
  ): number => {
    return quantite * prixUnitaire;
  };

  const calculerTotal = (): number => {
    return articles.reduce((total, article) => {
      return total + calculerPrixTotal(article.quantite, article.prixUnitaire);
    }, 0);
  };

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
          {articles.map((article) => (
            <tr key={article.id}>
              <td data-label="Nom">{article.nom}</td>
              <td data-label="Quantité">{article.quantite}</td>
              <td data-label="Prix Unitaire">
                {article.prixUnitaire.toFixed(2)} €
              </td>
              <td data-label="Prix Total">
                {calculerPrixTotal(
                  article.quantite,
                  article.prixUnitaire,
                ).toFixed(2)}{" "}
                €
              </td>
              <td data-label="Action">
                <button
                  onClick={() => onDelete(article.id)}
                  className="btn-delete"
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
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

export default ArticleTable;
