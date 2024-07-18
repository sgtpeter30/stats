import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { pizzaList, kitsList, otherList } from "../../assets/pizzaList";
import { HttpClient } from '@angular/common/http';
import { StandardResponse } from '../models/standard-response-model';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-stat-form',
  templateUrl: './stat-form.component.html',
  styleUrls: ['./stat-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class StatFormComponent implements OnInit {
  @ViewChild('historyWrapper') historyWrapper!: ElementRef

  pizzaBaseData = pizzaList;
  pizzaSum: number = 0;
  kitSum: number = 0;
  others: number = 0;

  // currentBase = {};


  pizzaForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private messageService: MessageService
  ) {
    const preparedPizzas: any[] = [];
    const preparedKits: any[] = [];
    const preparedOthers: any[] = [];

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
      const formValue = this.pizzaForm.value
      const date = formValue.date.split('.');
      formValue.date = `${date[0]}.${date[1]}`
      const body ={
        year: date[2],
        value: formValue
      }
      console.log(formValue)
      console.log(body)

      this.http.post('api/stats/addDay', body).subscribe({
        next: (response) => {
          this.messageService.add({severity:'success', summary: 'Success', detail: 'Dodano dzień!'});
        }, error: (err: StandardResponse) => {
          console.log(err)
          this.messageService.add({severity:'error', summary: 'Error', detail: err.message});
        }
      });

    }else{
      alert('Wybierz dzień!')
    }

  };

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
        this.pizzaForm.get('halves')!["push"](this.fb.group(this.halfPizza));
        break;
    }

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
        this.pizzaForm.get('halves')!["removeAt"](this.pizzaForm.controls['halves'].value.length);
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
    const historyWrapper = this.historyWrapper?.nativeElement;
    const historyItem = `<span class="history-item">${item}</span>`
    historyWrapper.insertAdjacentHTML('beforeend', historyItem)
    historyWrapper.scrollTo(0, historyWrapper.getBoundingClientRect().bottom)
  }
}
