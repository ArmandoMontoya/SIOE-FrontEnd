import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Map, marker, tileLayer } from 'leaflet';



@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InicioComponent implements OnInit {



  constructor() {
  }

  ngOnInit() {

  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    const map = new Map('map').setView([20.8665,-101.5247], 13);

    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const markerItem = marker([20.8665,-101.5247]).addTo(map).bindPopup("Marcador");

    map.fitBounds([
      [markerItem.getLatLng().lat, markerItem.getLatLng().lng]
      
    ]);
    
  }

}
