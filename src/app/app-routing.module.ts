import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AccountModule, MyProfileComponent } from './templates';

export const routes: Routes = [
  {
    path: 'account',
    loadChildren: () => import('./templates')
      .then(x => x.AccountModule)
  }

  // {
  //   path: '**',
  //   component: PageNotFoundComponent
  // }
];

@NgModule(
  {
    imports: [
      RouterModule.forRoot(routes, { useHash: true }),
      AccountModule
    ],
    exports: [
      RouterModule
    ]
  }
)
export class AppRoutingModule { }
