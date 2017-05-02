import { Component, OnInit} from '@angular/core';

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

  public items: NavbarItem[] = [
    {name: 'Search Plus', href:'search-plus'},
    {name: 'CUMTD Bus Assistant', href: 'bus-assistant'},
    {name: '2D Physics Engine', href: 'physics-engine'}
  ]

  constructor() {}
  ngOnInit() {
  }
}
