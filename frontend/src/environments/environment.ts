// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  
  apiBaseUrl: 'http://localhost:8080/',
  
  auth: {
    clientId: '285dbaaf-eb7c-4f02-ae14-1e1c0cbf059a',
    authority: 'https://login.microsoftonline.com/c23355b4-870f-417f-adb1-b6ca05af56fc',
    redirectUri: 'http://localhost:4200',
    postLogoutRedirectUri: 'http://localhost:4200',
  },
  
  resources: {
    backendApi: {
      resourceUri: 'http://localhost:8080/',
      resourceScopes: ['71fbd117-ae79-4da7-9e34-ae2eb432f5f5/user_impersonation'],
    },
    graphApi: {
      resourceUri: 'https://graph.microsoft.com',
      resourceScopes: ['user.read'],
    },
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
