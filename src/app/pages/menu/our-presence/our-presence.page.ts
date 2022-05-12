import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-our-presence',
  templateUrl: './our-presence.page.html',
  styleUrls: ['./our-presence.page.scss'],
})
export class OurPresencePage implements OnInit {

  @ViewChild('map', { static: false }) mapElement: ElementRef;
  map: google.maps.Map;
  home: google.maps.Marker;
  lat: number = 31;
  long: number = 31;
  infowindow = new google.maps.InfoWindow();
  constructor(private plt:Platform) { 
    
  }


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
