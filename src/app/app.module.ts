import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule, NgxMatNativeDateModule } from '@angular-material-components/datetime-picker';
import { AppComponent } from './app.component';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// import { DatetimeComponent } from './datetime/datetime.component';


@NgModule({
  declarations: [
    AppComponent,
    // DatetimeComponent,
    // DatetimeInputComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    NgxMatTimepickerModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatIconModule,
    MatFormFieldModule,
    NgxMatNativeDateModule,
    MatNativeDateModule,
    MatInputModule,
    NgbModule,
    MatGridListModule,
    FontAwesomeModule,
    NgxMatDatetimePickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
