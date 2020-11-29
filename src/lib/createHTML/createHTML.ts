export default async function createHTML(input: string, revealVersion: string) {
    const title = "boardIt";
    let style = await downloadFile("reveal.css", revealVersion);
    let reset = await downloadFile("reset.css", revealVersion);
    let theme = await downloadFile("theme/black.css", revealVersion);
    let source = await downloadFile("reveal.js", revealVersion);
    console.log(source);
    return (`
<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <style id="reveal-style-id">${style}</style>
    <style id="reveal-theme-id">${theme}</style>
    <style id="reveal-reset-id">${reset}</style>
    <link rel="stylesheet" href="dist/theme/white.css">
    <title>${title}</title>
  </head>
  <body>
    <div class="reveal">
      <div class="slides">
        ${input}
      </div>
    </div>
    <script id="reveal-source-id">${source}</script>
    <script>
      Reveal.initialize();
    </script>
  </body>
</html>`);}


async function downloadFile(path: string, version: string) {
    let url = `https://raw.githubusercontent.com/hakimel/reveal.js/${version}/dist/${path}`;
    let result = await fetch(url);
    return result.text();
}