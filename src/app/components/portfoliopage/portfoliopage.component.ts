import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PortfolioService } from '../../services/portfolio.service';


@Component({
  selector: 'portfoliopage',
  templateUrl: './portfoliopage.component.html',
  styleUrls: ['./portfoliopage.component.css']
})
export class PortfolioPageComponent implements OnInit {
  private blocks: string[];
  private id: string;
  private md = '';

  constructor(private router: Router,
              private route: ActivatedRoute,
              private portfolioService: PortfolioService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log(this.portfolioService.currentPage);
      const summary = this.portfolioService.getSummaryByName(params.name);
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
