import { Component, OnInit } from '@angular/core';
import { JobsService } from 'src/app/services/jobs.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Job } from 'src/app/models/Job';

@Component({
  selector: "app-job-details",
  templateUrl: "./job-details.component.html",
  styleUrls: ["./job-details.component.css"]
})
export class JobDetailsComponent implements OnInit {
  id: string;
  job: Job;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private jobsService: JobsService) { }

  ngOnInit() {
    // Get Id Form Url
    this.id = this.route.snapshot.params["id"];
    this.jobsService.getSingleJob(this.id)

  }
}
