import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AgencyServiceService {

  private apiUrl = 'https://api.foia.gov/api/agency_components/';
  private apiKey = '50ffhqt39ag0oESvrzBqRL9p2sRTBMmD8b9g5QFj';
  private headers = new HttpHeaders().set('X-API-Key', this.apiKey);

  constructor(private http: HttpClient) {}

  fetchData(pageSize: number, currentPage: number) {
    const params = new HttpParams()
      .set('fields[agency_component]', 'title,abbreviation,website,submission_address')
      .set('page[limit]', pageSize.toString())
      .set('page[offset]', ((currentPage - 1) * pageSize).toString());

    return this.http.get(this.apiUrl, { headers: this.headers, params });
  }

  fetchAgencyDetails(agencyId: any) {
    return this.http.get(this.apiUrl + agencyId, { headers: this.headers });
  }


}
