import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RegisterComponent } from "./register";
import { MyProfileComponent, MyProfileModule } from "./my-profile";
import { LoginComponent } from "./login";
import { ChangePasswordComponent } from "./change-password";

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'my-profile',
    component: MyProfileComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },

  {
    path: 'change-password',
    component: ChangePasswordComponent
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class AccountRoutingModule { }
