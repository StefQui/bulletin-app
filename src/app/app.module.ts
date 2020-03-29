import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {environment} from '../environments/environment';
import {APP_BASE_HREF, HashLocationStrategy, LocationStrategy} from '@angular/common';
import { SubjectCardComponent } from './subject-card/subject-card.component';
import {HttpClientModule} from '@angular/common/http';
import { AboutComponent } from './modules/general/about/about.component';
import { BulletinComponent } from './modules/general/bulletin/bulletin.component';
import { StatComponent } from './modules/general/stat/stat.component';
import {AngularMultiSelectModule} from 'angular2-multiselect-dropdown';
import {FormsModule} from '@angular/forms';
import {ChartsModule} from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    SubjectCardComponent,
    AboutComponent,
    BulletinComponent,
    StatComponent
  ],
  imports: [
    AngularMultiSelectModule,
    BrowserModule,
    FormsModule,
    ChartsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: APP_BASE_HREF,
      useValue: environment.baseHref
    },
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
