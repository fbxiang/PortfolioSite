import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { FanboModule } from './fanbo.module';

import { AppComponent } from './components/app/app.component';

import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: "fanboxiang", pathMatch: 'full'},
  {path: 'fanboxiang', loadChildren: 'app/fanbo.module#FanboModule'}
]

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    BrowserAnimationsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
