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

  items: NavbarItem[] = [];
  get portfolioSummaries() {
    return this.portfolioService.portfolioSummaries;
  }

  constructor(private portfolioService: PortfolioService,
              private dialog: MdDialog) {
  }

  ngOnInit() {
  }
}
