import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { HeadbarComponent } from './components/headbar/headbar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { FootnoteComponent } from './components/footnote/footnote.component';
import { FanboComponent } from './components/fanbo/fanbo.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { SidenavbarComponent } from './components/sidenavbar/sidenavbar.component';
import { PortfolioPageComponent } from './components/portfoliopage/portfoliopage.component';

import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '@angular/material';
import { HttpModule } from '@angular/http';

import { PageNotFoundComponComponent } from './components/pagenotfound/pagenotfound.component';

import { PortfolioService } from './services/portfolio.service';

const routes: Routes = [
  {path: '', component: FanboComponent ,
   children: [
     {path: '', redirectTo: 'home'},
     {path: 'home', component: GalleryComponent},
     {path: 'portfolio', component: PortfolioComponent,
      children: [
        {path: '', component: PageNotFoundComponComponent},
        {path: ':id', component: PortfolioPageComponent}
      ]
     },
   ]},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpModule,
    MaterialModule,
    FlexLayoutModule,
  ],
  declarations: [
    HeadbarComponent,
    NavbarComponent,
    GalleryComponent,
    FootnoteComponent,
    FanboComponent,
    PortfolioComponent,
    SidenavbarComponent,
    PageNotFoundComponComponent,
    PortfolioPageComponent
  ],
  providers: [
    PortfolioService
  ],
  exports: [
    FanboComponent
  ]
})
export class FanboModule {}