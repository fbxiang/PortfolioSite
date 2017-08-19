import * as path from 'path';
import * as fs from 'mz/fs';

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

export async function getPortfolioSummaries() {
  const summaryFile = path.join(PortfolioDir, 'summary.json');
  const summary = (await fs.readFile(summaryFile)).toString();
  return JSON.parse(summary) as PortfolioSummary[];
}
