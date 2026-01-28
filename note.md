# node_modules

node_modules/
├── react/ ← Bibliothèque React
├── react-dom/ ← Pour afficher React dans le navigateur
├── typescript/ ← Compilateur TypeScript
└── ... (des milliers de dossiers)

Jamais modifié manuellement
Créé par npm install
Très lourd (peut faire 200-500 MB)
Ignoré par Git (dans .gitignore)
Se régénère avec npm install

# public

public/
├── index.html ← Point d'entrée HTML (IMPORTANT)
├── favicon.ico ← Icône du site
├── logo192.png ← Icône PWA petite
├── logo512.png ← Icône PWA grande
├── manifest.json ← Configuration PWA personnalisable
└── robots.txt ← Directives pour moteurs de recherche

Le navigateur charge public/index.html
React "prend le contrôle" du <div id="root">
Tout le reste est généré par JavaScript

# src

src/
├── components/ ← Composants réutilisables
│ ├── ArticleForm.tsx ← Formulaire d'ajout
│ └── ArticleTable.tsx ← Tableau d'affichage
│
├── types/ ← Définitions TypeScript
│ └── Article.ts ← Interface Article
│
├── App.tsx ← Composant principal
├── App.css ← Styles de l'app
├── index.tsx ← Point d'entrée JavaScript
├── index.css ← Styles globaux
│
├── reportWebVitals.ts ← Mesure de performance
├── setupTests.ts ← Configuration des tests
└── react-app-env.d.ts ← Types TypeScript auto-généré

# Comment tout s'emboîte

Flux de démarrage :

1. public/index.html
   └─> Charge le HTML de base
2. src/index.tsx
   └─> Point d'entrée JavaScript
   └─> ReactDOM.createRoot(document.getElementById('root'))
3. src/App.tsx
   └─> Composant principal affiché
   └─> Importe ArticleForm et ArticleTable
4. src/components/\*.tsx
└─> Composants individuels
Exemple concret :
public/index.html (le squelette) :
<div id="root"></div>
src/index.tsx (injecte React) :
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(<App />);
src/App.tsx (votre application) :
function App() {
  return (
    <div>
      <ArticleForm />
      <ArticleTable />
    </div>
  );
}
Résultat dans le navigateur :
<div id="root">
  <div>
    <form>...</form>
    <table>...</table>
  </div>
</div>

# Fichiers de configuration

package.json - Le manifeste du projet
{
"name": "mon-pwa",
"version": "0.1.0",
"dependencies": {
"react": "^18.2.0",
"typescript": "^4.9.5"
},
"scripts": {
"start": "react-scripts start", // npm start
"build": "react-scripts build", // npm run build
"test": "react-scripts test" // npm test
}
}
tsconfig.json - Configuration TypeScript
{
"compilerOptions": {
"target": "es5",
"lib": ["dom", "es2015"],
"jsx": "react-jsx",
"strict": true
}
}
