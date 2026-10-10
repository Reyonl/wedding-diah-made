// Static server for the Next.js static export, simulating GitHub Pages
// subpath hosting at /wedding-diah-made/.
const http = require("http");
const fs = require("fs");
const path = require("path");

const root = process.argv[2];
const prefix = "/wedding-diah-made";
const port = Number(process.argv[3] || 3124);
const mime = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".mp3": "audio/mpeg",
  ".txt": "text/plain",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
};

http
  .createServer((req, res) => {
    let p = decodeURIComponent(req.url.split("?")[0]);
    if (p.startsWith(prefix)) p = p.slice(prefix.length);
    if (p === "" || p === "/") p = "/index.html";
    const f = path.join(root, p);
    if (fs.existsSync(f) && fs.statSync(f).isFile()) {
      res.writeHead(200, {
        "Content-Type": mime[path.extname(f)] || "application/octet-stream",
      });
      res.end(fs.readFileSync(f));
    } else {
      res.writeHead(404);
      res.end("nf");
    }
  })
  .listen(port, () => console.log(`subpath server on ${port}`));