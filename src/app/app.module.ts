import { NgModule, importProvidersFrom } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule, ToastrService, provideToastr } from 'ngx-toastr';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'account/my-profile',
    loadChildren: () => import('./templates')
      .then(m => m.MyProfileModule)
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  providers: [
    ToastrService
  ],
  exports: [
    RouterModule
  ]
})
export class AppModule { }
