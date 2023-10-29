const http = require("http");
const { parse } = require("url");
const next = require("next");

const https = require("https");
const fs = require("fs");

const dev = process.env.NODE_ENV !== "production";
const start = process.env.NODE_ENV !== "development";
const app = next({ start });
const handle = app.getRequestHandler();

const PORT = 3008;

const httpsOptions = {
  key: fs.readFileSync("./ssl/localhost-key.pem"),
  cert: fs.readFileSync("./ssl/localhost.pem"),
};

app.prepare().then(() => {
  http
    .createServer((req, res) => {
      const parsedUrl = parse(req.url, true);
      handle(req, res, parsedUrl);
    })
    .listen(PORT, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${PORT}`);
    });

  // https 서버 추가
  https
    .createServer(httpsOptions, (req, res) => {
      const parsedUrl = parse(req.url, true);
      handle(req, res, parsedUrl);
    })
    .listen(PORT + 1, (err) => {
      if (err) throw err;
      console.log(`> HTTPS: Ready on https://localhost:${PORT + 1}`);
    });
});

// "start": "next start -p 3003",
