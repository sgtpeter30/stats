import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboards',
  templateUrl: './dashboards.component.html',
  styleUrls: ['./dashboards.component.scss']
})
export class DashboardsComponent implements OnInit {

  // data: [];
  statistics: any;


  constructor(
    private http: HttpClient,
    private act: ActivatedRoute
  ) {
    this.act.data.subscribe(res => {
      console.log(res);
      console.log(res['statistics']);
      this.statistics = res['statistics'];
      this.statistics.forEach(year =>{
        console.log("year");
        console.log(year);

        year.value.forEach(element => {
          if (element.pizzaArray) {
            element.pizzaSum = element.pizzaArray.reduce((accumulator, object) => {
              return accumulator + object.pizzaQuantity;
            }, 0);
            element.kitSum = element?.kitsArray.reduce((accumulator, object) => {
              return accumulator + object.kitQuantity;
            }, 0);
            element.othersSum = element?.othersArray?.reduce((accumulator, object) => {
              return accumulator + object.othersQuantity;
            }, 0);
            element.boxNumber = element?.othersArray?.find(element => element.othersName === "Pudełko do pizzy")?.othersQuantity
          }
        })
      });

    });
  }

  ngOnInit(): void {

  }

}
