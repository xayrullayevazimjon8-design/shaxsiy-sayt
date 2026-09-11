// Saytni brauzerda ko'rish uchun kichik mahalliy server.
// Ishga tushirish:  node server/serve.js   →  http://localhost:4173
const http = require('http');
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..'); // sayt fayllari shu papkadan bir daraja yuqorida
const port = 4173;

const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon'
};

http
  .createServer((req, res) => {
    let p = decodeURIComponent(req.url.split('?')[0]);
    if (p === '/') p = '/index.html';

    const file = path.join(root, p);

    // Papkadan tashqariga chiqishga yo'l qo'ymaymiz
    if (!file.startsWith(root)) {
      res.writeHead(403);
      res.end('403');
      return;
    }

    fs.readFile(file, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end('404');
        return;
      }
      res.writeHead(200, {
        'Content-Type': types[path.extname(file).toLowerCase()] || 'application/octet-stream'
      });
      res.end(data);
    });
  })
  .listen(port, () => console.log('Sayt ochildi: http://localhost:' + port));
