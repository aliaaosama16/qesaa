import { Platform } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LanguageService } from 'src/app/services/language/language.service';
import { environment } from 'src/environments/environment';
// import { GoogleMap } from '@capacitor/google-maps';
// import { LatLng } from '@capacitor/google-maps/dist/typings/definitions';
declare var google: any;
@Component({
  selector: 'app-donation-order',
  templateUrl: './donation-order.page.html',
  styleUrls: ['./donation-order.page.scss'],
})
export class DonationOrderPage implements OnInit {
  @ViewChild('map', { static: false }) mapElement: ElementRef;
  map: google.maps.Map;
  home: google.maps.Marker;
  lat: number = 31;
  long: number = 31;
  infowindow = new google.maps.InfoWindow();
  currentLanguage: string;
  donationForm: FormGroup;
  requestImage: string = '';

  requestTimes: any = [
    {
      id: 1,
      text: 'من  9 الى 11 ظهرا ',
    },
    {
      id: 2,
      text: 'من  9 الى 11 ظهرا ',
    },
    {
      id: 3,
      text: 'من  9 الى 11 ظهرا ',
    },
    {
      id: 4,
      text: 'من  9 الى 11 ظهرا ',
    },
    {
      id: 5,
      text: 'من  9 الى 11 ظهرا ',
    },
    {
      id: 6,
      text: 'من  9 الى 11 ظهرا ',
    },
  ];
  constructor(
    private languageService: LanguageService,
    private formBuilder: FormBuilder,
    private plt: Platform
  ) {
    this.currentLanguage = this.languageService.getLanguage();
<<<<<<< HEAD
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
    //this. addMarker();
  }

  async addMarker() {
    // Add a marker to the map
    await this.newMap.addMarker({
      coordinate: this.center,
      draggable: true,
    });
    
=======
>>>>>>> a3d6e34c8dfcdc74e23deba0d490eca9a3e5b1c1
  }

  ngOnInit() {
    this.buildForm();
   
  }

  
  ngAfterViewInit() {
    this.loadMap();
    this.loadItemPosition();
  }

  buildForm() {
    this.donationForm = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.minLength(2)]],
      phoneNumber: [
        '',
        [
          Validators.required,
          Validators.pattern(/^05/),
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
      city: ['', [Validators.required, Validators.minLength(2)]],
      neighborhood: ['', [Validators.required, Validators.minLength(2)]],
      request: ['', [Validators.required, Validators.minLength(2)]],
      notices: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  chooseTime($event) {
    console.log('selected time :' + $event.target.value);
  }

  attachImage() {
    // get image from camera or gallery
    console.log('get image from camera or gallery');
  }

  donate() {}

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
    this.map.setZoom(15);
  }

  addMarker(lat, lng) {
    let latLng = new google.maps.LatLng(lat, lng);

    this.home = new google.maps.Marker({
      map: this.map,
      position: latLng,
      animation: google.maps.Animation.DROP,
      icon: './../../../../assets/icon/location-pin-small.svg',
    });
  }
}
