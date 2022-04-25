import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('./../pages/home/home.module').then((m) => m.HomePageModule),
      },
      {
        path: 'notifications',
        loadChildren: () =>
          import('./../pages/notifications/notifications.module').then(
            (m) => m.NotificationsPageModule
          ),
      },
      {
        path: 'donation-order',
        loadChildren: () =>
          import('./../pages/donation-order/donation-order.module').then(
            (m) => m.DonationOrderPageModule
          ),
      },
      {
        path: 'my-orders',
        loadChildren: () =>
          import('./../pages/my-orders/my-orders.module').then(
            (m) => m.MyOrdersPageModule
          ),
      },
      {
        path: 'account',
        loadChildren: () =>
          import('./../pages/account/account.module').then(
            (m) => m.AccountPageModule
          ),
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
