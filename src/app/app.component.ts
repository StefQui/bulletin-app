import { Component } from '@angular/core';
import notes from './modules/general/bulletin/notes.json';
import subjects from './modules/general/bulletin/subjects.json';
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
    const urlNotes = 'https://raw.githubusercontent.com/StefQui/bulletin-app/master/src/app/notes.json?' + new Date().getTime();
    const urlSubjects = 'https://raw.githubusercontent.com/StefQui/bulletin-app/master/src/app/subjects.json?' + new Date().getTime();
    this
      .http
      .get<any>(`${urlNotes}`)
      .pipe(
        tap((res) => this.notes = res)
      )
      .subscribe();
    this
      .http
      .get<any>(`${urlSubjects}`)
      .pipe(
        tap((res) => this.subjects = res)
      )
      .subscribe();
  }

  getNotes(subject: string) {
    return this.notes.filter((s) => s.subject === subject);
  }
}
