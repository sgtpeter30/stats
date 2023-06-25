import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { pizzaList, kitsList } from "../../assets/pizzaList";
import { HttpClient } from '@angular/common/http';
import { dialogflow } from 'googleapis/build/src/apis/dialogflow';


@Component({
  selector: 'app-stat-form',
  templateUrl: './stat-form.component.html',
  styleUrls: ['./stat-form.component.scss']
})
export class StatFormComponent implements OnInit {

  pizzaBaseData = pizzaList;
  pizzaSum: number = 0;
  kitSum: number = 0;
  currentBase = {};


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
    if (this.pizzaForm.valid) {
      const formValue = {
        // zmienić potem na faktyczny rok wybrany z daty!
        year: 2023,
        value: [...this.currentBase as any, this.pizzaForm.value]
      }
      // let sendData = this.http.post('http://localhost:3500/stats?year=2023', formValue);
      // sendData.subscribe(response =>{
      //   console.log(response);
      // });

      this.http.put('http://localhost:3500/stats/2023', formValue).subscribe({
        next: (response) => {
          alert('Wysłano')

        }, error: (err) => {
          console.log(err)
          alert(err.message)
        }
      });

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
    if(type.controls.pizzaName){
      type.setValue({
        pizzaName: type.controls.pizzaName.value,
        pizzaQuantity: type.controls.pizzaQuantity.value+1
      })
    }else{
      type.setValue({
        kitName: type.controls.kitName.value,
        kitQuantity: type.controls.kitQuantity.value+1
      })
    }
  }
  singleClickMinus = (type)=>{
    if(type.controls.pizzaQuantity){
      if(type.controls.pizzaQuantity.value !== 0){
        type.setValue({
          pizzaName: type.controls.pizzaName.value,
          pizzaQuantity: type.controls.pizzaQuantity.value-1
        })
      }
    }else{
      if(type.controls.kitQuantity.value !== 0){
        type.setValue({
          kitName: type.controls.kitName.value,
          kitQuantity: type.controls.kitQuantity.value-1
        })
      }
    }
  }
  ngOnInit(): void {
    // console.log("pizzaList");
    // console.log(pizzaList);

    this.http.get('http://localhost:3500/stats/2023').subscribe((res: any)=> {
      this.currentBase = res.value
      console.log(res)
    });

    this.pizzaForm.valueChanges.subscribe(value => {
      this.pizzaSum = value.pizzaArray.reduce((accumulator, object) => {
        return accumulator + object.pizzaQuantity;
      }, 0);
      this.kitSum = value.kitsArray.reduce((accumulator, object) => {
        return accumulator + object.kitQuantity;
      }, 0);
 });
  };
}
