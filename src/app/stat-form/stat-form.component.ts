import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import { FormGroup, FormControl, FormBuilder, Form, FormArray, RequiredValidator, Validators } from '@angular/forms';
import { pizzaList, kitsList } from "../../assets/pizzaList";
import { fileUsage } from "./file-usage"
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-stat-form',
  templateUrl: './stat-form.component.html',
  styleUrls: ['./stat-form.component.scss']
})
export class StatFormComponent implements OnInit {

  pizzaBaseData = pizzaList;


  pizzaForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
  ) {
    const preparedPizzas = [];
    const preparedKits = [];
    this.pizzaBaseData.forEach(element => {
      preparedPizzas.push(
        this.fb.group({
          pizzaName: this.fb.control(element.name),
          pizzaQuantity: this.fb.control(element.value),
        })
      )
    });
    kitsList.forEach(element => {
      preparedKits.push(
        this.fb.group({
          kitName: this.fb.control(element.name),
          kitQuantity: this.fb.control(element.value),
        })
      )
    });

    // inicjalizacja formularza
    this.pizzaForm = this.fb.group({
      date: this.fb.control('', [Validators.required]),
      halvesQuantity: this.fb.control(0),
      halves: this.fb.array([]),
      pizzaArray: this.fb.array(preparedPizzas),
      kitsArray: this.fb.array(preparedKits)
    })
  }

  // submit
  submitForm = ()=>{
    console.log(this.pizzaForm.valid);
    console.log("sad")
    console.log(this.pizzaForm.value);
    if (this.pizzaForm.valid) {
      const formValue = this.pizzaForm.value
      let sendData = this.http.post('http://localhost:3000/2022', formValue);
      sendData.subscribe();
    }else{
      alert('Wybierz dzień!')
    }

  };
  // file
  pickedDate = async (date)=>{
    // loadFile();
  }
  // spredsheet
  // pickedDate = async (date)=>{
  //   const response = await fetch(`http://localhost:1337/pizza/${date}`);
  //   const filledForm = await response.json();
  //   if(filledForm.valueRanges[0].values){
  //     this.pizzaForm.get('pizzaArray')['controls'] = []
  //     filledForm.valueRanges[0].values.forEach(value => {
  //       let pizzaName = value[0];
  //       let pizzaQuantity = value[1];
  //       this.pizzaForm.get('pizzaArray')['controls'].push(
  //         this.fb.group({
  //           pizzaName: this.fb.control(pizzaName),
  //           pizzaQuantity: this.fb.control(pizzaQuantity),
  //         })
  //       );
  //     });
  //   }
  // }
  halvesValue = 0;
  halfPizza = {
    firstHalf: '',
    secondHalf: '',
  };
  halfPizzaPlus = (type)=>{
    console.log(this.halvesValue);
    this.halvesValue++;
    switch(this.halvesValue){
      case 1:
        this.halfPizza.firstHalf = type.controls.pizzaName.value;
        break;
      case 2:
        this.halvesValue = 0;
        this.pizzaForm.controls['halvesQuantity'].setValue(this.pizzaForm.value.halvesQuantity + 1);
        this.halfPizza.secondHalf = type.controls.pizzaName.value;
        // this.pizzaForm.value.halves.push(this.fb.group(this.halfPizza));
        this.pizzaForm.get('halves')["push"](this.fb.group(this.halfPizza));
        break;
    }

    // if(this.halvesValue === 2){
    //   this.halvesValue = 0;
    //   this.pizzaForm.value.halvesQuantity = this.pizzaForm.value.halvesQuantity + 1;
    // }
    console.log(this.pizzaForm.value);
    type.setValue({
      pizzaName: type.controls.pizzaName.value,
      pizzaQuantity: type.controls.pizzaQuantity.value+.5
    })
  }
  halfPizzaMinus = (type)=>{
    if(type.controls.pizzaQuantity.value !== 0){
      if(this.halvesValue === 0){
        this.halvesValue = 1;
        this.pizzaForm.get('halves')["removeAt"](this.pizzaForm.controls['halves'].value.length);
        this.pizzaForm.controls['halvesQuantity'].setValue(this.pizzaForm.value.halvesQuantity - 1);
      }else{
        this.halvesValue = 0;
      }
      type.setValue({
        pizzaName: type.controls.pizzaName.value,
        pizzaQuantity: type.controls.pizzaQuantity.value-.5
      })
    }
  }

  singleClickPlus = (type)=>{
    type.setValue({
      pizzaName: type.controls.pizzaName.value,
      pizzaQuantity: type.controls.pizzaQuantity.value+1
    })
  }
  singleClickMinus = (type)=>{
    if(type.controls.pizzaQuantity.value !== 0){
      type.setValue({
        pizzaName: type.controls.pizzaName.value,
        pizzaQuantity: type.controls.pizzaQuantity.value-1
      })
    }
  }
  ngOnInit(): void {
    // console.log("pizzaList");
    // console.log(pizzaList);
    let req = this.http.get('http://localhost:3000/2022');
    req.subscribe( res => {
      console.log(res);
    });
  }
}
