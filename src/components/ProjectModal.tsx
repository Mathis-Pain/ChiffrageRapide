import {useState, FormEvent} from "react";

interface ProjectModalProps {
  onConfirm: (projectName: string) => void;
  onCancel: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({onConfirm, onCancel}) => {
  const [projectName, setProjectName] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (projectName.trim()) {
      onConfirm(projectName.trim());
    }
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Fermer uniquement si on clique sur l'overlay (pas sur le contenu)
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <h2>Nouveau projet</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="project-name">Nom du projet</label>
          <input
            id="project-name"
            type="text"
            placeholder="Nom du projet"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            autoFocus
            required
          />
          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onCancel}>
              Annuler
            </button>
            <button
              type="submit"
              className="btn-confirm"
              disabled={!projectName.trim()}
            >
              Créer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectModal;
