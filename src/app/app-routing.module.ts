import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

import { LoginComponent } from './components/auth/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { ChannelsComponent } from './components/home/channels/channels.component';
import { DirectComponent } from './components/home/direct/direct.component';
import { MentionsComponent } from './components/home/mentions/mentions.component';
import { AccountComponent } from './components/home/account/account.component';

const routes: Routes = [
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },
  {
    path: 'app',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: ChannelsComponent },
      { path: 'direct', component: DirectComponent },
      { path: 'mentions', component: MentionsComponent },
      { path: 'account', component: AccountComponent }
    ]
  },
  { path: '', redirectTo: 'app', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'corrected'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
