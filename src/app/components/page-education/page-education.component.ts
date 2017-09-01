import { Component, OnInit } from '@angular/core';
import { ExperienceService } from '../../services/experience.service';

import * as _ from 'lodash';


@Component({
  selector: 'app-page-education',
  templateUrl: './page-education.component.html',
  styleUrls: ['./page-education.component.css']
})
export class PageEducationComponent implements OnInit {
  institution = '';
  courses = [];
  degree = [];

  constructor(private experienceService: ExperienceService) { }

  ngOnInit() {
    this.experienceService.getEducationSummary().then(education => {
      this.institution = education.institution.name;
      this.degree = education.institution.degree;
      let courses = {};
      education.institution.courses.forEach(c => {
        if (!courses[c.category]) {
          (courses[c.category] = [])
        }
        courses[c.category].push(c.name)
      })
      this.courses = _.zip(_.keys(courses), _.values(courses))
    })
  }
}
