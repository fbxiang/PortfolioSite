import { Component, OnInit } from '@angular/core';
import { ExperienceService } from '../../services/experience.service';

@Component({
  selector: 'sidenav-experience',
  templateUrl: './sidenav-experience.component.html',
  styleUrls: ['./sidenav-experience.component.css']
})
export class SidenavExperienceComponent implements OnInit {

  constructor(private experienceService: ExperienceService) { }

  get currentPage() {
    return this.experienceService.currentPage;
  }

  ngOnInit() {
  }

}
