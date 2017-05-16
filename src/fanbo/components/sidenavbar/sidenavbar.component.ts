import { Component, OnInit} from '@angular/core';
import { PortfolioService } from '../../services/portfolio.service';


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

  constructor(private portfolioService: PortfolioService) {
  }
  ngOnInit() {
    this.portfolioService.getPortfolio('fanbo').subscribe(
      portfolioArray => {
        this.items = portfolioArray.map(portfolio => {
          return {name: portfolio.name, href: portfolio.id}
        });
      },
      error => console.log(error),
      () => console.log('finished')
    );
  }
}
