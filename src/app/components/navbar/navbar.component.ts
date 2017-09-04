import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {

  public items = [
    { name: "Home", action: _ => this.router.navigate(['/home']) },
    { name: "Profile", action: _ => this.router.navigate(['/profile']) },
    { name: "Resume", action: _ => window.open('/api/CV.pdf') },
    { name: "Experience", action: _ => this.router.navigate(['/experience']) },
    { name: "Portfolio", action: _ => this.router.navigate(['/portfolio']) }
  ]

  constructor(private router: Router) { }
  ngOnInit() {
  }
}
