import { Injectable } from '@angular/core';
import { MessageService } from './message.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Member } from '../objects/member';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  private membersURL = environment.remoteHost + '/getMembers'

  getMembers(): Observable<Member[]> {
    this.messageService.add('fetched members');
    return this.http.get<Member[]>(this.membersURL)
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
  this.messageService.add(`MemberService: ${message}`);
  }
}
