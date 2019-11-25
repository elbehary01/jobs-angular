import { Component, OnInit } from '@angular/core';
import { JobsService } from 'src/app/services/jobs.service'
import { Job } from 'src/app/models/Job'

@Component({
  selector: "app-jobs",
  templateUrl: "./jobs.component.html",
  styleUrls: ["./jobs.component.css"]
})
export class JobsComponent implements OnInit {
  jobs: Job[];

  constructor(private jobsService: JobsService) {}

  ngOnInit() {
    this.jobsService.getJobs().subscribe((jobs: any) => {
      this.jobs = jobs.body;
    });
  }
}
