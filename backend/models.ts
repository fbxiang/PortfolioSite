import * as path from 'path';
import * as fs from 'mz/fs';
import * as _ from 'lodash';

export interface PortfolioData {
  id: string,
  name: string
}

export interface PortfolioSummary {
  name: string,
  repository: string,
  summary: {
    type: string,
    language: string[],
    status: string,
    description: string,
    detail: {
      section: string,
      content: ({image: string} | {text: string})[]
    }[]
  },
  markdown: string
}

export const PortfolioDir = `${__dirname}/static/portfolio/`;
export const ImageDir = `${__dirname}/static/image`;

export async function getPortfolioSummaries() {
  const summaryFile = path.join(PortfolioDir, 'summary.json');
  const summary = (await fs.readFile(summaryFile)).toString();
  return JSON.parse(summary) as PortfolioSummary[];
}

export async function getMarkdown(filename: string) {
  const file = path.join(PortfolioDir, filename);
  const markdown = (await fs.readFile(file)).toString();
  return markdown;
}

const ImageSuffix = ['.jpg', '.png'];
export async function getImageFilePath(filename: string) {
  if (!ImageSuffix.some(s => filename.endsWith(s))) {
    throw Error('Invalid suffix');
  }
  const file = path.join(ImageDir, filename);
  if (await fs.exists(file)) {
    return file;
  } else {
    throw Error('File not found');
  }
}
