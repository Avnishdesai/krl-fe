import { Component, OnInit } from '@angular/core';
import { Question } from '../objects/question';
import { QuestionService } from '../services/question.service'
import { FormBuilder, Validators, FormArray, FormGroup, FormControl } from "@angular/forms";


@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {

  constructor(
    private questionService: QuestionService,
    public fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getQuestions()
  }

  questions: Question[];
  isSubmitted = false;

  angForm = new FormGroup({
    names: new FormArray([
      new FormControl('', Validators.required),
      new FormControl('', Validators.required),
    ])
  });

  get names(): FormArray {
    return this.angForm.get('names') as FormArray;
  }

  onSubmit() {
    for (let i = 0; i < this.names.length; i++) {
      console.log(this.names.at(i).value);
    }
  }

  getQuestions(): void {
    this.questionService.getQuestions()
      .subscribe( questions => {
        console.log(questions);
        questions.forEach(question => {
          this.addNameField()
        })
        this.questions = questions;
      })
  }

  addNameField() {
    this.names.push(new FormControl('', Validators.required));
    console.log("Added form control")
  }

}
