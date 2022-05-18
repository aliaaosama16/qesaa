import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs'; import { ActivationData, AuthResponse, LoginData, LogOutData, RegisterData } from 'src/app/models/auth';
import { ChangePasswordData, ForgetPasswordData } from 'src/app/models/forgetPassword';
import { GeneralResponse, UserData } from 'src/app/models/general';
import { environment } from 'src/environments/environment';
import { Storage } from '@capacitor/storage';
import { HttpClient } from '@angular/common/http';
import { LanguageService } from '../language/language.service';
import { NotificationsService } from '../notifications/notifications.service';
import { NotificationsResponse } from 'src/app/models/notifications';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated = new BehaviorSubject(false);
  userID = new BehaviorSubject(0);
  noOfNotifications = new BehaviorSubject(0);
  userToken: string = '';

  constructor(
    private httpclient: HttpClient,
    private languageService: LanguageService,
    private userNotifications: NotificationsService
  ) {}

  storeStatusAfterRegisteration(data: AuthResponse) {
    this.storeToken(data.data?.api_token);
    this.store('activation-status', data.data.is_active);
    this.store('confirmation-status', data.data.is_confirmed);
    this.setUserID(data.data.id);
  }

  storeStatusAfterLogin(data: AuthResponse) {
    this.isLogined();
    this.setUserID(data?.data?.id);
    this.storeToken(data?.data?.api_token);
    this.store('status', data.status);
    this.storeUserId( data?.data?.id);
    //this.setNoOfNotifications(data?.data?.id);
  }

  async storeUserId(id:number) {
    await Storage.set({
      key: "userID",
      value: id.toString(),
    });
  }


  async removeRegistrationData() {
    this.isLogout();
    this.removeToken();
    this.removeUserID();
    this.noOfNotifications.next(0);
    await Storage.remove({ key: 'activation-status' });
    await Storage.remove({ key: 'confirmation-status' });
    await Storage.remove({ key: 'status' });
    //await Storage.clear();
  }

  isLogined() {
    this.isAuthenticated.next(true);
  }

  isLogout() {
    this.isAuthenticated.next(false);
  }

  setUserID(userID: number) {
    console.log('set id to behavour sybject ' + userID);
    this.userID.next(userID);
  }

  removeUserID() {
    this.userID.next(0);
  }

  async getStoredUserID() {
    const val = await Storage.get({ key: 'userID' });
    this.setUserID(parseInt(val.value));
    //this.setNoOfNotifications(parseInt(val.value));
  }

  setNoOfNotifications(userId: number) {
    // this.getUserIDObservable().subscribe((userID) => {
    //   if (userID) {
    const userData: UserData = {
      lang: this.languageService.getLanguage(),
      user_id: userId,
    };
    this.userNotifications.showNotification(userData).subscribe(
      (data: NotificationsResponse) => {
        if (data.key == 1) {
          this.noOfNotifications.next(data.data.length);
        }
      },
      (err) => {}
    );
    // }
    //});
  }

  getNoOfNotifications(): Observable<number> {
    return this.noOfNotifications.asObservable();
  }

  getUserIDObservable(): Observable<number> {
    return this.userID.asObservable();
  }

  getLoginedObservable(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }

  async storeToken(token: string) {
    await Storage.set({
      key: 'USER-TOKEN',
      value: token,
    });
  }

  async removeToken() {
    await Storage.remove({
      key: 'USER-TOKEN',
    });
  }

  async storeActivationStatus(status: boolean) {
    await Storage.set({
      key: 'activation-status',
      value: status.toString(),
    });
  }

  async store(key: any, value: any) {
    await Storage.set({
      key: key,
      value: value,
    });
  }

  async getUserToken() {
    const val = await Storage.get({ key: 'USER-TOKEN' });
    this.userToken = val.value;
  }

  // userData(data: UserData): Observable<UserResponse> {
  //   return this.httpclient.post<UserResponse>(
  //     `${environment.BASE_URL}show-user`,
  //     data
  //   );
  // }
  // updateUserData(data: UpdateUserData): Observable<UserResponse> {
  //   return this.httpclient.post<UserResponse>(
  //     `${environment.BASE_URL}update-user`,
  //     data
  //   );
  // }

  login(data: LoginData): Observable<AuthResponse> {
    return this.httpclient.post<AuthResponse>(
      `${environment.BASE_URL}login`,
      data
    );
  }

  register(data: RegisterData): Observable<AuthResponse> {
    return this.httpclient.post<AuthResponse>(
      `${environment.BASE_URL}register`,
      data
    );
  }

  activeAccount(data: ActivationData): Observable<GeneralResponse> {
    return this.httpclient.post<GeneralResponse>(
      `${environment.BASE_URL}active-account`,
      data
    );
  }

  logout(data: LogOutData): Observable<AuthResponse> {
    return this.httpclient.post<AuthResponse>(
      `${environment.BASE_URL}logout`,
      data
    );
  }

  forgetPassword(data: ForgetPasswordData): Observable<AuthResponse> {
    return this.httpclient.post<AuthResponse>(
      `${environment.BASE_URL}forget-password`,
      data
    );
  }

  changePassword(data: ChangePasswordData): Observable<AuthResponse> {
    return this.httpclient.post<AuthResponse>(
      `${environment.BASE_URL}reset-password`,
      data
    );
  }
  
}
