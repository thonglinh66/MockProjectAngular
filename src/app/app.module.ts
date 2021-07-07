import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, CanActivate, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { HomeComponent } from './home/home.component';
import { AuthGuardService } from './auth/auth-guard.service';
import { AuthService } from './auth/auth.service';

const appRoutes: Routes = [
  { 
    path: 'login',
    component: LoginComponent,
   
   
  },
  { 
    path: '',
    redirectTo: 'login',
    pathMatch: 'prefix'
  },
  { 
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuardService]    
  },
];
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent
  ],
 
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [
    AuthService, AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
