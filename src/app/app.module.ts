import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { StatFormComponent } from './stat-form/stat-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    StatFormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    InputNumberModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
