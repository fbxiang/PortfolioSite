import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'fanbo',
  templateUrl: './fanbo.component.html',
  styleUrls: ['./fanbo.component.css']
})
export class FanboComponent implements OnInit {

  constructor(private route: ActivatedRoute) {}

  hideHeadbar: boolean;

  ngOnInit() {
  }

}
