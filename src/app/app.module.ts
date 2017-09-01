import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HeadbarComponent } from './components/headbar/headbar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { FootnoteComponent } from './components/footnote/footnote.component';
import { AppComponent } from './components/app/app.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { SidenavbarComponent } from './components/sidenavbar/sidenavbar.component';
import { PortfolioPageComponent } from './components/portfoliopage/portfoliopage.component';
import { PortfolioBlockComponent } from './components/portfolioblock/portfolioblock.component';
import { PortfolioNavbarComponent } from './components/portfolionavbar/portfolionavbar.component';

import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '@angular/material';

import { PageNotFoundComponComponent } from './components/pagenotfound/pagenotfound.component';

import { MathJaxDirective } from './directives/mathjax.directive';

import { PortfolioService } from './services/portfolio.service';
import { ExperienceService } from './services/experience.service';

import { PageMainComponent } from './components/page-main/page-main.component';
import { SideInfoComponent } from './components/side-info/side-info.component';
import { PageEducationComponent } from './components/page-education/page-education.component';
import { SidenavExperienceComponent } from './components/sidenav-experience/sidenav-experience.component';
import { ExperienceComponent } from './components/experience/experience.component';

const routes: Routes = [
  {
    path: '', component: PageMainComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'home' },
      { path: 'home', component: GalleryComponent },
      {
        path: 'portfolio', component: PortfolioComponent,
        children: [
          { path: '', component: PortfolioPageComponent },
          { path: '404', component: PageNotFoundComponComponent },
          { path: ':name', canActivate: [PortfolioService], component: PortfolioPageComponent }
        ]
      }, {
        path: 'experience', component: ExperienceComponent,
        children: [
          { path: '', redirectTo: 'education', pathMatch: 'full' },
          { path: 'education', component: PageEducationComponent }
        ]
      }
    ]
  },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    HttpModule,
    MaterialModule,
    FormsModule
  ],
  entryComponents: [
  ],
  declarations: [
    HeadbarComponent,
    NavbarComponent,
    GalleryComponent,
    FootnoteComponent,
    AppComponent,
    PortfolioComponent,
    SidenavbarComponent,
    PageNotFoundComponComponent,
    PortfolioPageComponent,
    PortfolioNavbarComponent,
    PortfolioBlockComponent,
    MathJaxDirective,
    PageMainComponent,
    SideInfoComponent,
    PageEducationComponent,
    SidenavExperienceComponent,
    ExperienceComponent,
  ],
  providers: [
    PortfolioService, ExperienceService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
