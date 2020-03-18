import { Component, OnInit } from '@angular/core';
import { Question } from '../question';
import { QUESTIONS } from '../mock-questions';


@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  questions = QUESTIONS;

  selectedQuestion: Question;
  
  onSelect(question: Question): void {
    this.selectedQuestion = question
  }

}
