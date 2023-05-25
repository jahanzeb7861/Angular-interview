import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-agency-details',
  templateUrl: './agency-details.component.html',
  styleUrls: ['./agency-details.component.css']
})
export class AgencyDetailsComponent implements OnInit {

  public agencyId: any;
  public agencyDetails: any;

  pageSizeOptions: number[] = [10,15,20,50];
  private apiKey = '50ffhqt39ag0oESvrzBqRL9p2sRTBMmD8b9g5QFj';
  private headers = new HttpHeaders().set('X-API-Key', this.apiKey);

  constructor(private route: ActivatedRoute,private http: HttpClient) { }


  ngOnInit() {
    const url = this.route.snapshot.url;
    const agencyId = url[url.length - 1].path;
    this.fetchAgencyDetails(agencyId);
  }
  fetchAgencyDetails(agencyId:any) {
    this.http.get('https://api.foia.gov/api/agency_components/'+agencyId, { headers: this.headers }).subscribe(
      (response: any) => {
        console.log(response);
        this.agencyDetails = response.data?.relationships;
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
