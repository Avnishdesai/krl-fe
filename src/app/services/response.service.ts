import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessageService } from './message.service';
import { getDefaultService } from '../../../node_modules/@types/selenium-webdriver/edge';
import { Observable } from '../../../node_modules/rxjs';
import { FormResponse } from '../objects/formResponse';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResponseService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }


  private datesURL = environment.remoteHost + '/getApplicableSubmissionDates/'
  private responseURL = environment.remoteHost + '/response'
  
  getDates(memberId: number): Observable<Date[]> {
    const url = `${this.datesURL}/${memberId}`;
    this.messageService.add('ResponseService: fetching dates from ' + url);
    return this.http.get<Date[]>(url)
  }

  postResponse(formResponse: FormResponse): Observable<{}> {
    return this.http.post(this.responseURL, formResponse)
  }

}
