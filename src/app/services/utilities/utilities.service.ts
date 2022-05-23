import { Injectable } from '@angular/core';
import { Toast } from '@capacitor/toast';
import { LoadingController, Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@capacitor/storage';
import { Device } from '@capacitor/device';
import { Capacitor } from '@capacitor/core';
import { Geolocation } from '@capacitor/geolocation';
import * as moment from 'moment';

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

  getDatesDifference(dateFrom) {
    var remaingTime = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    let delta = Math.floor(
      (new Date(dateFrom).getTime() - new Date().getTime()) / 1000
    );

    console.log('all remaining seconds ' + delta);
    if (delta > 86400) {
      // calc days
      remaingTime.days = Math.floor(delta / 86400);
      console.log('days  :' + remaingTime.days);

      var afterDays = delta - remaingTime.days * 86400;

      console.log(
        'remaing seconds after calc days ' + (delta - remaingTime.days * 286400)
      );
      //calc hours
      if (afterDays > 3600) {
        remaingTime.hours = Math.floor(
          (delta - remaingTime.days * 86400) / 3600
        );

        if (afterDays - remaingTime.hours * 3600 > 60) {
          remaingTime.minutes = Math.floor(
            (afterDays - remaingTime.hours * 3600) / 60
          );

          console.log('remaining seconds after minutes : '+(afterDays - remaingTime.minutes * 60))
          if ((afterDays - remaingTime.minutes * 60) > 60) {
            remaingTime.seconds =0
            //  Math.floor(
            //   afterDays - remaingTime.minutes * 60
            // );
          }else{
            
          }
        }

      } else {
        remaingTime.hours = 0;

        if (afterDays > 60) {
          remaingTime.minutes = Math.floor(afterDays / 60);

          remaingTime.seconds = 0//afterDays - remaingTime.minutes * 60;
        }
      }
    } else if (delta > 3600) {
      var hours = Math.floor(delta / 3600);
      console.log('hours else :' + hours);
    }

    // console.log(
    //   '-----------days  :' +
    //     days +
    //     'hours  :' +
    //     hours +
    //     'minutes  :' +
    //     minutes +
    //     'seconds :' +
    //     afterMinutes
    // );

    return remaingTime;
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
            this.setUserLocation(
              coordinates['coords'].latitude,
              coordinates['coords'].longitude
            );
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

// console.log('remaingingSeconds  : ' + delta);

// var days = Math.floor(delta / 86400);
// console.log('days  :' + days);

// var hours = Math.floor((delta - days * 86400) / 3600);
// console.log('hours  :' + hours);

// var minutes = Math.floor((delta - hours * 3600) / 60);
// console.log('minutes  :' + minutes);

// var seconds = Math.floor((delta - minutes * 60) );
// console.log('seconds  :' + seconds);

//     var seconds = Math.floor((new Date(dateFrom).getTime() - new Date().getTime())/1000);
// var minutes = Math.floor(seconds/60);
// var hours = Math.floor(minutes/60);
// var days = Math.floor(hours/24);

// hours = hours-(days*24);
// minutes = minutes-(days*24*60)-(hours*60);
// seconds = seconds-(days*24*60*60)-(hours*60*60)-(minutes*60);

// let remaingingDays = Math.floor(
//   (new Date(dateFrom).getTime() - new Date().getTime()) /
//     1000 /
//     60 /
//     60 /
//     24
// );
// console.log('remaingingDays  : '+remaingingDays);

// let remaingingHours = Math.floor(
//   (new Date(dateFrom).getTime() - new Date().getTime()) /
//     1000 /
//     60 /
//     60
// );
// console.log('remaingingHours  : '+remaingingHours);

// var remaingTime = {
//   days: 0,
//   hours: 0,
//   minutes: 0,
//   seconds: 0,
// };

// remaingTime = { days: remaingingDays, hours: 0, minutes: 0, seconds: 0 };

// return remaingTime;
// calc(date) {
//   var firstDate = moment(date);
//   var secondDate = moment(new Date());
//   var diffInSeconds = Math.abs(firstDate.diff(secondDate, 'seconds'));

//   console.log('diffInSeconds  : ' + diffInSeconds);

//   var diffInHours = Math.abs(firstDate.diff(secondDate, 'hours'));
//   console.log('diffInHours  : ' + diffInHours);

//   var diffInDays = Math.abs(firstDate.diff(secondDate, 'days'));

//   console.log('diffInDays  : ' + diffInDays);
// }

// getDiffer(date, date1) {
//   // get total seconds between the times
//   var delta = Math.abs(date - date1) / 1000;

//   // calculate (and subtract) whole days
//   var days = Math.floor(delta / 86400);
//   delta -= days * 86400;

//   // calculate (and subtract) whole hours
//   var hours = Math.floor(delta / 3600) % 24;
//   delta -= hours * 3600;

//   // calculate (and subtract) whole minutes
//   var minutes = Math.floor(delta / 60) % 60;
//   delta -= minutes * 60;

//   // what's left is seconds
//   var seconds = Math.floor(delta % 60);

//   console.log(days + '' + hours + ' ' + minutes + '  ' + seconds);
// }

//   calculateDiff(dateSent){
//     let currentDate = new Date();
//     dateSent = new Date(dateSent);

//     return Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(dateSent.getFullYear(), dateSent.getMonth(), dateSent.getDate()) ) /(1000 * 60 * 60 * 24));
// }
