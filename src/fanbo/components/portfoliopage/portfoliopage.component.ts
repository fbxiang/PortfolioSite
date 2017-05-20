import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PortfolioService } from '../../services/portfolio.service';

import { markdown } from 'markdown';


@Component({
  selector: 'portfoliopage',
  templateUrl: './portfoliopage.component.html',
  styleUrls: ['./portfoliopage.component.css']
})
export class PortfolioPageComponent implements OnInit {
  private pageContent: string;
  constructor(private router: Router,
              private route: ActivatedRoute,
              private portfolioService: PortfolioService) {}
  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log(params['id']);
      this.portfolioService.getPortfolioPage('fanboxiang', params['id']).subscribe(
        pageContent => {
          this.pageContent = markdown.toHTML((<string[]>pageContent).join('\n'));
        },
        error => {
          console.log(error);
          this.pageContent =
`<h1>${error.status} ${error.statusText}</h1>
<p>${error._body}</p>`
        },
        () => {}
      )
    });
  }
}
