import { Component, OnInit } from '@angular/core';
import { Question } from '../../objects/question';
import { QuestionService } from '../../services/question.service'
import { Member } from '../../objects/member';
import { MemberService } from '../../services/member.service'
import { FormBuilder, Validators, FormArray, FormGroup, FormControl } from "@angular/forms";
import { ResponseService } from '../../services/response.service';
import { FormResponse } from '../../objects/formResponse';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  constructor(
    private memberService: MemberService,
    private questionService: QuestionService,
    private responseService: ResponseService,
    public fb: FormBuilder
  ) { }

  selectedMemberId: number
  members: Member[]
  dates: Date[]
  questions: Question[]

  memberForm = new FormGroup({
    membersControl: new FormControl('', Validators.required)
  })

  questionsForm = new FormGroup({
    datesControl: new FormControl('', Validators.required),
    questions: new FormArray([])
  })

  ngOnInit(): void {
    this.getMembers()
  }

  getMembers(): void {
    this.memberService.getMembers()
      .subscribe( members => {
        this.members = members
      })
  }

  get questionControls(): FormArray {
    return this.questionsForm.get('questions') as FormArray;
  }

  getQuestions(): void {
    this.questionService.getQuestions()
      .subscribe( questions => {
        questions.forEach(question => {
          this.addNameField()
        })
        this.questions = questions;
      })
  }

  getDates(memberId: number): void {
    this.responseService.getDates(memberId)
      .subscribe( dates => {
        this.dates = dates;
      })
  }

  addNameField() {
    this.questionControls.push(new FormControl('', Validators.required));
  }

  onMemberSelect() {
    this.selectedMemberId = this.memberForm.value["membersControl"]
    this.getDates(this.selectedMemberId)
    this.getQuestions()
  }

  onSubmit() {
    this.responseService.postResponse(this.buildResponseDTO())
      .subscribe(
        function(response) { console.log("Success Response" + response)}
      )
  }

  buildResponseDTO(): FormResponse {
    var answerIds: number[] = new Array()

    for (let i = 0; i < this.questionControls.length; i++) {
      answerIds.push(this.questionControls.at(i).value)
    }

    var resp: FormResponse = {
      memberId:  this.selectedMemberId,
      date: this.questionsForm.value["datesControl"],
      answerIds: answerIds
    }    

    return resp
  }

}
