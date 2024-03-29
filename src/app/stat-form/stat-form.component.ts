import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { pizzaList, kitsList, otherList } from "../../assets/pizzaList";
import { HttpClient } from '@angular/common/http';
import { dialogflow } from 'googleapis/build/src/apis/dialogflow';


@Component({
  selector: 'app-stat-form',
  templateUrl: './stat-form.component.html',
  styleUrls: ['./stat-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class StatFormComponent implements OnInit {

  pizzaBaseData = pizzaList;
  pizzaSum: number = 0;
  kitSum: number = 0;
  others: number = 0;

  currentBase = {};


  pizzaForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
  ) {
    const preparedPizzas = [];
    const preparedKits = [];
    const preparedOthers = [];

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
    otherList.forEach(element => {
      preparedOthers.push(
        this.fb.group({
          othersName: this.fb.control(element.name),
          othersQuantity: this.fb.control(element.value)
        })
      )
    })

    // inicjalizacja formularza
    this.pizzaForm = this.fb.group({
      date: this.fb.control('', [Validators.required]),
      halvesQuantity: this.fb.control(0),
      halves: this.fb.array([]),
      pizzaArray: this.fb.array(preparedPizzas),
      kitsArray: this.fb.array(preparedKits),
      othersArray: this.fb.array(preparedOthers)
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
    let historyItem
    switch(this.halvesValue){
      case 1:
        historyItem = `+ 1 połówka: ${type.controls.pizzaName.value}`;
        this.addToHistory(historyItem)

        this.halfPizza.firstHalf = type.controls.pizzaName.value;
        break;
      case 2:
        historyItem = `+ 2 połówka: ${type.controls.pizzaName.value}`;
        this.addToHistory(historyItem)

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
      const historyItem = `- połówka: ${type.controls.pizzaName.value}`;
      this.addToHistory(historyItem)
      type.setValue({
        pizzaName: type.controls.pizzaName.value,
        pizzaQuantity: type.controls.pizzaQuantity.value-.5
      })
    }
  }

  singleClickPlus = (type)=>{
    if(type.controls.pizzaName){
      const historyItem = `+ ${type.controls.pizzaName.value}`;
      this.addToHistory(historyItem)
      type.setValue({
        pizzaName: type.controls.pizzaName.value,
        pizzaQuantity: type.controls.pizzaQuantity.value+1
      })
    }
    else if(type.controls.othersName){
      const historyItem = `+ ${type.controls.othersName.value}`;
      this.addToHistory(historyItem)
      type.setValue({
        othersName: type.controls.othersName.value,
        othersQuantity: type.controls.othersQuantity.value+1
      })
    }
    else{
      const historyItem = `+ ${type.controls.kitName.value}`;
      this.addToHistory(historyItem)
      type.setValue({
        kitName: type.controls.kitName.value,
        kitQuantity: type.controls.kitQuantity.value+1
      })
    }
  }
  singleClickMinus = (type)=>{
    if(type.controls.pizzaQuantity){
      if(type.controls.pizzaQuantity.value !== 0){
        const historyItem = `- ${type.controls.pizzaName.value}`;
        this.addToHistory(historyItem)
        type.setValue({
          pizzaName: type.controls.pizzaName.value,
          pizzaQuantity: type.controls.pizzaQuantity.value-1
        })
      }
    }
    else if(type.controls.othersName){
      if(type.controls.othersQuantity.value !== 0){
        const historyItem = `- ${type.controls.othersName.value}`;
        this.addToHistory(historyItem)
        type.setValue({
          othersName: type.controls.othersName.value,
          othersQuantity: type.controls.othersQuantity.value-1
        })
      }
    }
    else{
      if(type.controls.kitQuantity.value !== 0){
        const historyItem = `- ${type.controls.kitName.value}`;
        this.addToHistory(historyItem)
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
      this.others = value.kitsArray.reduce((accumulator, object) => {
        return accumulator + object.othersQuantity;
      }, 0);
 });
  };

  addToHistory(item){
    const historyWrapper = document.querySelector('#history-wrapper');
    const historyItem = `<span class="history-item">${item}</span>`
    historyWrapper.insertAdjacentHTML('beforeend', historyItem)
    historyWrapper.scrollTo(0, historyWrapper.getBoundingClientRect().bottom)
  }
}
