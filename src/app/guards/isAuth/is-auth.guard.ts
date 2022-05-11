import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root'
})
export class IsAuthGuard implements CanActivate {
  isLogined: boolean;
  constructor(
    private auth: AuthService,
    private router: Router,
    private util: UtilitiesService
  ) {}
  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    const loginStatus = await Storage.get({ key: 'status' });
    console.log('login status'+loginStatus.value);
    if (loginStatus.value == 'active') {
      this.auth.isLogined();
      return true;
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}