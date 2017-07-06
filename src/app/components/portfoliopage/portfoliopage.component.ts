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

  constructor(private router: Router,
              private route: ActivatedRoute,
              private portfolioService: PortfolioService) {}

  onChildSubmitted(text, idx) {
    this.portfolioService.changePortfolioPage('fanboxiang', this.id, idx, text).subscribe(
      response => {console.log(response)},
      err => {console.log('error', err)},
      () => {});
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log(params['id']);
      this.id = params['id'];
      this.portfolioService.getPortfolioPage('fanboxiang', params['id']).subscribe(
        blocks => {
          this.blocks = blocks as string[];
        },
        error => {
          console.log(error);
          this.blocks = [];
        },
        () => {}
      )
    });
  }
}
