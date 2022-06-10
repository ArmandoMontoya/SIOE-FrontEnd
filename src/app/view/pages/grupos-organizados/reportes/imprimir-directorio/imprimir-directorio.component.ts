import { NgModule, Component, enableProdMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { DxPieChartModule } from 'devextreme-angular';
import { Service } from './app.service';

 class Area {
  country: string;

  area: number;
}

@Component({
  selector: 'app-imprimir-directorio',
  templateUrl: './imprimir-directorio.component.html',
  styleUrls: ['./imprimir-directorio.component.scss']
})
export class ImprimirDirectorioComponent  {


  constructor() {
    this.areas = this.getAreas();
  }

  pointClickHandler(e) {
    this.toggleVisibility(e.target);
  }

  legendClickHandler(e) {
    const arg = e.target;
    const item = e.component.getAllSeries()[0].getPointsByArg(arg)[0];

    this.toggleVisibility(item);
  }

  toggleVisibility(item) {
    if (item.isVisible()) {
      item.hide();
    } else {
      item.show();
    }
  }

  areas: Area[] = [{
    country: 'Russia',
    area: 12,
  }, {
    country: 'Canada',
    area: 7,
  }, {
    country: 'USA',
    area: 7,
  }, {
    country: 'China',
    area: 7,
  }, {
    country: 'Brazil',
    area: 6,
  }, {
    country: 'Australia',
    area: 5,
  }, {
    country: 'India',
    area: 2,
  }, {
    country: 'Others',
    area: 55,
  }];

  getAreas(): Area[] {
    return this.areas;
  }
}
