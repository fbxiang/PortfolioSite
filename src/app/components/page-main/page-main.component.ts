import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'page-main',
  templateUrl: './page-main.component.html',
  styleUrls: ['./page-main.component.css']
})
export class PageMainComponent implements OnInit {

  constructor(private router: Router) {}

  hideHeadbar: boolean;

  onRouterActivate() {
    if (this.router.url.startsWith('/portfolio')) {
      this.hideHeadbar = true;
    }
    else {
      this.hideHeadbar = false;
    }
  }

  ngOnInit() {
  }

}
