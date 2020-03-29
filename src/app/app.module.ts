import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {environment} from '../environments/environment';
import {APP_BASE_HREF} from '@angular/common';
import { SubjectCardComponent } from './subject-card/subject-card.component';
import {HttpClientModule} from '@angular/common/http';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';

const config = {
  apiKey: 'AIzaSyBqXydbUjlWfGAkiNAsiozNhNnjcf3_7Sc',
  projectId: 'bulletin-8c490',
  authDomain: 'localhost:4200',
  databaseURL: 'https://bulletin-8c490.firebaseio.com',
  storageBucket: ''
};

@NgModule({
  declarations: [
    AppComponent,
    SubjectCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
    AngularFirestoreModule
  ],
  providers: [{provide: APP_BASE_HREF, useValue: environment.baseHref }],
  bootstrap: [AppComponent]
})
export class AppModule { }
