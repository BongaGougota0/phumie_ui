import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { global_variables } from '../../environments/environments';
import { Observable } from 'rxjs';
import { Post } from '../../app_models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  base_url = global_variables.base_url;

  constructor(private http: HttpClient) { }

  getPosts() : Observable<Post[]>
  {
    return this.http.get<Post[]>(`${this.base_url}/posts`);
  }

  newPost(newPost: Post) : Observable<any>
  {
    return this.http.post<any>(`${this.base_url}/posts`, newPost);
  }

  getPostById(postId: number) : Observable<Post>
  {
    return this.http.get<Post>(`${this.base_url}/posts/${postId}`);
  }
}
