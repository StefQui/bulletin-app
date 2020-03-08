import { Component } from '@angular/core';
import notes from './pronote.json';
import subjects from './subjects.json';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'bulletin-app';
  subjects = [];
  notes = [];
  subjectIds: string[];

  constructor(private http: HttpClient) {
    console.log(subjects);
    this.subjects = subjects;
    this.notes = notes;
    this.subjectIds = this.subjects.map((aa) => aa.subject);
    const url = 'https://raw.githubusercontent.com/StefQui/bulletin-app/master/src/app/pronote.json';
    this
      .http
      .get<any>(`${url}`)
      .pipe(
//        tap((res) => this.pronote = res)
      )
      .subscribe();
  }

  getNotes(subject: string) {
    return this.notes.filter((s) => s.subject === subject);
  }
}
