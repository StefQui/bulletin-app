import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-subject-card',
  templateUrl: './subject-card.component.html',
  styleUrls: ['./subject-card.component.scss']
})
export class SubjectCardComponent implements OnInit {
@Input()
public subjectTitle;
  constructor() { }

  ngOnInit() {
  }

}
