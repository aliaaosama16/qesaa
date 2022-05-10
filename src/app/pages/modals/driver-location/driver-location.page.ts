import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GoogleMap } from '@capacitor/google-maps';
import { LatLng } from '@capacitor/google-maps/dist/typings/definitions';
@Component({
  selector: 'app-driver-location',
  templateUrl: './driver-location.page.html',
  styleUrls: ['./driver-location.page.scss'],
})
export class DriverLocationPage implements OnInit {
  @ViewChild('map')
  mapRef: ElementRef<HTMLElement>;
  newMap: GoogleMap;
  center: LatLng;
  markerId: string;
  constructor() { 
    this.center = {
      lat: 31,
      lng: 31,
    };
  }

  async createMap() {
    this.newMap = await GoogleMap.create({
      id: 'capacitor-google-map',
      element: this.mapRef.nativeElement,
      apiKey: environment.Google_API_KEY,
      config: {
        center: this.center,
        zoom: 8,
      },
    });
    this. addMarker();
  }

  async addMarker() {
    // Add a marker to the map
    await this.newMap.addMarker({
      coordinate: this.center,
    
      iconUrl:'./../../../../assets/icon/location_pin.svg'
    });
    await this.newMap.setCamera({
      coordinate: this.center,
    });
  }

  ngOnInit() {
    
  }

  ngAfterViewInit() {
    this.createMap();
  }
}
