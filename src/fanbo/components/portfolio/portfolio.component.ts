import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {

  private pageNotFound: boolean;
  constructor(private router: Router,
              private route: ActivatedRoute) {
  }
  ngOnInit() {
  }
}
