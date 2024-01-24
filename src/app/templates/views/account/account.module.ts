import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AccountRoutingModule } from "./account-routing.module";



@NgModule({
  imports: [
    CommonModule,
    AccountRoutingModule
  ],
  exports: [
    RouterModule,
    AccountRoutingModule
  ]
})
export class AccountModule { }
