import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '@angular/material';
import { HttpModule } from '@angular/http';
import { CodemirrorModule } from 'ng2-codemirror';

import { MathJaxDirective } from './directives/mathjax.directive';

import { BlogPageComponent } from './components/blogpage/blogpage.component';
import { MarkdownComponent } from './components/markdown/markdown.component';


const routes: Routes = [
  {path: '', component: BlogPageComponent}
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
    MathJaxDirective,
    BlogPageComponent,
    MarkdownComponent
  ],
  exports: [
    BlogPageComponent
  ]
})
export class BlogModule {}
