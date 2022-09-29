import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';

import { MsalModule, MsalRedirectComponent, MsalGuard, MsalInterceptor } from '@azure/msal-angular';
import { PublicClientApplication, InteractionType } from '@azure/msal-browser';
import { environment } from 'src/environments/environment';

const isIE = window.navigator.userAgent.indexOf('MSIE') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    AppRoutingModule,

    MatButtonModule,
    MatToolbarModule,
    MatListModule,
    HttpClientModule,

    MsalModule.forRoot(new PublicClientApplication({
      auth: {
        clientId: environment.auth.clientId,
        authority: environment.auth.authority, 
        redirectUri: environment.auth.redirectUri
      },
      cache: {
        cacheLocation: 'localStorage',
        storeAuthStateInCookie: isIE,
      }
    }), {
      interactionType: InteractionType.Redirect,
      authRequest: {
        scopes: ['user.read']
      }
    }, {
      interactionType: InteractionType.Redirect,
      protectedResourceMap: new Map([
        [environment.resources.graphApi.resourceUri, environment.resources.graphApi.resourceScopes], // Graph endpoint/v1.0/me
        [environment.resources.backendApi.resourceUri, environment.resources.backendApi.resourceScopes]  // backend website / scope
      ])
    })
  ],
  providers: [
    MsalGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent, MsalRedirectComponent]
})
export class AppModule { }
