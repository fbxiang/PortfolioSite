import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { HeadbarComponent } from './components/headbar/headbar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { FootnoteComponent } from './components/footnote/footnote.component';
import { FanboComponent } from './components/fanbo/fanbo.component';
import { PorfolioComponent } from './components/portfolio/portfolio.component';
import { SidenavbarComponent } from './components/sidenavbar/sidenavbar.component';

import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '@angular/material';

const routes: Routes = [
  {path: '', component: FanboComponent ,
   children: [
     {path: '', redirectTo: 'home'},
     {path: 'home', component: GalleryComponent},
     {path: 'portfolio', component: PorfolioComponent}
   ]},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    FlexLayoutModule
  ],
  declarations: [
    HeadbarComponent,
    NavbarComponent,
    GalleryComponent,
    FootnoteComponent,
    FanboComponent,
    PorfolioComponent,
    SidenavbarComponent
  ],
  exports: [
    FanboComponent
  ]
})
export class FanboModule {}
