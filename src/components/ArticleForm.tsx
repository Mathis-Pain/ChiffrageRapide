//React : nécessaire pour créer un composant React
// useState : hook React pour stocker des données (état) recuperer ce que l'utilisateur tape dans le formulaire
import React, {useState} from "react";

// interface : mot clef TypeScript pour définir la forme des props attendues par le composant
// onAdd : c’est une fonction fournie par le composant parent
// => void signifie que la fonction ne renvoi rien
interface ArticleFormProps {
  onAdd: (nom: string, quantite: number, prixUnitaire: number) => void;
}
// On crée un composant React appelé ArticleForm (majuscule au debut du nom du composant par convention)
// React.FC = React Function Component / <ArticleFormProps>  ce composant reçoit des props du type ArticleFormProps
// ArticleForm est un composant qui reçoit une fonction onAdd depuis son parent
const ArticleForm: React.FC<ArticleFormProps> = ({onAdd}) => {
  // nom = valeur actuelle / setNom = fonction pour la modifier / "" = valeur initiale (vide)
  const [nom, setNom] = useState("");
  const [quantite, setQuantite] = useState("");
  const [prixUnitaire, setPrixUnitaire] = useState("");
  // Fonction appelée quand on soumet le formulaire (e = événement TypeScript sait que c’est un submit de formulaire)
  const handleSubmit = (e: React.FormEvent) => {
    // empeche le comportement par défaut du formulaire (rechargement de la page)
    e.preventDefault();

    if (nom && quantite && prixUnitaire) {
      //le formulaire envoie les donnéesau composant parent Number() transforme le texte en nombre (toujours recuperé en string dans un formulaire)
      onAdd(nom, Number(quantite), Number(prixUnitaire));
      // Réinitialise les champs du formulaire après l'envoi
      setNom("");
      setQuantite("");
      setPrixUnitaire("");
    }
  };
  // Le composant retourne un formulaire JSX (le rendu visuel)
  return (
    <form onSubmit={handleSubmit} className="article-form">
      <input
        type="text"
        placeholder="Nom de l'article"
        value={nom}
        // Met à jour l'état nom quand l'utilisateur tape dans le champ
        onChange={(e) => setNom(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Quantité"
        value={quantite}
        onChange={(e) => setQuantite(e.target.value)}
        // empeche de saisir des valeurs négatives
        min="1"
        required
      />
      <input
        type="number"
        placeholder="Prix unitaire"
        value={prixUnitaire}
        onChange={(e) => setPrixUnitaire(e.target.value)}
        min="0"
        // permet les décimales
        step="0.01"
        required
      />
      <button type="submit">Ajouter</button>
    </form>
  );
};
// On exporte le composant pour pouvoir l'utiliser dans d'autres fichiers
export default ArticleForm;
// important react recharge le rendu a chaque modification de l'état (state)
