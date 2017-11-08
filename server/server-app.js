import Express from 'express';
import favicon from 'serve-favicon';
import compression from 'compression';
import http from 'http';
import path from 'path';

const Host = process.env.HOST || '0.0.0.0';
const Port = process.env.PORT || 3003;

const app = new Express();
const server = new http.Server(app);

// disable `X-Powered-By` HTTP header
app.disable('x-powered-by');
app.use(compression());
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use('/assets', Express.static(path.join(__dirname, 'public')));

app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

server.listen(Port, err => {
  if (err) {
    console.error(err);
  }
  console.info('==> Server starting on host: %s, port: %s', Host, Port);
});
