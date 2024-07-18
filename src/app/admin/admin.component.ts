import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { lastValueFrom } from 'rxjs';
import { StandardResponse } from '../models/standard-response-model'

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  year = '';

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
  }

  async sortYear(){
    const year = "2024"
    console.log(this.year)
    await lastValueFrom(this.http.post<StandardResponse>('api/stats/sortDates', {year: this.year}))
    .then((response: StandardResponse) => {
      return this.messageService.add({severity:'success', summary: 'Success', detail: response?.message});
    })
    .catch((error: StandardResponse) => {
      this.messageService.add({severity:'error', summary: 'Error', detail: error?.message});
    })
  }
}
