import { async, getTestBed, TestBed } from "@angular/core/testing";
import {
  BaseRequestOptions,
  Http,
  Response,
  ResponseOptions,
  XHRBackend
} from "@angular/http";
import { MockBackend, MockConnection } from "@angular//http/testing";
import { JobsService } from "./jobs.service";
import { Job } from "../models/Job";

describe("Service: JobsService", () => {
  let backend: MockBackend;
  let service: JobsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        BaseRequestOptions,
        MockBackend,
        JobsService,
        {
          deps: [MockBackend, BaseRequestOptions],
          provide: Http,
          useFactory: (
            backend: XHRBackend,
            defaultOptions: BaseRequestOptions
          ) => {
            return new Http(backend, defaultOptions);
          }
        }
      ]
    });

    const testbed = getTestBed();
    backend = testbed.get(MockBackend);
    service = testbed.get(JobsService);
  }));

  function setupConnections(backend: MockBackend, options: any) {
    backend.connections.subscribe((connection: MockConnection) => {
      if (connection.request.url === "http://localhost:3000/jobs") {
        const responseOptions = new ResponseOptions(options);
        const response = new Response(responseOptions);

        connection.mockRespond(response);
      }
    });
  }

  it("should return the list of Jobs from the server on success", () => {
    setupConnections(backend, {
      jobs: {
        body: [
          {
            id: "98969442",
            title: "90 m² Dach neu eindecken, Material benötigt",
            zip_code: "10115",
            city: "Berlin",
            state: "active"
          }
          // {
          //   id: 4,
          //   questions: [],
          //   title: "Burrito"
          // },
          // {
          //   id: 2,
          //   questions: [],
          //   title: "Cheeseburger"
          // }
        ]
      },
      status: 200
    });

    service.getJobs().subscribe((data: Job[]) => {
      expect(data.length).toBe(1);
      expect(data[0].title).toBe("90 m² Dach neu eindecken, Material benötigt");
      // expect(data[1].title).toBe("");
      // expect(data[2].title).toBe("");
    });
  });

  // it("should log an error to the console on error", () => {
  //   setupConnections(backend, {
  //     body: { error: `I'm afraid I've got some bad news!` },
  //     status: 500
  //   });
  //   spyOn(console, "error");

  //   service.getJobs().subscribe(null, () => {
  //     expect(console.error).toHaveBeenCalledWith(
  //       `I'm afraid I've got some bad news!`
  //     );
  //   });
  // });
});
