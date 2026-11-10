import { mkdir, writeFile } from 'node:fs/promises'

// Les pages générées redirigent les anciennes adresses GitHub Pages vers les routes après #.
const base = process.env.VITE_BASE_URL || '/'
// Le script dans la page retire le préfixe du dépôt et conserve la recherche et l’ancre de l’URL.
const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Greek Gods — Redirecting</title>
  </head>
  <body>
    <p>Opening Greek Gods… <a href="${base}">Go to the home page</a></p>
    <script>
      const base = ${JSON.stringify(base)};
      let route = location.pathname.startsWith(base)
        ? location.pathname.slice(base.length - 1)
        : '/';
      if (/^\\/favoris\\/?$/.test(route)) route = '/favorites';
      location.replace(base + '#' + route + location.search + location.hash);
    </script>
  </body>
</html>
`

// Fournir une redirection générale et des pages dédiées pour les anciens liens les plus courants.
await writeFile('dist/404.html', html)
for (const route of ['favoris', 'favorites', 'about']) {
  await mkdir(`dist/${route}`, { recursive: true })
  await writeFile(`dist/${route}/index.html`, html)
}
