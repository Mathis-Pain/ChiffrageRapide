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

  return (
    <div className="App">
      <header>
        <h1>Chiffrage Rapide</h1>
      </header>
      <main>
        <ArticleForm onAdd={ajouterArticle} />
        {articles.length > 0 ? (
          <ArticleTable articles={articles} onDelete={supprimerArticle} />
        ) : (
          <p className="empty-message">Aucun article ajouté</p>
        )}
      </main>
    </div>
  );
};

export default App;
