import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { global_variables } from '../../environments/environments';
import { map, Observable, switchMap } from 'rxjs';
import { Post } from '../../app_models/post.model';
import { UserDataService } from '../user-data.service';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  base_url = global_variables.base_url;

  constructor(private http: HttpClient, private userDataService: UserDataService) { }

  getPosts() : Observable<Post[]>
  {
    return this.http.get<Post[]>(`${this.base_url}/posts`);
  }

  newPost(newPost: Post) : Observable<any>
  {
    return this.getUserId().pipe(
      map(userId => {
        newPost.author = userId ? userId.toString() : '';
        return newPost;
      }),
      switchMap(post => this.http.post<any>(`${this.base_url}/posts`, post))
    );
  }

  getPostById(postId: number) : Observable<Post>
  {
    return this.http.get<Post>(`${this.base_url}/posts/${postId}`);
  }

  getUserId(): Observable<number | null> {
    return this.userDataService.currentUserDataSubject$.pipe(
      map(data => 0 || null)
    );
  }

}
