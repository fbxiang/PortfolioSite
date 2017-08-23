import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PortfolioService } from '../../services/portfolio.service';


@Component({
  selector: 'portfoliopage',
  templateUrl: './portfoliopage.component.html',
  styleUrls: ['./portfoliopage.component.css']
})
export class PortfolioPageComponent implements OnInit {
  md = '';
  summary;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private portfolioService: PortfolioService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const summary = this.portfolioService.getSummaryByName(params.name);
      if (!params.name) {
        return this.router.navigate(['portfolio', this.portfolioService.portfolioSummaries[0].name])
      }
      if (!summary) {
        return this.router.navigate(['portfolio', '404']);
      }
      this.summary = summary.summary;
      if (summary && summary.markdown) {
        this.portfolioService.getMarkdown(summary.markdown).then(md => {
          this.md = md;
        })
      } else {
        this.md = '';
      }
    })
  }
}
