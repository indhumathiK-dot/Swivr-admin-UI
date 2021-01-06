import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {PasswordResetComponent} from './password-reset/password-reset.component';
import {ProfileComponent} from './profile/profile.component';
import {ServiceManagementComponent} from './service-management/service-management.component';
import {CosmetologistListComponent} from './cosmetologist-management/cosmetologist-list/cosmetologist-list.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'password-reset', component: PasswordResetComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'services', component: ServiceManagementComponent},
  {path: 'cosmetologist', component: CosmetologistListComponent},
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
