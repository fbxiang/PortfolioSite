import { Component, OnInit} from '@angular/core';

interface NavbarItem {
  name: string,
  href: string
}

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {

  public items: NavbarItem[] = [
    {name: "Home", href: "home"},
    {name: "Resume", href: "resume"},
    {name: "Experience", href: "experience"},
    {name: "Portfolio", href: "portfolio"}
  ]

  constructor() {}
  ngOnInit() {
  }
}
