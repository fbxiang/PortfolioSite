import * as express from 'express';
import * as bodyparser from 'body-parser';

import * as http from 'http';

import * as fs from 'fs';
import * as async from 'async';

const app = express();

import { portfolioPageRouter, portfolioRouter } from './routers/portfolio';

import { blogPageRouter } from './routers/blog';
import { userRouter } from './routers/user';

// user body parser
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));
app.use('/api', express.static(__dirname + '/static'))

app.use(portfolioPageRouter);
app.use(portfolioRouter);
app.use('/api', blogPageRouter);
app.use('/api/user', userRouter)

// app.get('/*', (req, res, next) => {
//   next();
// }, express.static(__dirname + '/static'));

// create server
const port = process.env.PORT ? process.env.PORT : 3000;
const server = http.createServer(app);
server.listen(port);
