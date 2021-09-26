const http = require('http');

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
  res.end(JSON.stringify(topics));
});

server.listen(port, hostname, () => {
  console.log(`ICC server running at http://${hostname}:${port}/`);
});