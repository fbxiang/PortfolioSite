import * as express from 'express';
import * as path from 'path';
import * as fs from 'mz/fs';

export const portfolioRouter = express.Router();
export const portfolioPageRouter = express.Router();
import { getPortfolioSummaries, getMarkdown, getImageFilePath, getCVFilePath } from '../models';

portfolioRouter.get('/portfolio/summary', (req, res, next) => {
  getPortfolioSummaries()
    .then(summaries => res.send(summaries))
    .catch(err => {
      res.status(500).send({ message: 'Portfolio list not available on the server' });
    });
})

portfolioRouter.get('/portfolio/:file', (req, res, next) => {
  getMarkdown(req.params.file)
    .then(md => res.send(md))
    .catch(err => {
      res.status(404).send({ message: 'Portfolio not found' })
    })
})

portfolioRouter.get('/image/:file', (req, res, next) => {
  getImageFilePath(req.params.file)
    .then(path => res.sendFile(path))
    .catch(err => res.status(404).send({ message: 'Image not found' }));
})

portfolioRouter.get('/CV.pdf', (req, res, next) => {
  getCVFilePath().then(path => res.sendFile(path))
    .catch(err => res.status(404).send({message: 'CV not found'}));
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
