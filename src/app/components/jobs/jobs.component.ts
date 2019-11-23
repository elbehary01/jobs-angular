import { Component, OnInit } from '@angular/core';
import { JobsService } from '../../services/jobs.service'
import { Job } from '../../models/Job'

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {
  jobs: Job[];

  constructor(private jobsService: JobsService) { }

  ngOnInit() {
    this.jobsService.getJobs().subscribe(jobs => {
       this.jobs = jobs
     });
  }

}
