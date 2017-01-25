import Express from 'express';
import http from 'http';

const app = new Express();
const server = new http.Server(app);

app.use('*', (req, res) => {
  res.json({response: 'YOU ARE GOOD'});
});

server.listen(5000, (err) => {
  if (err) {
    console.error(err);
  }
  console.info('==> 💻  Open http://%s:%s in a browser to view the app.', 'localhost', 5000);
});
