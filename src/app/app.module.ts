import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { RouterModule, Routes } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AgencyDetailsComponent } from './components/agency-details/agency-details.component';
import {MatListModule} from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon'


const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'agency/:agency_id', component: AgencyDetailsComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    AgencyDetailsComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    MatTableModule,
    MatPaginatorModule,
    MatListModule,
    MatIconModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule { }
