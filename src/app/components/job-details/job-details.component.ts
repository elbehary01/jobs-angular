import { Component, OnInit } from "@angular/core";
import { JobsService } from "src/app/services/jobs.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Job } from "src/app/models/Job";

@Component({
  selector: "app-job-details",
  templateUrl: "./job-details.component.html",
  styleUrls: ["./job-details.component.css"]
})
export class JobDetailsComponent implements OnInit {
  id: string;
  job: Job[];
  item: Array<0>;

  constructor(
    private route: ActivatedRoute,
    private jobsService: JobsService
  ) {}

  ngOnInit() {
    // Get Id Form Url
    this.id = this.route.snapshot.params["id"];

    this.jobsService.getJobs().subscribe((jobs: any) => {
      let item = jobs.body.filter(x => x.id === this.id);
      console.log(item[0]);
      this.job = item[0];
      return this.job;
    });
  }
}
