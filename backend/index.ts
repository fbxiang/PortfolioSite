import * as express from 'express';
import * as bodyparser from 'body-parser';

import * as http from 'http';

const app = express();

// user body parser
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

//server routing

app.get('/portfolio', (req, res, next) => {
  console.log(req);
  res.send([{
    name: 'Search Plus',
    id: 'search-plus'
  },{
    name: 'CUMTD Bus Assistant',
    id: 'cumtd'
  },{
    name: '2D Physics Engine',
    id: 'physics'
  }]);
})

app.get('/*', (req, res, next) => {
  res.send('Hello World');
})


// create server
const port = process.env.PORT ? process.env.PORT : 3000;
const server = http.createServer(app);
server.listen(port);
