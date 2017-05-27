import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'fanbo',
  templateUrl: './fanbo.component.html',
  styleUrls: ['./fanbo.component.css']
})
export class FanboComponent implements OnInit {

  constructor(private router: Router) {}

  hideHeadbar: boolean;

  onRouterActivate() {
    if (this.router.url.startsWith('/site/fanboxiang/portfolio')) {
      this.hideHeadbar = true;
    }
    else {
      this.hideHeadbar = false;
    }
  }

  ngOnInit() {
  }

}
