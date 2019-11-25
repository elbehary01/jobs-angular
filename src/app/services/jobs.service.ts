import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http'

import { Job } from '../models/Job'

@Injectable({
  providedIn: "root"
})
export class JobsService {
  jobs: Job[];
  job: Observable<Job>;
  jobsUrl: string = "http://localhost:3000/jobs";

  constructor(private http: HttpClient) {}

  getJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(this.jobsUrl);
  }

  getSingleJob(id) {
    console.log(id)
  }
}
