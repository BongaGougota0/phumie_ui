import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PhumieUserDto } from '../app_models/user.model';
import { HttpClient } from '@angular/common/http';
import { global_variables } from '../environments/environments';
import { UserLikes } from '../app_models/metric.data';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  url = global_variables.base_url;
  private userDataSubject = new BehaviorSubject<PhumieUserDto | null>(null);
  currentUserDataSubject$ = this.userDataSubject.asObservable();

  constructor(private http: HttpClient) { }

  setUserData(user: PhumieUserDto)
  {
    this.userDataSubject.next(user);
  }

  getUserData()
  {
    this.currentUserDataSubject$.subscribe(
      (data) => {
        return data;
      },
    )
  }

  cleatUserData()
  {
    this.userDataSubject.next(null);
  }

  getUserLikes() : Observable<UserLikes> 
  {
    return this.http.get<UserLikes>(`${this.url}/likes`);
  }

  latestUserPosts() : Observable<any> 
  {
    return this.http.get<any>(`${this.url}/posts`);
  }
}
