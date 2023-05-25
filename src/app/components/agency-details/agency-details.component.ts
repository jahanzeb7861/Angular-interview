import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AgencyServiceService } from 'src/app/services/agency-service.service';

@Component({
  selector: 'app-agency-details',
  templateUrl: './agency-details.component.html',
  styleUrls: ['./agency-details.component.css']
})
export class AgencyDetailsComponent implements OnInit {

  public agencyId: any;
  public agencyDetails: any;

  pageSizeOptions: number[] = [10,15,20,50];
  constructor(private route: ActivatedRoute,private agencyService: AgencyServiceService) { }


  ngOnInit() {
    const url = this.route.snapshot.url;
    const agencyId = url[url.length - 1].path;
    this.fetchAgencyDetails(agencyId);
  }


  fetchAgencyDetails(agencyId: any) {
    this.agencyService.fetchAgencyDetails(agencyId)
      .subscribe(
        (response: any) => {
          this.agencyDetails = response.data?.relationships;
        },
        (error) => {
          console.error(error);
        }
      );
  }

}
