import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InicioRoutingModule } from './inicio-routing.module';
import { InicioComponent } from './inicio.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// import { CalendarModule, DateAdapter } from 'angular-calendar';
// import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';


import { FullCalendarModule } from '@fullcalendar/angular'; // for FullCalendar!
import { SharedModule } from 'src/app/theme/shared/shared.module';

@NgModule({
  declarations: [InicioComponent],
  exports: [InicioComponent],
  imports: [
    CommonModule,
    SharedModule,
    InicioRoutingModule,
    FormsModule,
    NgbModalModule,
    FullCalendarModule // for FullCalendar!
    // CalendarModule.forRoot({
    //   provide: DateAdapter,
    //   useFactory: adapterFactory
    // })
  ]
})
export class InicioModule { }
