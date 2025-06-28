import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { global_variables } from '../../environments/environments';
import { map, Observable, pipe, switchMap } from 'rxjs';
import { Post } from '../../app_models/post.model';
import { UserDataService } from '../user-data.service';
import { ResponseDto } from '../../app_models/reponse.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  base_url = global_variables.base_url;

  constructor(private http: HttpClient, private userDataService: UserDataService) { }

  getPosts() : Observable<Post[]>
  {
    return this.http.get<Post[]>(`${this.base_url}/v1/post/all`);
  }

  newPost(newPost: Post) : Observable<any> {
  return this.userDataService.currentUserDataSubject$.pipe(
    map(data => {
      if (!data?.userId || !data?.username) {
          throw new Error('User data is not available');
        }

        const userData = {
          "userId": data?.userId,
          "username": data?.username,
        };
        
        newPost.userId = userData.userId;
        newPost.postAuthor = userData.username;
        return newPost;
      }),
      switchMap(updatedPost => 
        this.http.post<any>(`${this.base_url}/v1/post`, updatedPost)
      )
    );
  }

  getPostById(postId: number) : Observable<Post>
  {
    return this.http.get<Post>(`${this.base_url}/v1/post/${postId}`);
  }

  getUserId(): Observable<number | null> {
    return this.userDataService.currentUserDataSubject$.pipe(
      map(data => 0 || null)
    );
  }

  getPostComments(postId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.base_url}/v1/comment/${postId}`);
  }

  postComment(comment: Comment) :Observable<ResponseDto> {
    return this.http.post<ResponseDto>(`${this.base_url}/v1/comment`, comment);
  }

}
