import { Component, OnInit } from '@angular/core';
import { Question } from '../../objects/question';
import { QuestionService } from '../../services/question.service'
import { Member } from '../../objects/member';
import { MemberService } from '../../services/member.service'
import { FormBuilder, Validators, FormArray, FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  constructor(
    private memberService: MemberService,
    private questionService: QuestionService,
    public fb: FormBuilder
  ) { }

  selectedMember: Member
  members: Member[]
  questions: Question[];
  angForm = new FormGroup({
    membersControl: new FormControl('', Validators.required),
    names: new FormArray([])
  })

  ngOnInit(): void {
    this.getMembers()
    this.getQuestions()
  }

  getMembers(): void {
    this.memberService.getMembers()
      .subscribe( members => {
        console.log(members)

        this.members = members
      })
  }

  get names(): FormArray {
    return this.angForm.get('names') as FormArray;
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

  onSubmit() {
    console.log(this.angForm.value);
    for (let i = 0; i < this.names.length; i++) {
      console.log(this.names.at(i).value);
    }
}

}
