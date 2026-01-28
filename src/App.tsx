import React, {useState, useEffect} from "react";
import ArticleForm from "./components/ArticleForm";
import ArticleTable from "./components/ArticleTable";
import {Article} from "./types/Article";
import "./App.css";

const App: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  // Charger les données depuis localStorage
  useEffect(() => {
    const savedArticles = localStorage.getItem("articles");
    if (savedArticles) {
      setArticles(JSON.parse(savedArticles));
    }
  }, []);

  // Sauvegarder dans localStorage à chaque modification
  useEffect(() => {
    localStorage.setItem("articles", JSON.stringify(articles));
  }, [articles]);

  const ajouterArticle = (
    nom: string,
    quantite: number,
    prixUnitaire: number,
  ) => {
    const nouvelArticle: Article = {
      id: Date.now(),
      nom,
      quantite,
      prixUnitaire,
    };
    setArticles([...articles, nouvelArticle]);
  };

  const supprimerArticle = (id: number) => {
    setArticles(articles.filter((article) => article.id !== id));
  };

  // NOUVELLE FONCTION :
  // Modifie la quantité d'un article (+1 ou -1)
  // delta = +1 (bouton +) ou -1 (bouton -)
  const updateQuantite = (id: number, delta: number) => {
    setArticles((prevArticles) =>
      prevArticles.map((article) =>
        article.id === id
          ? {
              ...article,
              // Empêche la quantité de passer sous 0
              quantite: Math.max(0, article.quantite + delta),
            }
          : article,
      ),
    );
  };

  return (
    <div className="App">
      <header>
        <h1>Chiffrage Rapide</h1>
      </header>
      <main>
        <ArticleForm onAdd={ajouterArticle} />
        {articles.length > 0 ? (
          <ArticleTable
            articles={articles}
            onDelete={supprimerArticle}
            // NOUVELLE PROP :
            // Permet au tableau de demander une modification de quantité
            onUpdateQuantite={updateQuantite}
          />
        ) : (
          <p className="empty-message">Aucun article ajouté</p>
        )}
      </main>
    </div>
  );
};

export default App;
