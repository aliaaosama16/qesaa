import { Injectable } from '@angular/core';
import { Toast } from '@capacitor/toast';
import { LoadingController, Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@capacitor/storage';
import { Device } from '@capacitor/device';
import { Capacitor } from '@capacitor/core';

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
      // message: `
      // <div class="custom-spinner-container">
      //   <div class="custom-spinner-box">
      //     <p>جار التحميل</p>
      //   </div>
      // </div>`,
    });
    this.loading.present();
    return this.loading;
  }

  public dismissLoading() {
    console.log('hide loading');
    this.loadingCtrl.dismiss();
  }

  setUserLocation(lat, long) {
    this.userLocation.lat = lat;
    this.userLocation.lng = long;
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
}
