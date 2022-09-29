import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const GRAPH_ENDPOINT = 'https://graph.microsoft.com/v1.0/me';

type ProfileType = {
  givenName?: string,
  surname?: string,
  userPrincipalName?: string,
  id?: string
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  profile!: ProfileType;
  backendResponse;

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.getProfile();
    this.getBackendResponse();
  }

  getProfile() {
    this.http.get(GRAPH_ENDPOINT)
    .subscribe(profile => {
      this.profile = profile;
    });
  }

  getBackendResponse() {
    this.http.get(environment.apiBaseUrl + 'Admin', {responseType: 'text', withCredentials: true})
    .subscribe(res => {
      this.backendResponse = res;
    })
  }
}
