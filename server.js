const http = require('http');
const url = require('url');
const db = require('./db');

const PORT = 3000;

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const method = req.method;
  const path = parsedUrl.pathname;

  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');

  if (method === 'GET' && path === '/quiz') {
    db.getAllQuestions((err, questions) => {
      if (err) {
        res.writeHead(500);
        res.end(JSON.stringify({ error: 'Database error' }));
      } else {
        res.writeHead(200);
        res.end(JSON.stringify(questions));
      }
    });

  } else if (method === 'GET' && path.startsWith('/quiz/')) {
    const id = parseInt(path.split('/')[2]);
    db.getQuestionById(id, (err, question) => {
      if (err || !question) {
        res.writeHead(404);
        res.end(JSON.stringify({ error: 'Question not found' }));
      } else {
        res.writeHead(200);
        res.end(JSON.stringify(question));
      }
    });

  } else if (method === 'POST' && path === '/quiz') {
    let body = '';
    req.on('data', chunk => (body += chunk));
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        db.addQuestion(data, (err, result) => {
          if (err) {
            res.writeHead(500);
            res.end(JSON.stringify({ error: 'Failed to add question' }));
          } else {
            res.writeHead(201);
            res.end(JSON.stringify({ message: 'Created', id: result.id }));
          }
        });
      } catch (e) {
        res.writeHead(400);
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
      }
    });

  } else {
    res.writeHead(404);
    res.end(JSON.stringify({ message: 'Route not found' }));
  }
});

server.listen(PORT, () => {
  console.log(`🚀 Quiz API running at http://localhost:${PORT}`);
});
