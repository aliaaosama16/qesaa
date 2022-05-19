import { Injectable } from '@angular/core';
import { Toast } from '@capacitor/toast';
import { LoadingController, Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@capacitor/storage';
import { Device } from '@capacitor/device';
import { Capacitor } from '@capacitor/core';
import { Geolocation } from '@capacitor/geolocation';

@Injectable({
  providedIn: 'root',
})
export class UtilitiesService {
  public loading: any;
  platform: any;
  deviceID: string;
  userLocation = { lat: 0, lng: 0 };

  closedDates: Array<string>;
  constructor(
    private translate: TranslateService,
    private loadingCtrl: LoadingController,
    private plt: Platform
  ) {}

  setPlatform(val) {
    console.log('current platform is ' + val);
    this.platform = val;
  }

  setDeviceID(val) {
    console.log('deviceID is ' + val);
    this.deviceID = val;
  }

  async showMessage(message: string) {
    await Toast.show({
      text: this.translate.instant(message),
    });
  }

  async storeData(key, value) {
    await Storage.set({
      key: key,
      value: value,
    });
  }

  async getDataByKey(key) {
    const val = await Storage.get({ key: key });
    console.log('openBoarding stored value :' + JSON.stringify(val));
    this.getValue(val.value);
  }

  getValue(value): string {
    return value;
  }

  public async showLoadingSpinner() {
    console.log('show loading');
    this.loading = await this.loadingCtrl.create({
      mode: 'ios',
      spinner: 'crescent',
      cssClass: 'my-loading-class',
      backdropDismiss: false,
      animated: true,
    });
    this.loading.present();
    return this.loading;
  }

  public dismissLoading() {
    console.log('hide loading');
    this.loadingCtrl.dismiss();
  }



  getCapacitorPlatform() {
    return Capacitor.getPlatform();
  }

  getPlatformType() {
    return new Promise((resolve, reject) => {
      if (this.plt.is('android')) {
        this.setPlatform('android');
      } else if (this.plt.is('ios')) {
        this.setPlatform('ios');
      }
      resolve(this.platform);
    });
  }

  async getDeviceID() {
    const device = await (await Device.getId()).uuid;
    this.setDeviceID(device);
  }

  getDatesDifference(dateFrom, dateTo) {
    let days = Math.floor(
      (new Date(dateTo).getTime() - new Date(dateFrom).getTime()) /
        1000 /
        60 /
        60 /
        24
    );
    return days;
  }

  getUserLocation() {
    return new Promise(async (resolve, reject) => {
      const locationStatus = await Geolocation.requestPermissions().then(
        async (res) => {
          if (res['location'] == 'granted') {
            const coordinates = await Geolocation.getCurrentPosition();
            console.log(coordinates);
            this.userLocation.lat = coordinates['coords'].latitude;
            this.userLocation.lng = coordinates['coords'].longitude;
            this.setUserLocation(coordinates['coords'].latitude,coordinates['coords'].longitude);
          }
        }
      );
      resolve(locationStatus);
    });
  }

  setUserLocation(lat, long) {
    this.userLocation.lat = lat;
    this.userLocation.lng = long;
  }


}
