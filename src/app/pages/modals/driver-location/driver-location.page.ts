import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Platform } from '@ionic/angular';
import { environment } from 'src/environments/environment';
//import { GoogleMap } from '@capacitor/google-maps';
//import { LatLng } from '@capacitor/google-maps/dist/typings/definitions';
@Component({
  selector: 'app-driver-location',
  templateUrl: './driver-location.page.html',
  styleUrls: ['./driver-location.page.scss'],
})
export class DriverLocationPage implements OnInit {
  @ViewChild('map', { static: false }) mapElement: ElementRef;
  map: google.maps.Map;
  home: google.maps.Marker;
  lat: number = 31;
  long: number = 31;
  infowindow = new google.maps.InfoWindow();
  constructor(private plt:Platform) { 
    // this.center = {
    //   lat: 31,
    //   lng: 31,
    // };
  }

  // async createMap() {
  //   this.newMap = await GoogleMap.create({
  //     id: 'capacitor-google-map',
  //     element: this.mapRef.nativeElement,
  //     apiKey: environment.Google_API_KEY,
  //     config: {
  //       center: this.center,
  //       zoom: 8,
  //     },
  //   });
  //   this. addMarker();
  // }

  // async addMarker() {
  //   // Add a marker to the map
  //   await this.newMap.addMarker({
  //     coordinate: this.center,
    
  //     iconUrl:'./../../../../assets/icon/location_pin.svg'
  //   });
  //   await this.newMap.setCamera({
  //     coordinate: this.center,
  //   });
  // }
  ngAfterViewInit() {
    this.loadMap();
    this.loadItemPosition();
  }
  ngOnInit() {
    
  }
  loadMap() {
    let latLng = new google.maps.LatLng(this.lat, this.long);

    let styles: google.maps.MapTypeStyle[] = [
      {
        featureType: 'poi',
        stylers: [
          {
            visibility: 'off',
          },
        ],
      },
    ];

    let mapOptions: google.maps.MapOptions = {
      center: latLng,
      zoom: 2,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: styles,
      mapTypeControl: false,
    };

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  }

  loadItemPosition() {
    this.plt.ready().then(() => {
      this.focusMap(this.lat, this.long);
      this.addMarker(this.lat, this.long);
    });
  }

  focusMap(lat, lng) {
    let latLng = new google.maps.LatLng(lat, lng);
    this.map.setCenter(latLng);
    this.map.setZoom(10);
  }

  addMarker(lat, lng) {
    let latLng = new google.maps.LatLng(lat, lng);

    this.home = new google.maps.Marker({
      map: this.map,
      position: latLng,
      animation: google.maps.Animation.DROP,
      icon: './../../../../assets/icon/location_pin.svg',
    });
  }
}
