import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {PasswordResetComponent} from './password-reset/password-reset.component';
import {ProfileComponent} from './profile/profile.component';
import {ServiceManagementComponent} from './service-management/service-management.component';
import {CosmetologistListComponent} from './cosmetologist-management/cosmetologist-list/cosmetologist-list.component';
import {CosmetologistDetailsComponent} from './cosmetologist-management/cosmetologist-details/cosmetologist-details.component';
import {ClientListComponent} from './client-management/client-list/client-list.component';
import {ClientDetailsComponent} from './client-management/client-details/client-details.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'password-reset', component: PasswordResetComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'services', component: ServiceManagementComponent},
  {path: 'cosmetologist', component: CosmetologistListComponent},
  {path: 'cosmetologist/details/:id', component: CosmetologistDetailsComponent},
  {path: 'client', component: ClientListComponent},
  {path: 'client/details/:id', component: ClientDetailsComponent},
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
