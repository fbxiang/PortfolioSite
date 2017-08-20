import * as _ from 'lodash';

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
