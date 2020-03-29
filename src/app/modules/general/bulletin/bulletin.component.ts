import { Component } from '@angular/core';
import notes from './notes.json';
import subjects from './subjects.json';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-bulletin',
  templateUrl: './bulletin.component.html',
  styleUrls: ['./bulletin.component.scss']
})
export class BulletinComponent {
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
