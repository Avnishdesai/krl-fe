import { Injectable } from '@angular/core';
import { Question } from '../objects/question';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }
  
  private questionURL = 'http://localhost:8080/getQuestions'


  getQuestions(): Observable<Question[]> {
    this.messageService.add('QuestionService: fetched questions');
    return this.http.get<Question[]>(this.questionURL)
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
  this.messageService.add(`QuestionService: ${message}`);
}

}
