import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Post } from '../app_models/post.model';
import { PostsService } from '../app_services/posts/posts.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-phumie-index',
  imports: [RouterLink, NgFor],
  templateUrl: './phumie-index.component.html',
  styleUrl: '../authenticated_user/feed/feed.component.css'
})
export class PhumieIndexComponent implements OnInit{
  posts: Post[] = [];
  postsSubscription$ = new Observable();

  constructor(private route: Router, private postService: PostsService){}

  openPostModal()
  {
    this.route.navigate(['login']);
  }

  ngOnInit() {
    this.postService.getHomeScreenPosts().subscribe(
      {
        next: (resp) => {
          console.log(`Display fetched posts ${resp}`)
          this.posts = resp;
        },
        error: (err) => {
          console.log(`error occured ${err}`);
          this.posts = [];
        }
      }
    )
  }

}
