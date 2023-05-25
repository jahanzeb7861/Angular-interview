import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';


export interface AgencyComponent {
  title: string;
  abbreviation: string;
  website: string;
  submission_address: string;
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  displayedColumns: string[] = ['title', 'website', 'address'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  pageSizeOptions: number[] = [10,15,20,50];
  private apiUrl = 'https://api.foia.gov/api/agency_components';
  private apiKey = '50ffhqt39ag0oESvrzBqRL9p2sRTBMmD8b9g5QFj';
  private headers = new HttpHeaders().set('X-API-Key', this.apiKey);
  public pageSize = 10;
  private currentPage = 1;
  public totalItems = 0;

  constructor(private http: HttpClient,private router: Router) {}

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    const params = {
      'fields[agency_component]': 'title,abbreviation,website,submission_address',
      'page[limit]': this.pageSize.toString(),
      'page[offset]': ((this.currentPage - 1) * this.pageSize).toString()
    };

    this.http.get(this.apiUrl, { headers: this.headers, params }).subscribe(
      (response: any) => {
        this.dataSource = response.data;
        this.totalItems = response.meta?.pagination?.total;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  onPageChanged(pageEvent: PageEvent) {
    this.currentPage = pageEvent.pageIndex + 1;
    this.pageSize = pageEvent.pageSize;
    this.fetchData();
  }

  showAgencyDetails(row: any) {
    this.router.navigate(['/agency/'+row.id]);
  }

}
