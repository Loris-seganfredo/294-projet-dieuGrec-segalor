import { mkdir, writeFile } from 'node:fs/promises'

// Ce script garde les anciens liens utilisables. base indique le dossier du site sur GitHub Pages.
const base = process.env.VITE_BASE_URL || '/'
// Modèle de la page de redirection. Les valeurs entre dollar et accolades sont insérées dans le fichier.
const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Greek Gods — Redirecting</title>
  </head>
  <body>
    <!-- Laisser un lien vers l’accueil si le navigateur ne lance pas la redirection. -->
    <p>Opening Greek Gods… <a href="${base}">Go to the home page</a></p>
    <script>
      const base = ${JSON.stringify(base)};
      // Retirer le dossier du dépôt pour obtenir le chemin à placer après #.
      let route = location.pathname.startsWith(base)
        ? location.pathname.slice(base.length - 1)
        : '/';
      // Transformer l’ancienne adresse française des favoris en adresse anglaise.
      if (/^\\/favoris\\/?$/.test(route)) route = '/favorites';
      // Ouvrir la nouvelle adresse en gardant les paramètres et l’ancre, sans ajouter la redirection à l’historique.
      location.replace(base + '#' + route + location.search + location.hash);
    </script>
  </body>
</html>
`

// Créer une page générale pour les anciennes adresses inconnues.
await writeFile('dist/404.html', html)
// Créer aussi une page pour chacune des anciennes adresses les plus courantes.
for (const route of ['favoris', 'favorites', 'about']) {
  await mkdir(`dist/${route}`, { recursive: true })
  await writeFile(`dist/${route}/index.html`, html)
}
