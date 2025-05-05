import { Injectable } from '@angular/core';
import { UserLoginDetails } from '../app_models/user.model';
import { HttpClient } from '@angular/common/http';
import { UserDataService } from './user-data.service';
import { global_variables } from '../environments/environments';
import { map, Observable } from 'rxjs';
import { AuthResponse } from '../app_models/general.models';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  url = global_variables.base_url;

  constructor(private http: HttpClient, private userDataService: UserDataService) { }

  login(credentials: UserLoginDetails) : Observable<AuthResponse> 
  {
    return this.http.post<AuthResponse>(`${this.url}/login`, credentials)
    .pipe(
      map((data) => {
        this.userDataService.setUserData(data.user_data);
        return data;
      })
    )
  }

  logout()
  {
    this.userDataService.cleatUserData();
  }
}
