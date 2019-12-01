import { TestBed, tick, fakeAsync, inject, async } from "@angular/core/testing";
import { AppComponent } from "./app.component";
import { Router } from "@angular/router";
import { JobsComponent } from "./components/jobs/jobs.component";
import { JobDetailsComponent } from "./components/job-details/job-details.component";
import { RouterTestingModule } from "@angular/router/testing";
import { routes } from "./app-routing.module";
import { Location } from "@angular/common";
import { JobItemComponent } from "./components/job-item/job-item.component";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { JobsService } from "./services/jobs.service";
import { NavbarComponent } from "./components/navbar/navbar.component";

describe("Router: App", () => {
  let location: Location;
  let router: Router;
  let fixture;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
        HttpClientTestingModule
      ],
      declarations: [
        JobsComponent,
        JobItemComponent,
        JobDetailsComponent,
        AppComponent,
        NavbarComponent
      ],
      providers: [JobsService]
    });

    router = TestBed.get(Router);
    location = TestBed.get(Location);

    fixture = TestBed.createComponent(AppComponent);
    router.initialNavigation();
  });

  it("should get the from ApiJobs", inject(
    [HttpTestingController, JobsService],
    (httpMock: HttpTestingController, jobService: JobsService) => {
      expect(jobService).toBeTruthy();
    }
  ));

  it("should navigate to Jobs page", fakeAsync(() => {
    router.navigate([""]);
    tick();
    expect(location.path()).toBe("/");
  }));

  it("should navigate to JobDetails", fakeAsync(() => {
    router.navigate(["/job/:id"]);
    tick();
    expect(location.path()).toBe("/job/:id");
  }));

  it("should create NavBar", async(() => {
    const fixture = TestBed.createComponent(NavbarComponent);
    const NavBar = fixture.debugElement.componentInstance;
    expect(NavBar).toBeTruthy();
  }));
});
