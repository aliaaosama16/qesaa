import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./../app/pages/tabs-pages/tabs/tabs.module').then(
        (m) => m.TabsPageModule
      ),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/auth/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./pages/auth/register/register.module').then(
        (m) => m.RegisterPageModule
      ),
  },
  {
    path: 'forget-password',
    loadChildren: () =>
      import('./pages/auth/forget-password/forget-password.module').then(
        (m) => m.ForgetPasswordPageModule
      ),
  },
  {
    path: 'verification-code',
    loadChildren: () =>
      import('./pages/auth/verification-code/verification-code.module').then(
        (m) => m.VerificationCodePageModule
      ),
  },
  {
    path: 'change-password',
    loadChildren: () =>
      import('./pages/auth/change-password/change-password.module').then(
        (m) => m.ChangePasswordPageModule
      ),
  },
  {
    path: 'productive-families',
    loadChildren: () =>
      import('./pages/productive-families/productive-families.module').then(
        (m) => m.ProductiveFamiliesPageModule
      ),
  },
 
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
