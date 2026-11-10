// Importer les outils de Node.js pour créer des dossiers et écrire des fichiers.
import { mkdir, writeFile } from 'node:fs/promises'

// Ce script garde les anciens liens utilisables après le passage aux adresses avec #.
// Sur GitHub Pages, base contient le nom du dépôt. En local, le site part de la racine /.
const base = process.env.VITE_BASE_URL || '/'
// Le texte entre les accents graves est le fichier HTML qui sera écrit dans dist.
// Les valeurs entre dollar et accolades sont insérées au moment de créer le fichier.
const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Greek Gods — Redirecting</title>
  </head>
  <body>
    <!-- Si la redirection tarde ou que JavaScript est coupé, ce lien permet d’aller à l’accueil. -->
    <p>Opening Greek Gods… <a href="${base}">Go to the home page</a></p>
    <script>
      // Insérer l’adresse de base comme une chaîne de texte JavaScript.
      const base = ${JSON.stringify(base)};
      // Enlever le dossier du dépôt pour garder seulement le chemin de la page. Sinon, viser l’accueil.
      let route = location.pathname.startsWith(base)
        ? location.pathname.slice(base.length - 1)
        : '/';
      // Reconnaître l’ancienne adresse française et utiliser l’adresse anglaise des favoris.
      if (/^\\/favoris\\/?$/.test(route)) route = '/favorites';
      // Mettre le chemin après # et garder le texte de recherche et l’ancienne ancre.
      // replace remplace l’adresse dans l’historique pour éviter de revenir à la redirection avec le bouton retour.
      location.replace(base + '#' + route + location.search + location.hash);
    </script>
  </body>
</html>
`

// GitHub Pages sert 404.html quand aucun fichier ne correspond à une ancienne adresse.
await writeFile('dist/404.html', html)
// Créer aussi une page de redirection pour chacun de ces anciens liens directs.
for (const route of ['favoris', 'favorites', 'about']) {
  // Créer le dossier s’il manque. recursive permet de créer ses dossiers parents si nécessaire.
  await mkdir(`dist/${route}`, { recursive: true })
  // Un fichier index.html dans le dossier est servi quand on ouvre directement cette adresse.
  await writeFile(`dist/${route}/index.html`, html)
}
