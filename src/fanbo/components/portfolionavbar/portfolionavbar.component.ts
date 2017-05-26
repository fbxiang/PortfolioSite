import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'portfolio-navbar',
  templateUrl: './portfolionavbar.component.html',
  styleUrls: ['./portfolionavbar.component.css']
})

export class PortfolioNavbarComponent implements OnInit {

  @Output() nav = new EventEmitter();
  @Output() home = new EventEmitter();

  openNav() {
    this.nav.emit();
  }

  openHome() {
    this.home.emit();
  }

  constructor() {}
  ngOnInit() {}
}
