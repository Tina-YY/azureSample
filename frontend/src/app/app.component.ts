import { MsalService, MsalBroadcastService, MSAL_GUARD_CONFIG, MsalGuardConfiguration } from '@azure/msal-angular';
import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { InteractionStatus, RedirectRequest } from '@azure/msal-browser/';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { ɵInjectableAnimationEngine } from '@angular/platform-browser/animations';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'frontend';
  isIframe = false;
  loginDisplay = false;
  private readonly _destroying$ = new Subject<void>();

  constructor(
    @Inject(MSAL_GUARD_CONFIG) 
    private msalGuardConfig: MsalGuardConfiguration,
    private authService: MsalService,
    private broadcastService: MsalBroadcastService) { }

  ngOnInit(): void {
      this.isIframe = window !== window.parent && !window.opener;

      this.broadcastService.inProgress$
      .pipe(
        filter((status: InteractionStatus) => status == InteractionStatus.None),
        takeUntil(this._destroying$)
      )
      .subscribe(() => {
        this.setLoginDisplay();
      })
  }

  login() {
    if (this.msalGuardConfig.authRequest) {
      this.authService.loginRedirect({
        ...this.msalGuardConfig.authRequest
      } as RedirectRequest);
    } else{
      this.authService.loginRedirect();
    }
  }

  logout() {
    this.authService.logoutRedirect({
      postLogoutRedirectUri: environment.auth.postLogoutRedirectUri
    })
  }

  setLoginDisplay() {
    this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
  }

  ngOnDestroy(): void {
      this._destroying$.next(undefined);
      this._destroying$.complete();
  }
}
