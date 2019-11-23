import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http'

import { Job } from '../models/Job'

@Injectable({
  providedIn: 'root'
})
export class JobsService {
  jobsUrl: string = 'https://jsonplaceholder.typicode.com/todos';


  constructor(private http: HttpClient) { }

  getJobs():Observable<Job[]> {
    return this.http.get<Job[]>(this.jobsUrl);
  }
}
