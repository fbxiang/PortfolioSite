import * as express from 'express';
import * as bodyparser from 'body-parser';
import * as http from 'http';
import * as fs from 'fs';

const app = express();

import { portfolioRouter } from './routers/portfolio';

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/frontend'));
app.use('/api', portfolioRouter);
app.use('/api/experience', express.static(__dirname + '/static/experience'))

app.get('*', (req, res) => {
  res.sendFile(__dirname + '/frontend/index.html');
});

const port = process.env.PORT ? process.env.PORT : 3000;
const server = http.createServer(app);
server.listen(port);
