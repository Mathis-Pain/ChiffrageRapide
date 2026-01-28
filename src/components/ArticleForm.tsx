import React, {useState} from "react";

interface ArticleFormProps {
  onAdd: (nom: string, quantite: number, prixUnitaire: number) => void;
}

const ArticleForm: React.FC<ArticleFormProps> = ({onAdd}) => {
  const [nom, setNom] = useState("");
  const [quantite, setQuantite] = useState("");
  const [prixUnitaire, setPrixUnitaire] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (nom && quantite && prixUnitaire) {
      onAdd(nom, Number(quantite), Number(prixUnitaire));
      setNom("");
      setQuantite("");
      setPrixUnitaire("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="article-form">
      <input
        type="text"
        placeholder="Nom de l'article"
        value={nom}
        onChange={(e) => setNom(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Quantité"
        value={quantite}
        onChange={(e) => setQuantite(e.target.value)}
        min="1"
        required
      />
      <input
        type="number"
        placeholder="Prix unitaire"
        value={prixUnitaire}
        onChange={(e) => setPrixUnitaire(e.target.value)}
        min="0"
        step="0.01"
        required
      />
      <button type="submit">Ajouter</button>
    </form>
  );
};

export default ArticleForm;
