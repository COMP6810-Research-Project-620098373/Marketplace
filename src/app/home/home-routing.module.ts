import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteEntries } from 'src/model/RouteMapper';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: '',
        redirectTo: RouteEntries.browse,
        pathMatch: 'full'
      },
      {
        path: 'browse',
        loadChildren: () => import('./browse/browse.module').then( m => m.BrowsePageModule)
      },
      {
        path: 'my-items',
        loadChildren: () => import('./my-items/my-items.module').then( m => m.MyItemsPageModule)
      },
      {
        path: 'account',
        loadChildren: () => import('./account/account.module').then( m => m.AccountPageModule)
      },      
    ]    
  },
  {
    path: 'my-items/add-item',
    loadChildren: () => import('./my-items/add-item/add-item.module').then( m => m.AddItemPageModule)
  },
  {
    path: 'item/:itemIpfsHash',
    loadChildren: () => import('./item/item.module').then( m => m.ItemPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
