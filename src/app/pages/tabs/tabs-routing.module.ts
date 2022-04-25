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
          import('./../home/home.module').then((m) => m.HomePageModule),
      },
      {
        path: 'notifications',
        loadChildren: () =>
          import('./../notifications/notifications.module').then(
            (m) => m.NotificationsPageModule
          ),
      },
      {
        path: 'donation-order',
        loadChildren: () =>
          import('./../donation-order/donation-order.module').then(
            (m) => m.DonationOrderPageModule
          ),
      },
      {
        path: 'my-orders',
        loadChildren: () =>
          import('./../my-orders/my-orders.module').then(
            (m) => m.MyOrdersPageModule
          ),
      },
      {
        path: 'account',
        loadChildren: () =>
          import('./../account/account.module').then(
            (m) => m.AccountPageModule
          ),
      },
      {
        path: 'about',
        loadChildren: () => import('./../menu/about/about.module').then( m => m.AboutPageModule)
      },
      {
        path: 'our-services',
        loadChildren: () => import('./../menu/our-services/our-services.module').then( m => m.OurServicesPageModule)
      },
      {
        path: 'news',
        loadChildren: () => import('./../menu/news/news.module').then( m => m.NewsPageModule)
      },
      {
        path: 'our-projects',
        loadChildren: () => import('./../menu/our-projects/our-projects.module').then( m => m.OurProjectsPageModule)
      },
      {
        path: 'gallery',
        loadChildren: () => import('./../menu/gallery/gallery.module').then( m => m.GalleryPageModule)
      },
      {
        path: 'volunteer-with-us',
        loadChildren: () => import('./../menu/volunteer-with-us/volunteer-with-us.module').then( m => m.VolunteerWithUsPageModule)
      },
      {
        path: 'support-productive-families',
        loadChildren: () => import('./../menu/support-productive-families/support-productive-families.module').then( m => m.SupportProductiveFamiliesPageModule)
      },
      {
        path: 'our-presence',
        loadChildren: () => import('./../menu/our-presence/our-presence.module').then( m => m.OurPresencePageModule)
      },
      {
        path: 'contact-with-us',
        loadChildren: () => import('./../menu/contact-with-us/contact-with-us.module').then( m => m.ContactWithUsPageModule)
      },
      {
        path: 'suggestions',
        loadChildren: () => import('./../menu/suggestions/suggestions.module').then( m => m.SuggestionsPageModule)
      },
      {
        path: 'rules',
        loadChildren: () => import('./../menu/rules/rules.module').then( m => m.RulesPageModule)
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
