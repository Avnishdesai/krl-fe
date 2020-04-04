import { Component, OnInit } from '@angular/core';
import { Member } from '../../objects/member';
import { MemberService } from '../../services/member.service'
import { Question } from '../../objects/question';
import { QuestionService } from '../../services/question.service'
import { FormBuilder, Validators, FormArray, FormGroup, FormControl } from "@angular/forms";


@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {

  constructor(
    private memberService: MemberService,
    private questionService: QuestionService,
    public fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getMembers()
  }

  selectedMember: Member
  members: Member[]
  questions: Question[];
  
  angForm = new FormGroup({
    membersControl: new FormControl('', Validators.required)
  })
  

  getMembers(): void {
    this.memberService.getMembers()
      .subscribe( members => {
        console.log(members)

        this.members = members
      })
  }

  onSubmit() {
      console.log(this.angForm.value);
  }

}
