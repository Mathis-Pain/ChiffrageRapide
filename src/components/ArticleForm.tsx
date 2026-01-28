import {useState, FormEvent} from "react";
import {Article} from "../types/Article";

interface ArticleFormProps {
  onAdd: (article: Omit<Article, "id">) => void;
}

const ArticleForm: React.FC<ArticleFormProps> = ({onAdd}) => {
  // États pour chaque champ du formulaire
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unitPrice, setUnitPrice] = useState("");

  /**
   * Gestion de la soumission du formulaire
   */
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validation : vérifier que tous les champs sont remplis
    if (!name.trim() || !quantity || !unitPrice) {
      alert("Veuillez remplir tous les champs");
      return;
    }

    // Validation : vérifier que les valeurs numériques sont valides
    const parsedQuantity = Number(quantity);
    const parsedUnitPrice = Number(unitPrice);

    if (parsedQuantity <= 0 || parsedUnitPrice <= 0) {
      alert("La quantité et le prix doivent être supérieurs à 0");
      return;
    }

    // Création de l'objet article
    const newArticle: Omit<Article, "id"> = {
      nom: name.trim(),
      quantite: parsedQuantity,
      prixUnitaire: parsedUnitPrice,
    };

    // Envoi au composant parent
    onAdd(newArticle);

    // Réinitialisation du formulaire
    setName("");
    setQuantity("");
    setUnitPrice("");
  };

  return (
    <form className="article-form" onSubmit={handleSubmit}>
      {/* Champ : nom de l'article */}
      <input
        type="text"
        placeholder="Nom de l'article"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      {/* Champ : quantité */}
      <input
        type="number"
        placeholder="Quantité"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        min="1"
        required
      />

      {/* Champ : prix unitaire */}
      <input
        type="number"
        placeholder="Prix unitaire (€)"
        value={unitPrice}
        onChange={(e) => setUnitPrice(e.target.value)}
        min="0.01"
        step="0.01"
        required
      />

      {/* Bouton de soumission */}
      <button type="submit">Ajouter</button>
    </form>
  );
};

export default ArticleForm;
