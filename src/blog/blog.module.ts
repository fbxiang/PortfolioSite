import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '@angular/material';
import { HttpModule } from '@angular/http';
import { CodemirrorModule } from 'ng2-codemirror';

import { MathCodeDirective } from './directives/mathcode.directive';

import { BlogPageComponent } from './components/blogpage/blogpage.component';
import { MarkdownComponent } from './components/markdown/markdown.component';
import { BlogComponent } from './components/blog/blog.component';
import { InfoDialogComponent } from './components/infodialog/infodialog.component';
import { BlogLoginComponent } from './components/bloglogin/bloglogin.component';
import { BlogMainComponent } from './components/blogmain/blogmain.component';
import { BlogClipComponent } from './components/blogclip/blogclip.component';
import { BlogAboutComponent } from './components/blogabout/blogabout.component';

import { HighlightJsModule, HighlightJsService } from 'angular2-highlight-js';

import { BlogService } from './services/blog.service';
import { AuthenticationService } from './services/authentication.service';

const routes: Routes = [
  {path: '', component: BlogComponent,
   children: [
     {path: '', redirectTo: 'page'},
     {path: 'page', component: BlogMainComponent},
     {path: 'page/:author/:title', component: BlogPageComponent},
     {path: 'about', component: BlogAboutComponent}
   ]},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    HttpModule,
    FormsModule,
    CodemirrorModule
  ],
  declarations: [
    MathCodeDirective,
    BlogPageComponent,
    MarkdownComponent,
    BlogComponent,
    InfoDialogComponent,
    BlogLoginComponent,
    BlogMainComponent,
    BlogClipComponent,
    BlogAboutComponent
  ],
  providers: [
    HighlightJsService,
    BlogService,
    AuthenticationService
  ],
  bootstrap: [
    InfoDialogComponent,
    BlogLoginComponent
  ],
  exports: [
    BlogPageComponent
  ]
})
export class BlogModule {}
