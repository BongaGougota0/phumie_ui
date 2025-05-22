import { Injectable } from '@angular/core';
import {LoginCredentials, PhumieUserDto  } from '../app_models/user.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UserDataService } from './user-data.service';
import { global_variables } from '../environments/environments';
import { map, Observable } from 'rxjs';
import { AuthenticationDto } from '../app_models/reponse.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  url = global_variables.base_url;

  constructor(private http: HttpClient, private userDataService: UserDataService) { }

  login(credentials: LoginCredentials) : Observable<AuthenticationDto> 
  {
    return this.http.post<AuthenticationDto>(`${this.url}/auth/login`, credentials)
    .pipe(
      map((data) => {
        this.userDataService.setUserData(data.phumieUserDto);
        localStorage.setItem("jwt_key", data.jwt);
        return data;
      })
    )
  }

  signUpUser(signupData : PhumieUserDto) : Observable<AuthenticationDto>
  {
    return this.http.post<AuthenticationDto>(`${this.url}/auth/signup`, signupData)
    .pipe(
      map((data) => {
        this.userDataService.setUserData(data.phumieUserDto);
        localStorage.setItem('jwt_key', data.jwt);
        return data;
      })
    );
  }

  logout()
  {
    this.userDataService.cleatUserData();
  }

  handleErrors(error : HttpErrorResponse)
  {
    
  }
}
