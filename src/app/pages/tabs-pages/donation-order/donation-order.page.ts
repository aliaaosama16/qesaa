import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LanguageService } from 'src/app/services/language/language.service';
import { environment } from 'src/environments/environment';
import { GoogleMap } from '@capacitor/google-maps';
import { LatLng } from '@capacitor/google-maps/dist/typings/definitions';

@Component({
  selector: 'app-donation-order',
  templateUrl: './donation-order.page.html',
  styleUrls: ['./donation-order.page.scss'],
})
export class DonationOrderPage implements OnInit {
  currentLanguage: string;
  donationForm: FormGroup;
  requestImage: string = '';
  @ViewChild('map')
  mapRef: ElementRef<HTMLElement>;
  newMap: GoogleMap;
  center: LatLng;
  markerId: string;
  requestTimes : any = [
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
    private formBuilder: FormBuilder
  ) {
    this.currentLanguage = this.languageService.getLanguage();
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
    
  }

  ngOnInit() {
    this.buildForm();
  }

  ngAfterViewInit() {
    this.createMap();
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

  chooseTime($event){
    console.log("selected time :"+$event.target.value)
  }

  attachImage() {
    // get image from camera or gallery
    console.log('get image from camera or gallery');
  }

  donate() {}
}
