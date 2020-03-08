import { Component } from '@angular/core';
import data from './pronote.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'bulletin-app';
  pronote = [];

  constructor() {
    console.log(data);
    this.pronote = data;
  }
}
