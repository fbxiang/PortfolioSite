import { Component, OnInit} from '@angular/core';
import { PortfolioService } from '../../services/portfolio.service';
import { MdDialog } from '@angular/material';
import { AddPageComponent } from '../addpage/addpage.component';

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

  public items: NavbarItem[] = [];

  constructor(private portfolioService: PortfolioService,
              private dialog: MdDialog) {
  }

  openAddPageDialog() {
    this.dialog.open(AddPageComponent).afterClosed().subscribe(() => {
      this.ngOnInit();
    })
  }

  ngOnInit() {
    this.portfolioService.getPortfolio('fanboxiang').subscribe(
      portfolioArray => {
        this.items = portfolioArray.map(portfolio => {
          return {name: portfolio.name, href: portfolio.id}
        });
      },
      error => console.log(error),
      () => {}
    );
  }
}
