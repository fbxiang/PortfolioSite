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
  }

  ngOnInit() {
  }
}
