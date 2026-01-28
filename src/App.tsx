import {useState} from "react";
import "./App.css";
import ArticleForm from "./components/ArticleForm";
import ArticleTable from "./components/ArticleTable";
import ProjectModal from "./components/ProjectModal";
import {Article} from "./types/Article";
import {Projet} from "./types/Projet";

function App() {
  // État global : liste de tous les projets (vide au démarrage)
  const [projects, setProjects] = useState<Projet[]>([]);

  // ID du projet actuellement sélectionné/affiché (null si aucun)
  const [activeProjectId, setActiveProjectId] = useState<number | null>(null);

  // État du modal de création de projet
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Récupération du projet actif depuis la liste
  const activeProject = projects.find((p) => p.id === activeProjectId);

  /**
   * Ajoute un nouvel article au projet actif
   * @param article - L'article à ajouter (sans ID, généré automatiquement)
   */
  const addArticle = (article: Omit<Article, "id">) => {
    setProjects((previousProjects) =>
      previousProjects.map((project) =>
        project.id === activeProjectId
          ? {
              ...project,
              // Ajout du nouvel article avec un ID basé sur le timestamp
              articles: [...project.articles, {...article, id: Date.now()}],
            }
          : project,
      ),
    );
  };

  /**
   * Supprime un article du projet actif
   * @param id - L'ID de l'article à supprimer
   */
  const deleteArticle = (id: number) => {
    setProjects((previousProjects) =>
      previousProjects.map((project) =>
        project.id === activeProjectId
          ? {
              ...project,
              // Filtrage pour retirer l'article correspondant
              articles: project.articles.filter((article) => article.id !== id),
            }
          : project,
      ),
    );
  };

  /**
   * Modifie la quantité d'un article (incrémentation ou décrémentation)
   * @param id - L'ID de l'article à modifier
   * @param delta - La variation de quantité (+1 ou -1)
   */
  const updateQuantity = (id: number, delta: number) => {
    setProjects((previousProjects) =>
      previousProjects.map((project) =>
        project.id === activeProjectId
          ? {
              ...project,
              articles: project.articles
                .map((article) =>
                  article.id === id
                    ? {
                        ...article,
                        // Empêche les quantités négatives
                        quantite: Math.max(0, article.quantite + delta),
                      }
                    : article,
                )
                // Supprime automatiquement les articles à quantité 0
                .filter((article) => article.quantite > 0),
            }
          : project,
      ),
    );
  };

  /**
   * Crée un nouveau projet avec un nom personnalisé
   * @param projectName - Le nom du nouveau projet
   */
  const createProject = (projectName: string) => {
    // Génération d'un ID unique (timestamp pour garantir l'unicité)
    const newId = Date.now();

    setProjects([...projects, {id: newId, nom: projectName, articles: []}]);

    // Sélection automatique du nouveau projet
    setActiveProjectId(newId);

    // Fermeture du modal
    setIsModalOpen(false);
  };

  /**
   * Supprime un projet
   * @param projectId - L'ID du projet à supprimer
   */
  const deleteProject = (projectId: number) => {
    // Confirmation avant suppression
    if (!window.confirm("Voulez-vous vraiment supprimer ce projet ?")) {
      return;
    }

    // Suppression du projet
    setProjects((previousProjects) =>
      previousProjects.filter((project) => project.id !== projectId),
    );

    // Si le projet supprimé était actif, on désélectionne
    if (activeProjectId === projectId) {
      setActiveProjectId(null);
    }
  };

  /**
   * Calcule le prix total d'une liste d'articles
   * @param articles - Liste des articles à totaliser
   * @returns Le prix total (somme des quantité × prix unitaire)
   */
  const calculateTotal = (articles: Article[]): number => {
    return articles.reduce(
      (sum, article) => sum + article.prixUnitaire * article.quantite,
      0,
    );
  };

  return (
    <div className="app">
      {/* En-tête de l'application */}
      <header>
        <h1>📋 Gestion de Devis</h1>
      </header>

      {/* GRILLE DES PROJETS (cartes cliquables) */}
      <div className="projets-grid">
        {projects.map((project) => (
          <div
            key={project.id}
            // Classe "actif" si c'est le projet sélectionné
            className={`projet-card ${project.id === activeProjectId ? "actif" : ""}`}
          >
            {/* Contenu cliquable de la carte */}
            <div
              className="projet-card-content"
              onClick={() => setActiveProjectId(project.id)}
            >
              <h3>{project.nom}</h3>

              {/* Affichage du prix total avec 2 décimales */}
              <p className="prix-total">
                {calculateTotal(project.articles).toFixed(2)} €
              </p>

              {/* Compteur d'articles avec pluriel automatique */}
              <span className="nb-articles">
                {project.articles.length} article
                {project.articles.length > 1 ? "s" : ""}
              </span>
            </div>

            {/* Bouton de suppression du projet */}
            <button
              className="btn-delete-project"
              onClick={(e) => {
                e.stopPropagation(); // Empêche la sélection du projet
                deleteProject(project.id);
              }}
              title="Supprimer ce projet"
            >
              ✕
            </button>
          </div>
        ))}

        {/* Bouton pour créer un nouveau projet */}
        <button
          className="projet-card nouveau"
          onClick={() => setIsModalOpen(true)}
        >
          <span className="plus">+</span>
          <span>Nouveau projet</span>
        </button>
      </div>

      {/* Message si aucun projet n'existe */}
      {projects.length === 0 && (
        <div className="empty-projects">
          <p>👆 Cliquez sur "Nouveau projet" pour commencer</p>
        </div>
      )}

      {/* ZONE D'ÉDITION DU PROJET ACTIF (formulaire + tableau) */}
      {activeProject && (
        <div className="projet-actif">
          <h2>{activeProject.nom}</h2>

          {/* Formulaire d'ajout d'article */}
          <ArticleForm onAdd={addArticle} />

          {/* Tableau listant tous les articles du projet */}
          <ArticleTable
            articles={activeProject.articles}
            onDelete={deleteArticle}
            onUpdateQuantity={updateQuantity}
          />
        </div>
      )}

      {/* Modal de création de projet */}
      {isModalOpen && (
        <ProjectModal
          onConfirm={createProject}
          onCancel={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}

export default App;
