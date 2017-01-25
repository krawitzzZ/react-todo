import Express from 'express';
import http from 'http';

const app = new Express();
const server = new http.Server(app);

server.listen(5000, (err) => {
  if (err) {
    console.error(err);
  }
  console.info('==> 💻  Open http://%s:%s in a browser to view the app.', 'localhost', 5000);
});
