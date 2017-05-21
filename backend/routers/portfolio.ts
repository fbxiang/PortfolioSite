import * as express from 'express';

export const portfolioRouter = express.Router();
export const portfolioPageRouter = express.Router();

import * as fs from 'fs';

export interface PortfolioData {
  id: string,
  name: string,
  filenames: string[]
}

function readdir(path:string) {
  return new Promise((resolve, reject) => {
    fs.readdir(path, (err, files) => {
      if (err)
        reject(err);
      else
        resolve(files);
    });
  })
}

function readFile(path:string) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, file) => {
      if (err)
        reject(err);
      else
        resolve(file);
    })
  })
}

function exists(path: string) {
  return new Promise((resolve, reject) => {
    fs.exists(path, exists => {
      resolve(exists);
    })
  })
}

portfolioRouter.get('/portfolio', async (req, res, next) => {
  const portfolioDir = `${__dirname}/../static/${req.query['name']}/portfolio/`;
  let jsonFiles:string[] = await readdir(portfolioDir) as string[];
  jsonFiles = jsonFiles.filter(f => f.includes('.json'));
  let jsonData = await Promise.all(jsonFiles.map(async file => {
    let data:string = await readFile(`${portfolioDir}${file}`) as string;
    let {id, name} = JSON.parse(data) as PortfolioData;
    return {id, name}
  }));
  res.send(jsonData);
})

portfolioPageRouter.get('/portfolio-page', async (req, res, next) => {
  try {
    const portfolioDir = `${__dirname}/../static/${req.query['name']}/portfolio/`
    const jsonFile = `${portfolioDir}${req.query['id']}.json`;
    let data = await readFile(jsonFile) as string;
    let portfolioData = JSON.parse(data) as PortfolioData;
    let allFiles = await Promise.all(portfolioData.filenames.map(async f => {
      return await readFile(`${portfolioDir}${f}`);
    }));
    res.send(allFiles);
  }
  catch(err) {
    res.status(404).send('Page does not exist yet.');
  }
})

portfolioPageRouter.post('/add-portfolio-page', async (req, res, next) => {
  let {name, id, pageName} = req.body as {name:string, id: string, pageName: string};
  name = name.trim();
  id = id.trim();
  pageName = pageName.trim();

  const portfolioDir = `${__dirname}/../static/${name}/portfolio/`;
  const jsonFileName = `${portfolioDir}${id}.json`;
  if (await exists(jsonFileName)) {
    return res.status(400).send('The id is duplicated. Please change the id.');
  }
  fs.writeFile(jsonFileName, JSON.stringify({
    name: pageName,
    id: id,
    filenames: []
  }), 'utf8', err => {
    if (err)
      res.send(400).send("Upload Failed");
    else
      res.send("success");
  });
})

portfolioPageRouter.post('/change-portfolio-page', async (req, res, next) => {
  let {name, id, index, content} = req.body as {name: string, id: string, index: number, content: string};

  const portfolioDir = `${__dirname}/../static/${name}/portfolio/`;
  const jsonFileName = `${portfolioDir}${id}.json`;

  try {
    let filename = (JSON.parse(await readFile(jsonFileName) as string) as PortfolioData).filenames[index];
    let filepath = `${portfolioDir}${filename}`
    if (await exists(filepath)) {
      fs.writeFile(filepath, content, 'utf8', err => {
        if (err)
          throw err;
        else
          res.send('success');
      })
    }
    else {
      res.status(400).send('Invalid Index');
    }
  }
  catch (err) {
    console.log(err);
    res.status(400).send('Invalid File');
  }
})
