import { Component, OnInit} from '@angular/core';
import { PortfolioService } from '../../services/portfolio.service';
import { MdDialog } from '@angular/material';

interface NavbarItem {
  name: string,
  href: string
}

@Component({
  selector: 'sidenavbar',
  templateUrl: './sidenavbar.component.html',
  styleUrls: ['./sidenavbar.component.css']
})

export class SidenavbarComponent implements OnInit {
  get portfolioSummaries() {
    return this.portfolioService.portfolioSummaries;
  }

  get currentPage() {
    return this.portfolioService.currentPage;
  }

  constructor(private portfolioService: PortfolioService,
              private dialog: MdDialog) {
  }

  ngOnInit() {
  }
}
