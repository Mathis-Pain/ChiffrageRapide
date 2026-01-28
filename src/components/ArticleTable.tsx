import {Article} from "../types/Article";

interface ArticleTableProps {
  articles: Article[];
  onDelete: (id: number) => void;
  onUpdateQuantity: (id: number, delta: number) => void;
}

const ArticleTable: React.FC<ArticleTableProps> = ({
  articles,
  onDelete,
  onUpdateQuantity,
}) => {
  /**
   * Calcule le prix total d'une ligne (quantité × prix unitaire)
   */
  const calculateLineTotal = (article: Article): number => {
    return article.quantite * article.prixUnitaire;
  };

  /**
   * Calcule le total général de tous les articles
   */
  const calculateGrandTotal = (): number => {
    return articles.reduce(
      (sum, article) => sum + calculateLineTotal(article),
      0,
    );
  };

  // Message si aucun article
  if (articles.length === 0) {
    return (
      <p className="empty-message">
        Aucun article pour le moment. Ajoutez-en un ci-dessus ! 📦
      </p>
    );
  }

  return (
    <div className="table-container">
      <table>
        {/* En-tête du tableau */}
        <thead>
          <tr>
            <th>Nom</th>
            <th>Quantité</th>
            <th>Prix unitaire</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>

        {/* Corps du tableau */}
        <tbody>
          {articles.map((article) => (
            <tr key={article.id}>
              {/* Nom de l'article */}
              <td data-label="Nom">{article.nom}</td>

              {/* Contrôles de quantité avec boutons - (rouge) et + (vert) */}
              <td data-label="Quantité">
                <div className="quantite-controls">
                  <button
                    className="btn-quantite"
                    onClick={() => onUpdateQuantity(article.id, -1)}
                    title="Diminuer la quantité"
                  >
                    −
                  </button>
                  <span className="quantite-value">{article.quantite}</span>
                  <button
                    className="btn-quantite"
                    onClick={() => onUpdateQuantity(article.id, 1)}
                    title="Augmenter la quantité"
                  >
                    +
                  </button>
                </div>
              </td>

              {/* Prix unitaire */}
              <td data-label="Prix unitaire" className="prix">
                {article.prixUnitaire.toFixed(2)} €
              </td>

              {/* Prix total de la ligne */}
              <td data-label="Total" className="prix total-ligne">
                {calculateLineTotal(article).toFixed(2)} €
              </td>

              {/* Bouton de suppression ROUGE avec texte "Supprimer" */}
              <td data-label="Actions">
                <button
                  className="btn-supprimer"
                  onClick={() => onDelete(article.id)}
                  title="Supprimer l'article"
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>

        {/* Pied de tableau avec total général */}
        <tfoot>
          <tr>
            <td colSpan={3} className="total-label">
              <strong>Total général</strong>
            </td>
            <td className="prix total-general">
              <strong>{calculateGrandTotal().toFixed(2)} €</strong>
            </td>
            <td></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default ArticleTable;
