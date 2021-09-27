const http = require('http');
const url = require('url');

const hostname = '127.0.0.1';
const port = 8081;

// unsplash topics
const topics = {
  nature: 10,
  architecture: 12,
  "food-drink": 20,
  people: 3
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