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
import { HighlightJsModule, HighlightJsService } from 'angular2-highlight-js';

import { BlogService } from './services/blog.service';

const routes: Routes = [
  {path: '', component: BlogComponent,
   children: [
     {path: '', redirectTo: 'page'},
     {path: 'page', component: BlogPageComponent},
     {path: 'page/:author/:title', component: BlogPageComponent},
     {path: 'about', component: BlogPageComponent}
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
    InfoDialogComponent
  ],
  providers: [
    HighlightJsService,
    BlogService
  ],
  bootstrap: [
    InfoDialogComponent
  ],
  exports: [
    BlogPageComponent
  ]
})
export class BlogModule {}
