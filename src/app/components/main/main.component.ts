import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { AgencyServiceService } from 'src/app/services/agency-service.service';


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
  public pageSize = 10;
  private currentPage = 1;
  public totalItems = 0;

  constructor(private router: Router,
              private agencyService: AgencyServiceService) {}

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.agencyService.fetchData(this.pageSize, this.currentPage)
      .subscribe(
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
