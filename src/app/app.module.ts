import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, CanActivate, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuardService } from './auth/auth-guard.service';
import { AuthService } from './auth/auth.service';
import { ProductService } from './service/product.service';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import { CartService } from './service/carts.service';
import { fakeBackendProvider } from './fake-backend/fake.service';
import { LoggedInAuthGuardService } from './auth/loggedin-auth-guard.service copy';

const appRoutes: Routes = [
  { 
    path: 'login',
    component: LoginComponent,
    canActivate: [LoggedInAuthGuardService],

    
  },
  { 
    path: '',
    redirectTo: 'login',
    pathMatch: 'prefix'
  },
  { 
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuardService],
    data: { roles: ["User"] }    
  },
  { path: '**', redirectTo: 'login' }
];
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ProductComponent,
    CartComponent
  ],
 
  imports: [
    BrowserModule,
    HttpClientModule,   
    RouterModule.forRoot(appRoutes),
  ],
  providers: [
    AuthService, AuthGuardService,
    CartService,
    LoggedInAuthGuardService,
    CartComponent,
    ProductService,
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
