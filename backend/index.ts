import * as express from 'express';
import * as bodyparser from 'body-parser';

import * as http from 'http';

import * as fs from 'fs';
import * as async from 'async';

const app = express();

import { portfolioPageRouter, portfolioRouter } from './routers/portfolio';

import { blogPageRouter } from './routers/blog';

// user body parser
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/static'));

app.use(portfolioPageRouter);
app.use(portfolioRouter);
app.use('/api', blogPageRouter);

app.get('/*', (req, res, next) => {
  res.send('Hello World');
})

// create server
const port = process.env.PORT ? process.env.PORT : 3000;
const server = http.createServer(app);
server.listen(port);
