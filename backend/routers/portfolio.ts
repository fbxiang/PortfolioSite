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
