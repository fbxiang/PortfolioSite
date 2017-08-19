import * as express from 'express';
import * as fs from 'fs';
import { exists, readdir, readFile } from 'mz/fs';

export const portfolioRouter = express.Router();
export const portfolioPageRouter = express.Router();
import { PortfolioData, getPortfolioSummaries } from '../models';

portfolioRouter.get('/portfolio/summary', async (req, res, next) => {
  getPortfolioSummaries()
    .then(summaries => res.send(summaries))
    .catch(err => {
      res.status(500).send({ message: 'Portfolio list not available on the server' });
    });
})

// portfolioRouter.get('/portfolio', async (req, res, next) => {

//   let jsonFiles: string[] = await readdir(PortfolioDir) as string[];
//   jsonFiles = jsonFiles.filter(f => f.includes('.json'));
//   let jsonData = await Promise.all(jsonFiles.map(async file => {
//     let data = await readFile(`${portfolioDir}${file}`);
//     let { id, name } = JSON.parse(data.toString()) as PortfolioData;
//     return { id, name }
//   }));
//   res.send(jsonData);
// })

// portfolioPageRouter.get('/portfolio-page', async (req, res, next) => {
//   try {
//     const portfolioDir = `${__dirname}/../static/${req.query['name']}/portfolio/`
//     const jsonFile = `${portfolioDir}${req.query['id']}.json`;
//     let data = await readFile(jsonFile);
//     let portfolioData = JSON.parse(data.toString()) as PortfolioData;
//     let allFiles = await Promise.all(portfolioData.filenames.map(async f => {
//       return await readFile(`${portfolioDir}${f}`);
//     }));
//     res.send(allFiles);
//   }
//   catch (err) {
//     res.status(404).send({ message: 'Page does not exist yet.' });
//   }
// })
