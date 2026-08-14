// Stamps cache-busting version params into index.html at build time.
// Vercel runs this during `npm run build` so each deployment forces browsers
// to fetch fresh app.js/styles.css (HTML is always revalidated by Vercel).
const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, '..', 'index.html');
let html = fs.readFileSync(file, 'utf8');
html = html.replaceAll('__BUILD_TS__', String(Date.now()));
fs.writeFileSync(file, html);
console.log('Build stamped: ' + Date.now());
