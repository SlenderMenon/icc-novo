const http = require('http');
const url = require('url');

const hostname = '127.0.0.1';
const port = 8081;

// unsplash topics
const topics = {
  "back-to-school": 12,
  "wallpapers": 7,
  "nature": 15,
  "people": 9,
  "experimental": 26,
  "architecture": 12,
  "business-work": 8,
  "current-events": 5,
  "fashion": 15,
  "food-drink": 10,
}

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  const urlObj = url.parse(req.url, true);
  switch (urlObj.pathname) {
    case '/topics': res.end(JSON.stringify(Object.keys(topics))); break;
    case '/count':
      if (urlObj.query.topic)
        res.end(JSON.stringify(topics[urlObj.query.topic]));
      else res.end(JSON.stringify({ error: 'No such topic!' }));
      break;
    default: res.end(JSON.stringify({ error: 'No such path!' }));
  }
});

server.listen(port, hostname, () => {
  console.log(`ICC server running at http://${hostname}:${port}/`);
});