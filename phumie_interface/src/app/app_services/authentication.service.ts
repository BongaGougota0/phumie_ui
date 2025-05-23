import { Injectable } from '@angular/core';
import {LoginCredentials, PhumieUserDto  } from '../app_models/user.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UserDataService } from './user-data.service';
import { global_variables } from '../environments/environments';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { AuthenticationDto, ResponseDto } from '../app_models/reponse.model';

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
      tap((resp) => {this.handleAuthSuccess(resp)}),
      catchError(this.handleErrors)
    )
  }

  handleAuthSuccess(authData: AuthenticationDto){
    this.userDataService.setUserData(authData.phumieUserDto);
    localStorage.setItem("jwt_key", authData.jwt);
  }

  signUpUser(signupData : PhumieUserDto) : Observable<AuthenticationDto>
  {
    return this.http.post<AuthenticationDto>(`${this.url}/auth/signup`, signupData)
    .pipe(
      tap((resp) => this.handleAuthSuccess(resp)),
      catchError(this.handleErrors)
    );
  }

  logout()
  {
    this.userDataService.clearUserData();
  }
handleErrors(error: HttpErrorResponse): Observable<never> {
  let errorMessage: string;
  // Check if error.error exists and has the expected ResponseDto structure
  if (error.error && typeof error.error === 'object') {
    const responseDto : ResponseDto = error.error;
    
    // Log the ResponseDto structure for debugging
    console.log('ResponseDto structure:', {
      microserviceName: responseDto.microserviceName,
      message: responseDto.message,
      status: responseDto.status,
      timestamp: responseDto.timestamp
    });
    
    const dtoMessage = responseDto.message || responseDto.status;
    const microserviceName = responseDto.microserviceName ? `[${responseDto.microserviceName}] ` : '';
    
    switch (error.status) {
      case 403:
        errorMessage = `${microserviceName}Access Denied: ${dtoMessage}`;
        break;
      case 404:
        errorMessage = `${microserviceName}Resource Not Found: ${dtoMessage}`;
        break;
      case 400:
        errorMessage = `${microserviceName}Bad Request: ${dtoMessage}`;
        break;
      case 500:
        errorMessage = `${microserviceName}Server Error: ${dtoMessage}`;
        break;
      default:
        errorMessage = `${microserviceName}Error (${error.status}): ${dtoMessage}`;
    }
  } else {
    switch (error.status) {
      case 0:
        errorMessage = 'Network error - please check your connection';
        break;
      case 403:
        errorMessage = 'Access denied';
        break;
      case 404:
        errorMessage = 'Resource not found';
        break;
      default:
        errorMessage = `Error ${error.status}: ${error.statusText || 'Unknown error'}`;
    }
  }
  
  console.error('Processed error message:', errorMessage);
  return throwError(() => new Error(errorMessage));
}
}
