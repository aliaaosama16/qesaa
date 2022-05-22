import { GeneralResponse, GeneralSectionResponse, UserData } from './../../../models/general';
import { UtilitiesService } from './../../../services/utilities/utilities.service';
import { Platform } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LanguageService } from 'src/app/services/language/language.service';
import { StoreOrderData, StoreOrderType } from 'src/app/models/sections';
import { SectionsProductsService } from 'src/app/services/sections-products/sections-products.service';
import { AppData } from 'src/app/models/data';
import { DataService } from 'src/app/services/data/data.service';
declare var google: any;
import * as moment from 'moment';
import { AuthService } from 'src/app/services/auth/auth.service';

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

  requestTimes: GeneralSectionResponse[];
  constructor(
    private languageService: LanguageService,
    private formBuilder: FormBuilder,
    private plt: Platform,
    private util:UtilitiesService,
    private sectionsService:SectionsProductsService,
    private dataService:DataService,
    private auth:AuthService
  ) {
    this.currentLanguage = this.languageService.getLanguage();
    
  }

  ngOnInit() {
      this.buildForm();
      this.getOrderTimes();
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
      lat:['', [Validators.required]],
      lng:['', [Validators.required]],
      requestDate: ['', [Validators.required, Validators.minLength(2)]],
      requestTime: ['', [Validators.required]],
      requestImage:['', [Validators.required]],
      notices: ['', [Validators.required, Validators.minLength(2)]],
     
    });
  }


  getOrderTimes(){
    const userData: UserData = {
      lang: this.languageService.getLanguage(),
      user_id: this.auth.userID.value,
    };
    this.util.showLoadingSpinner().then((__) => {
      this.dataService.appData(userData).subscribe(
        (data: AppData) => {
          this.util.dismissLoading();
          if (data.key == 1) {
            this.requestTimes= data.data.order_times;

            console.log(' this.locations  :' + JSON.stringify(this.requestTimes));
          } else {
            this.util.showMessage(data.msg);
          }
         
        },
        (err) => {
          this.util.dismissLoading();
        }
      );
    });
  }

  chooseTime($event) {
    console.log('selected time :' + $event.target.value);
  }

  attachImage() {
    // get image from camera or gallery
    console.log('get image from camera or gallery');
  }

  getSelectedDate(date){
    this.donationForm.value.requestDate= moment(date).format('YYYY-MM-DD');
    console.log( 'converted date :'+moment(date).format('YYYY-MM-DD'))
    return  moment(date).format('YYYY-MM-DD');
  }
  //   formatDate(value: string) {
  //   return format(parseISO(value), 'MMM dd yyyy');
  // }

  donate() {
    this.donationForm.value.lat=this.util.userLocation.lat;
    this.donationForm.value.lng=this.util.userLocation.lng;

    console.log('donation form : '+JSON.stringify(this.donationForm.value))
    // const storeOrderData: StoreOrderData = {
    //   lang: this.languageService.getLanguage(),
    //   user_id: this.auth.userID.value,
    //   type: StoreOrderType.volunteer,
    // };
    // this.util.showLoadingSpinner().then((__) => {
    //   this.sectionsService.storeOrder(storeOrderData).subscribe(
    //     (data: GeneralResponse) => {
    //       // if (data.key == 1) {
    //       //   this.util.showMessage(data.msg);
    //       // } else {
    //       //   this.util.showMessage(data.msg);
    //       // }
    //       this.util.showMessage(data.msg).then((_)=>{
    //         this.util.dismissLoading();
    //       });
        
    //     },
    //     (err) => {
    //       this.util.dismissLoading();
    //     }
    //   );
    // });
  }

  loadMap() {
    let latLng = new google.maps.LatLng(this.util.userLocation.lat,this.util.userLocation.lng);

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
      this.focusMap(this.util.userLocation.lat,this.util.userLocation.lng);
      this.addMarker(this.util.userLocation.lat,this.util.userLocation.lng);
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
