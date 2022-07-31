import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stat-form',
  templateUrl: './stat-form.component.html',
  styleUrls: ['./stat-form.component.sass']
})
export class StatFormComponent implements OnInit {

  value18: number = 10.50;

  constructor() { }



  ngOnInit(): void {
    const val : number = 0;
  }

}
